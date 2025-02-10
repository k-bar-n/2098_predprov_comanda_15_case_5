function initRequestCreate() {
  const form = document.getElementById("create-request-form");
  const errorMessage = document.getElementById("error-message-requests");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inventoryId = form.inventory_id.value;
    const quantityRequested = form.quantity_requested.value;
    const requestType = form.request_type.value;

    fetch("/dashboard/request_create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventory_id: inventoryId,
        quantity_requested: quantityRequested,
        request_type: requestType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showErrorMessage("Заявка успешно создана.", errorMessage);
        } else {
          showErrorMessage("Ошибка при создание заявки.", errorMessage);
        }
        form.reset();
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
        showErrorMessage("Произошла ошибка при отправке данных.", errorMessage);
      });
  });
}

document.addEventListener("DOMContentLoaded", initRequestCreate);
