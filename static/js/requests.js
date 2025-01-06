function loadProducts() {
    fetch("/dashboard/get_all_inventory") // Запрос к Flask
        .then((response) => response.json())
        .then((data) => {
            const container = document.getElementById("productContainer");
            container.innerHTML = ""; // Очищаем контейнер
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
                     <p>Цена: ${product.price} руб.</p>
                     <p>Состояние: ${product.state}</p>
                       <button onclick="addToCart('${product.name}', ${product.price})" class = "magazine-button">
                          Добавить в корзину
                      </button>
                                                `;
                container.appendChild(productDiv);
            });
        })
        .catch((error) => console.error("Ошибка загрузки товаров:", error));
}
loadProducts();