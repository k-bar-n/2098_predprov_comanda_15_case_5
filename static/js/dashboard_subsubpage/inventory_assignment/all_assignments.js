function loadAllAssignments() {
  const assignmentsList = document.getElementById("all_assignments");
  const errorMessage = document.getElementById("error-message-assignments");

  fetch("/dashboard/get_all_assignments")
    .then((response) => response.json())
    .then((assignments) => {
      assignmentsList.innerHTML = "";
      assignments.forEach((assignment) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                    ID: ${assignment.id}, 
                    User ID: ${assignment.user_id}, 
                    Inventory ID: ${assignment.inventory_id}, 
                    Quantity: ${assignment.quantity_assigned},
                    Date: ${assignment.assignment_date}
                `;
        assignmentsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Ошибка получения назначений:", error);
      showErrorMessage(
        "Ошибка при загрузке данных о назначениях.",
        errorMessage
      );
    });
}
document.addEventListener("DOMContentLoaded", loadAllAssignments);
