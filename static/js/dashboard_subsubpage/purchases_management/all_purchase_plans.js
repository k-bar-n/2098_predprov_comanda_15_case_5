function loadAllPurchases() {
    const allPurchasePlans = document.getElementById("all_purchase_plans");
    const errorMessage = document.getElementById('error-message-purchases');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard/get_all_purchases', false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            allPurchasePlans.innerHTML = "";
            const data = JSON.parse(xhr.responseText);
            data.forEach((purchase) => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${purchase.id}, Inventory ID: ${purchase.inventory_id}, Количество: ${purchase.quantity}, Цена: ${purchase.price}, Поставщик: ${purchase.supplier}`;
                allPurchasePlans.appendChild(listItem);
            });
        } else {
            showErrorMessage('Произошла ошибка при загрузке данных', errorMessage);
        }
    };
    xhr.onerror = function () {
        showErrorMessage('Произошла ошибка при загрузке данных', errorMessage);
    };
    xhr.send();
}