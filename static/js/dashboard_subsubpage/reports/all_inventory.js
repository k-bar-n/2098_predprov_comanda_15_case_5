function loadAllInventoryForReport() {
  const reportContainer = document.getElementById("all_inventory_reports");
  const errorMessage = document.getElementById("error-message-reports");

  fetch("/dashboard/get_all_inventory_for_report")
    .then((response) => response.json())
    .then((inventory) => {
      reportContainer.innerHTML = "";
      if (inventory.length === 0) {
        reportContainer.innerHTML = "<p>Нет инвентаря.</p>";
        return;
      }
      const table = document.createElement("table");
      table.classList.add("report-table");
      table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Состояние</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
      const tbody = table.querySelector("tbody");
      inventory.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.state}</td>
                `;
        tbody.appendChild(row);
      });
      reportContainer.appendChild(table);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке отчета по инвентарю:", error);
      showErrorMessage(
        "Ошибка при загрузке отчета по инвентарю.",
        errorMessage
      );
    });
}

document.addEventListener("DOMContentLoaded", loadAllInventoryForReport);
