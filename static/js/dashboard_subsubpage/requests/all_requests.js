function loadAllRequests() {
    const allRequests = document.getElementById("all_requests");
    const errorMessage = document.getElementById('error-message-requests');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard/get_all_requests', false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            allRequests.innerHTML = "";
            const data = JSON.parse(xhr.responseText);
            data.forEach((request) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                       ID: ${request.id}, 
                       Inventory ID: ${request.inventory_id},
                       Количество: ${request.quantity_requested},
                       Тип заявки: ${request.request_type},
                       Статус: ${request.status},
                       Дата запроса: ${request.request_date}
                         ${sessionStorage.getItem('role') === 'admin' ?
                         `<div class="dropdown">
                                <button class="dashboard-button">Изменить статус</button>
                                <div class="dropdown-content">
                                    <a onclick="updateRequestStatus(${request.id}, 'approved')">Одобрить</a>
                                    <a onclick="updateRequestStatus(${request.id}, 'rejected')">Отклонить</a>
                                    <a onclick="updateRequestStatus(${request.id}, 'pending')">В ожидании</a>
                                </div>
                            </div>` : ''}
                        
                        `;
                allRequests.appendChild(listItem);
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

function updateRequestStatus(requestId, status) {
    const errorMessage = document.getElementById('error-message-requests');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/dashboard/request_update_status', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            clearErrorMessage("error-message-requests");
            loadAllRequests();
        } else {
            showErrorMessage(xhr.responseText, errorMessage);
        }
    };
    xhr.onerror = function () {
        showErrorMessage('Произошла ошибка при изменении статуса данных', errorMessage);
    };
    xhr.send(JSON.stringify({
        request_id: requestId,
        status: status
    }));
}