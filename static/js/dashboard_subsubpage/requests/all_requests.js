function loadAllRequests() {
  const requestsList = document.getElementById("all_requests");
  const errorMessage = document.getElementById("error-message-requests");
  const role = getCookie("session_role");
  fetch("/dashboard/get_all_requests")
    .then((response) => response.json())
    .then((requests) => {
      requestsList.innerHTML = "";
      requests.forEach((request) => {
        const listItem = document.createElement("li");
        let statusButton = "";
        if (role === "admin" && request.status === "pending") {
          statusButton = `
                        <div class="dropdown">
                          <button class="status-button">Изменить статус</button>
                            <div class="dropdown-content">
                            <a href="#" data-request-id="${request.id}" data-status="approved" class="update-status-btn">Одобрить</a>
                            <a href="#" data-request-id="${request.id}" data-status="rejected" class="update-status-btn">Отклонить</a>
                            </div>
                        </div>

                    `;
        }
        listItem.innerHTML = `
                    ID: ${request.id}, 
                    User ID: ${request.user_id}, 
                    Inventory ID: ${request.inventory_id}, 
                    Quantity: ${request.quantity_requested},
                    Status: ${request.status},
                    Type: ${request.request_type},
                    Date: ${request.request_date}
                    ${statusButton}
                `;
        requestsList.appendChild(listItem);
      });
      if (role === "admin") {
        const updateButtons = document.querySelectorAll(".update-status-btn");
        updateButtons.forEach((button) => {
          button.addEventListener("click", function (e) {
            e.preventDefault();
            const requestId = this.getAttribute("data-request-id");
            const status = this.getAttribute("data-status");
            updateRequestStatus(requestId, status, errorMessage);
          });
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка получения заявок:", error);
      showErrorMessage("Ошибка при загрузке данных о заявках.", errorMessage);
    });
}
document.addEventListener("DOMContentLoaded", loadAllRequests);
function updateRequestStatus(requestId, status, errorMessage) {
  fetch("/dashboard/request_update_status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_id: requestId,
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        loadAllRequests();
        showErrorMessage("Статус заявки успешно обновлен.", errorMessage);
      } else {
        showErrorMessage("Ошибка при обновлении статуса заявки.", errorMessage);
      }
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных:", error);
      showErrorMessage("Произошла ошибка при отправке данных.", errorMessage);
    });
}
