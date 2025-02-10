function initInventoryAddEdit() {
  const formHtml = `
    <h2>Управление инвентарем</h2>
    <div class="add-edit-form">
      <h3>Добавить/Изменить предмет</h3>
      <form id="add-edit-inventory-form" method="post">
          <input type="hidden" name="edit-id" id = "edit-inventory-id-hidden"/>
        <input type="text" name="name" id="edit-inventory-name" placeholder="Название" required /><br />
        <select name="image_type" id="image_type_edit" required>
          <option value="0">Без изображения</option>
          <option value="1">Изображение из папки</option>
          <option value="2">Изображение по ссылке</option>
        </select><br />
        <div id="image-input-edit"></div>
        <input type="number" name="quantity" id="edit-inventory-quantity" placeholder="Количество" required /><br />
        <select name="state" id="edit-inventory-state" required>
          <option value="новый">Новый</option>
          <option value="используемый">Используемый</option>
          <option value="сломанный">Сломанный</option>
        </select><br />
        <button class="button auth-form" type="submit">Сохранить</button>
      </form>
    </div>
    <div id="error-message-inventory" class="error-message"></div>

  `;
  const contentDiv = document.getElementById("subsubpage-content");
  contentDiv.innerHTML = formHtml;
  const form = document.getElementById("add-edit-inventory-form");
  const imageTypeSelect = document.getElementById("image_type_edit");
  const imageInputDiv = document.getElementById("image-input-edit");
  function updateImageInput() {
    const selectedType = imageTypeSelect.value;
    imageInputDiv.innerHTML = "";
    let inputElement;

    if (selectedType === "1") {
      inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.name = "image";
      inputElement.accept = "image/*";
      inputElement.required = true;
    } else if (selectedType === "2") {
      inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.name = "image";
      inputElement.placeholder = "URL изображения";
      inputElement.required = true;
    }
    if (inputElement) {
      imageInputDiv.appendChild(inputElement);
    }
  }

  imageTypeSelect.addEventListener("change", updateImageInput);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    let url = "/dashboard/inventory_add";
    if (formData.get("edit-id")) {
      url = "/dashboard/inventory_edit";
    }
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showErrorMessage(
            "Инвентарь успешно добавлен.",
            document.getElementById("error-message-inventory")
          );
        } else {
          showErrorMessage(
            "Ошибка при добавление инвентаря.",
            document.getElementById("error-message-inventory")
          );
        }
        document.getElementById("edit-inventory-id-hidden").value = "";
        document.getElementById("edit-inventory-name").value = "";
        document.getElementById("edit-inventory-quantity").value = "";
        document.getElementById("edit-inventory-state").value = "новый";
        setTimeout(() => {
          document.getElementById("error-message-inventory").style.display =
            "none";
        }, 3000);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
        showErrorMessage(
          "Произошла ошибка при отправке данных.",
          document.getElementById("error-message-inventory")
        );
      });
  });
  updateImageInput();
  return "";
}
