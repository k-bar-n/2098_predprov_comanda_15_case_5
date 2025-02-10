function initPurchasesAddEdit() {
  const form = document.getElementById("add-edit-purchase-form");
  const errorMessage = document.getElementById("error-message-purchases");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const editId = form.edit_id.value;
    const inventoryId = form.inventory_id.value;
    const quantity = form.quantity.value;
    const price = form.price.value;
    const supplier = form.supplier.value;

    let url = "/dashboard/purchase_add";
    let data = {
      inventory_id: inventoryId,
      quantity: quantity,
      price: price,
      supplier: supplier,
    };

    if (editId) {
      url = "/dashboard/purchase_edit";
      data["edit-id"] = editId;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showErrorMessage("План закупки успешно сохранен.", errorMessage);
        } else {
          showErrorMessage(
            "Ошибка при сохранении плана закупки.",
            errorMessage
          );
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

document.addEventListener("DOMContentLoaded", initPurchasesAddEdit);
