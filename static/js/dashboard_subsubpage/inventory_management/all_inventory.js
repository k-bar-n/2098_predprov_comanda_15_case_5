document.addEventListener('DOMContentLoaded', function () {
    const allInventory = document.getElementById("all_inventory");
    const errorMessage = document.getElementById('error-message-inventory');

    function loadAllInventory() {
        fetch('/dashboard/get_all_inventory')
            .then((response) => response.json())
            .then((data) => {
                allInventory.innerHTML = ""; // Очищаем контейнер
                data.forEach((inventory) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${inventory.id}, Название: ${inventory.name}, Количество: ${inventory.quantity}, Состояние: ${inventory.state}, Цена: ${inventory.price}`;
                    allInventory.appendChild(listItem);
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
    loadAllInventory();
});