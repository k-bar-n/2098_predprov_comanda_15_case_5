function loadAllPurchasesForReport() {
  const reportContainer = document.getElementById("all_purchase_plans_reports");
  const errorMessage = document.getElementById("error-message-reports");

  fetch("/dashboard/get_all_purchases_for_report")
    .then((response) => response.json())
    .then((purchases) => {
      reportContainer.innerHTML = "";
      if (purchases.length === 0) {
        reportContainer.innerHTML = "<p>Нет планов закупок.</p>";
        return;
      }
      const table = document.createElement("table");
      table.classList.add("report-table");
      table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID инвентаря</th>
                        <th>Количество</th>
                         <th>Цена</th>
                        <th>Поставщик</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
      const tbody = table.querySelector("tbody");
      purchases.forEach((purchase) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${purchase.id}</td>
                    <td>${purchase.inventory_id}</td>
                    <td>${purchase.quantity}</td>
                    <td>${purchase.price}</td>
                    <td>${purchase.supplier}</td>
                `;
        tbody.appendChild(row);
      });
      reportContainer.appendChild(table);
    })
    .catch((error) => {
      console.error("Ошибка получения отчета по планам закупок:", error);
      showErrorMessage(
        "Ошибка при загрузке отчета по планам закупок.",
        errorMessage
      );
    });
}

document.addEventListener("DOMContentLoaded", loadAllPurchasesForReport);
