function loadAllInventory() {
    const allInventory = document.getElementById("all_inventory");
    const errorMessage = document.getElementById('error-message-inventory');
    fetch('/dashboard/get_all_inventory')
        .then((response) => response.json())
        .then((data) => {
            allInventory.innerHTML = ""; // Очищаем контейнер
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
                      <p>Цена: ${product.price} руб.</p>
                      <p>Количество: ${product.quantity}</p>
                      <p>Состояние: ${product.state}</p>
                      <p>Тип изображения: ${product.image_type}</p>
                        <button onclick="deleteInventory(${product.id})" class = "magazine-button">
                          Удалить
                      </button>
                                  `;
                allInventory.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            showErrorMessage(
                'Произошла ошибка при загрузке данных',
                errorMessage
            );
        });
}

function deleteInventory(inventoryId) {
    const errorMessage = document.getElementById('error-message-inventory');

    fetch('/dashboard/inventory_delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inventory_id: inventoryId
            })
        })
        .then(response => {
            if (response.ok) {
                clearErrorMessage();
                loadAllInventory(); // Перезагрузка списка после удаления
            } else {
                response.text().then(text => {
                    showErrorMessage(text, errorMessage);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showErrorMessage(
                'Произошла ошибка при удалении данных',
                errorMessage
            );
        });
}