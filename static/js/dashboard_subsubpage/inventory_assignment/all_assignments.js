function loadAllAssignments() {
    const allAssignments = document.getElementById("all_assignments");
    const errorMessage = document.getElementById('error-message-assignments');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard/get_all_assignments', false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            allAssignments.innerHTML = "";
            const data = JSON.parse(xhr.responseText);
            data.forEach((assignment) => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${assignment.id}, User ID: ${assignment.user_id}, Inventory ID: ${assignment.inventory_id}, Количество: ${assignment.quantity_assigned}`;
                allAssignments.appendChild(listItem);
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