document.addEventListener('DOMContentLoaded', function () {
    const allRequests = document.getElementById("all_requests");
    const errorMessage = document.getElementById('error-message-requests');

    function loadAllRequests() {
        fetch('/dashboard/get_all_requests')
            .then((response) => response.json())
            .then((data) => {
                allRequests.innerHTML = "";
                data.forEach((request) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${request.id}, Inventory ID: ${request.inventory_id}, Количество: ${request.quantity_requested}, Тип заявки: ${request.request_type}, Статус: ${request.status}, Дата запроса: ${request.request_date}`;
                    allRequests.appendChild(listItem);
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
    loadAllRequests();
});