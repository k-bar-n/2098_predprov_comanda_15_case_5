function loadAllPurchases() {
  const purchaseList = document.getElementById("all_purchase_plans");
  const errorMessage = document.getElementById("error-message-purchases");
  fetch("/dashboard/get_all_purchases")
    .then((response) => response.json())
    .then((purchases) => {
      purchaseList.innerHTML = "";
      purchases.forEach((purchase) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                    ID: ${purchase.id}, 
                    Inventory ID: ${purchase.inventory_id}, 
                    Quantity: ${purchase.quantity},
                    Price: ${purchase.price},
                    Supplier: ${purchase.supplier}
                `;
        purchaseList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Ошибка получения планов закупок:", error);
      showErrorMessage(
        "Ошибка при загрузке данных о планах закупок.",
        errorMessage
      );
    });
}
document.addEventListener("DOMContentLoaded", loadAllPurchases);
