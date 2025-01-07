function loadAllPurchases() {
    const allPurchasePlans = document.getElementById("all_purchase_plans");
    const errorMessage = document.getElementById('error-message-purchases');

    fetch('/dashboard/get_all_purchases')
        .then((response) => response.json())
        .then((data) => {
            allPurchasePlans.innerHTML = "";
            data.forEach((purchase) => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${purchase.id}, Inventory ID: ${purchase.inventory_id}, Количество: ${purchase.quantity}, Цена: ${purchase.price}, Поставщик: ${purchase.supplier}`;
                allPurchasePlans.appendChild(listItem);
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