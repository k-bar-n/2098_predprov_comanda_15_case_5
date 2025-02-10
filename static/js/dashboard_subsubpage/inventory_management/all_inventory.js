function loadAllInventory() {
  const productContainer = document.getElementById("productContainer");
  const errorMessage = document.getElementById("error-message-inventory");

  fetch("/dashboard/get_all_inventory")
    .then((response) => response.json())
    .then((inventory) => {
      productContainer.innerHTML = "";
      inventory.forEach((item) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        let imageElement = document.createElement("img");
        if (item.image_type === 0 || !item.image || item.image === "") {
          imageElement.src = "/static/images/no_image.png";
        } else if (item.image_type === 1) {
          imageElement.src = `/static/images/${item.image}`;
        } else if (item.image_type === 2) {
          imageElement.src = item.image;
        }

        productDiv.appendChild(imageElement);
        productDiv.innerHTML += `
                   
                    <h2>${item.name}</h2>
                    <p>Количество: ${item.quantity}</p>
                    <p>Состояние: ${item.state}</p>
                    
                `;

        productContainer.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Ошибка получения инвентаря:", error);
      showErrorMessage(
        "Ошибка при загрузке данных об инвентаре.",
        errorMessage
      );
    });
}

document.addEventListener("DOMContentLoaded", loadAllInventory);
