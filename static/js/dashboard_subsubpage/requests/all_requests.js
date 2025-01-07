function loadAllRequests() {
    const allRequests = document.getElementById("all_requests");
    const errorMessage = document.getElementById('error-message-requests');
    fetch('/dashboard/get_all_requests')
        .then((response) => response.json())
        .then((data) => {
            allRequests.innerHTML = "";
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
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            showErrorMessage(
                'Произошла ошибка при загрузке данных',
                errorMessage
            );
        });
}

function updateRequestStatus(requestId, status) {
    const errorMessage = document.getElementById('error-message-requests');
    fetch('/dashboard/request_update_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request_id: requestId,
                status: status
            })
        })
        .then(response => {
            if (response.ok) {
                clearErrorMessage();
                loadAllRequests(); // Перезагрузка списка после изменения статуса
            } else {
                response.text().then(text => {
                    showErrorMessage(text, errorMessage);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showErrorMessage(
                'Произошла ошибка при изменении статуса данных',
                errorMessage
            );
        });
}