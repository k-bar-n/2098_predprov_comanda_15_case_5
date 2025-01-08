function loadSubContent(menu) {
    // Удаляем класс 'active' у всех кнопок
    const buttons = document.querySelectorAll(".dashboard-button");
    buttons.forEach((button) => button.classList.remove("active"));

    // Добавляем класс 'active' к нажатой кнопке
    const activeButton = document.querySelector(`.dashboard-button[onclick="loadSubContent('${menu}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    // Перенаправляем на нужный URL
    window.location.href = `/dashboard?menu=${menu}`;
}

function loadSubSubContent(menu, subpage) {
    // Удаляем класс 'active' у всех кнопок
    const buttons = document.querySelectorAll(".dashboard-button");
    buttons.forEach((button) => button.classList.remove("active"));

    // Добавляем класс 'active' к кнопке родительского меню
    const activeButton = document.querySelector(`.dashboard-button[onclick="loadSubContent('${menu}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    // Перенаправляем на нужный URL
    window.location.href = `/dashboard?menu=${menu}&subpage=${subpage}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('menu');
    const subpage = urlParams.get('subpage');

    if (menu && subpage) {
        // Inventory Management
        if (menu === "inventory_management" && subpage === "all_inventory") {
            loadAllInventory();
        } else if (menu === "inventory_management" && subpage === "inventory_add_edit") {
            initInventoryAddEdit();
        }

        // Inventory Assignment
        else if (menu === "inventory_assignment" && subpage === "all_assignments") {
            loadAllAssignments();
        } else if (menu === "inventory_assignment" && subpage === "inventory_assignment_create") {
            initInventoryAssignmentCreate();
        }

        // Purchases Management
        else if (menu === "purchases_management" && subpage === "all_purchase_plans") {
            loadAllPurchases();
        } else if (menu === "purchases_management" && subpage === "purchases_add_edit") {
            initPurchasesAddEdit();
        }

        // Reports
        else if (menu === "reports" && subpage === "all_inventory") {
            loadAllInventoryForReport();
        } else if (menu === "reports" && subpage === "all_assignments") {
            loadAllAssignmentsForReport();
        } else if (menu === "reports" && subpage === "all_purchases") {
            loadAllPurchasesForReport();
        }

        // Requests
        else if (menu === "requests" && subpage === "all_requests") {
            loadAllRequests();
        } else if (menu === "requests" && subpage === "request_create") {
            initRequestCreate();
        }
    }
});