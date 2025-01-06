document.addEventListener('DOMContentLoaded', function () {
    const allInventoryReports = document.getElementById("all_inventory_reports");
    const errorMessage = document.getElementById('error-message-reports');

    function loadAllInventory() {
        fetch('/dashboard/get_all_inventory')
            .then((response) => response.json())
            .then((data) => {
                allInventoryReports.innerHTML = ""; // Очищаем контейнер
                data.forEach((inventory) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${inventory.id}, Название: ${inventory.name}, Количество: ${inventory.quantity}, Состояние: ${inventory.state}, Цена: ${inventory.price}`;
                    allInventoryReports.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Ошибка при загрузке отчета: ", error);
                showErrorMessage(
                    'Произошла ошибка при загрузке данных',
                    errorMessage
                );
            });
    }
    loadAllInventory();
});