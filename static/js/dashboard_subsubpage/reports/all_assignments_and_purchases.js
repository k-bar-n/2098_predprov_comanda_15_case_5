document.addEventListener('DOMContentLoaded', function () {
    const allAssignmentsReports = document.getElementById("all_assignments_reports");
    const allPurchasePlansReports = document.getElementById("all_purchase_plans_reports");


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
            .catch((error) => console.error("Ошибка при загрузке отчета: ", error));
    }

    function loadAllAssignments() {
        fetch('/dashboard/get_all_assignments')
            .then((response) => response.json())
            .then((data) => {
                allAssignmentsReports.innerHTML = "";
                data.forEach((assignment) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${assignment.id}, User ID: ${assignment.user_id}, Inventory ID: ${assignment.inventory_id}, Количество: ${assignment.quantity_assigned}`;
                    allAssignmentsReports.appendChild(listItem);
                });
            })
            .catch((error) => console.error("Ошибка при загрузке отчета: ", error));
    }

    function loadAllPurchases() {
        fetch('/dashboard/get_all_purchases')
            .then((response) => response.json())
            .then((data) => {
                allPurchasePlansReports.innerHTML = "";
                data.forEach((purchase) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${purchase.id}, Inventory ID: ${purchase.inventory_id}, Количество: ${purchase.quantity}, Цена: ${purchase.price}, Поставщик: ${purchase.supplier}`;
                    allPurchasePlansReports.appendChild(listItem);
                });
            })
            .catch((error) => console.error("Ошибка при загрузке отчета: ", error));
    }

    loadAllAssignments();
    loadAllPurchases();
});