function initInventoryAssignmentCreate() {
  const assignForm = document.getElementById("assign-inventory-form");
  const errorMessage = document.getElementById("error-message-assignments");

  assignForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = assignForm.user_id.value;
    const inventoryId = assignForm.inventory_id.value;
    const quantityAssigned = assignForm.quantity_assigned.value;

    fetch("/dashboard/assign_inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        inventory_id: inventoryId,
        quantity_assigned: quantityAssigned,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showErrorMessage("Инвентарь успешно закреплен.", errorMessage);
        } else {
          showErrorMessage("Ошибка при назначении инвентаря.", errorMessage);
        }
        assignForm.reset();
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

document.addEventListener("DOMContentLoaded", initInventoryAssignmentCreate);
