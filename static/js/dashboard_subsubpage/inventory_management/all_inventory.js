function loadAllInventory() {
    const allInventory = document.getElementById("all_inventory");
    const errorMessage = document.getElementById('error-message-inventory');
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard/get_all_inventory', false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            data.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");
                let image_element = "";
                if (product.image_type == "0") {
                    image_element =
                        '<img src="/static/images/no_image.png" alt="No Image" class="imgl" />';
                } else if (product.image_type == "1") {
                    image_element = `<img src="/static/images/${product.image}" alt="${product.name}" class="imgl" />`;
                } else if (product.image_type == "2") {
                    image_element = `<img src="${product.image}" alt="${product.name}" class="imgl" />`;
                }
                productDiv.innerHTML = `
                      ${image_element}
                      <h2>${product.name}</h2>
                      <p>ID: ${product.id}</p>
                      <p>Количество: ${product.quantity}</p>
                      <p>Состояние: ${product.state}</p>
                      <p>Тип изображения: ${product.image_type}</p>
                        ${sessionStorage.getItem('role') === 'admin' ? `<button onclick="confirmDelete(${product.id})" class = "inventory-delete-button">Удалить</button>` : ''}
                                  `;
                productContainer.appendChild(productDiv);
            });
        } else {
            showErrorMessage('Ошибка при загрузке данных', errorMessage);
        }
    };
    xhr.onerror = function () {
        showErrorMessage('Произошла ошибка при загрузке данных', errorMessage);
    };
    xhr.send();
}

function confirmDelete(inventoryId) {
    if (confirm("Вы уверены, что хотите удалить этот предмет инвентаря?")) {
        deleteInventory(inventoryId);
    }
}

function deleteInventory(inventoryId) {
    const errorMessage = document.getElementById('error-message-inventory');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/dashboard/inventory_delete', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            clearErrorMessage("error-message-inventory");
            loadAllInventory();
        } else {
            showErrorMessage(xhr.responseText, errorMessage);
        }
    };
    xhr.onerror = function () {
        showErrorMessage('Произошла ошибка при удалении данных', errorMessage);
    };
    xhr.send(JSON.stringify({
        inventory_id: inventoryId
    }));
}