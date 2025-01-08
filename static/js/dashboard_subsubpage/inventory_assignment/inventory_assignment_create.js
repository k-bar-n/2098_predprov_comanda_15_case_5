function initInventoryAssignmentCreate() {
    const assignInventoryForm = document.getElementById('assign-inventory-form');
    const errorMessage = document.getElementById('error-message-assignments');


    if (assignInventoryForm) {
        assignInventoryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(assignInventoryForm);
            const jsonData = Object.fromEntries(formData.entries());
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/dashboard/assign_inventory', false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    clearErrorMessage("error-message-assignments");
                    loadAllAssignments();
                    assignInventoryForm.reset();
                } else {
                    showErrorMessage(xhr.responseText, errorMessage);
                }
            };
            xhr.onerror = function () {
                showErrorMessage('Произошла ошибка при отправке данных', errorMessage);
            };
            xhr.send(JSON.stringify(jsonData));
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initInventoryAssignmentCreate();
});