function initInventoryAssignmentCreate() {
    const assignInventoryForm = document.getElementById('assign-inventory-form');
    const errorMessage = document.getElementById('error-message-assignments');


    if (assignInventoryForm) {
        assignInventoryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(assignInventoryForm);
            const jsonData = Object.fromEntries(formData.entries());

            fetch('/dashboard/assign_inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                })
                .then(response => {
                    if (response.ok) {
                        clearErrorMessage();
                        loadAllAssignments();
                        assignInventoryForm.reset();
                    } else {
                        response.text().then(text => {
                            showErrorMessage(text, errorMessage);
                        });
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    showErrorMessage(
                        'Произошла ошибка при отправке данных',
                        errorMessage
                    );
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initInventoryAssignmentCreate();
});