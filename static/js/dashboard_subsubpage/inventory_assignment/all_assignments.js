function loadAllAssignments() {
    const allAssignments = document.getElementById("all_assignments");
    const errorMessage = document.getElementById('error-message-assignments');
    fetch('/dashboard/get_all_assignments')
        .then((response) => response.json())
        .then((data) => {
            allAssignments.innerHTML = "";
            data.forEach((assignment) => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${assignment.id}, User ID: ${assignment.user_id}, Inventory ID: ${assignment.inventory_id}, Количество: ${assignment.quantity_assigned}`;
                allAssignments.appendChild(listItem);
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