function loadAllAssignmentsForReport() {
  const reportContainer = document.getElementById("all_assignments_reports");
  const errorMessage = document.getElementById("error-message-reports");
  fetch("/dashboard/get_all_assignments_for_report")
    .then((response) => response.json())
    .then((assignments) => {
      reportContainer.innerHTML = "";
      if (assignments.length === 0) {
        reportContainer.innerHTML = "<p>Нет назначений инвентаря.</p>";
        return;
      }
      const table = document.createElement("table");
      table.classList.add("report-table");
      table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID назначения</th>
                        <th>ID пользователя</th>
                        <th>ID инвентаря</th>
                        <th>Количество</th>
                        <th>Дата назначения</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
      const tbody = table.querySelector("tbody");
      assignments.forEach((assignment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${assignment.id}</td>
                    <td>${assignment.user_id}</td>
                    <td>${assignment.inventory_id}</td>
                    <td>${assignment.quantity_assigned}</td>
                    <td>${assignment.assignment_date}</td>
                `;
        tbody.appendChild(row);
      });
      reportContainer.appendChild(table);
    })
    .catch((error) => {
      console.error("Ошибка получения отчета по назначениям:", error);
      showErrorMessage(
        "Ошибка при загрузке отчета по назначениям.",
        errorMessage
      );
    });
}

document.addEventListener("DOMContentLoaded", loadAllAssignmentsForReport);
