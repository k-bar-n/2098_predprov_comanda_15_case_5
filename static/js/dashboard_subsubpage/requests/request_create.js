function initRequestCreate() {
    if (role === "admin") { // Добавляем проверку
        return;
    }

    const createRequestForm = document.getElementById('create-request-form');
    const errorMessage = document.getElementById('error-message-requests');

    if (createRequestForm) {
        createRequestForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(createRequestForm);
            const jsonData = Object.fromEntries(formData.entries());
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/dashboard/request_create', false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    clearErrorMessage("error-message-requests");
                    loadAllRequests();
                    createRequestForm.reset();
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

document.addEventListener('DOMContentLoaded', initRequestCreate);