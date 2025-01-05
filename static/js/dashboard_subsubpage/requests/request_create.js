document.addEventListener('DOMContentLoaded', function () {
    const createRequestForm = document.getElementById('create-request-form');
    const errorMessage = document.getElementById('error-message-requests');

    if (createRequestForm) {
        createRequestForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(createRequestForm);
            const jsonData = Object.fromEntries(formData.entries());
            fetch('/dashboard/request_create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                })
                .then(response => {
                    if (response.ok) {
                        clearErrorMessage();
                        loadAllRequests(); // Предполагается, что функция loadAllRequests есть в all_requests.js
                        createRequestForm.reset();
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
});