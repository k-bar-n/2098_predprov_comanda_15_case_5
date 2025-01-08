function initInventoryAddEdit() {
    const addEditInventoryForm = document.getElementById('add-edit-inventory-form');
    const errorMessage = document.getElementById('error-message-inventory');
    const imageTypeEdit = document.getElementById('image_type_edit');
    const imageInputEdit = document.getElementById('image-input-edit');

    function updateImageInput(selectElement, inputContainer) {
        const selectedValue = selectElement.value;
        inputContainer.innerHTML = "";

        if (selectedValue === '1') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = 'image';
            fileInput.required = true;
            inputContainer.appendChild(fileInput);
        } else if (selectedValue === '2') {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = 'image';
            textInput.placeholder = 'Ссылка на изображение';
            textInput.required = true;
            inputContainer.appendChild(textInput);
        }
    }
    updateImageInput(imageTypeEdit, imageInputEdit);


    imageTypeEdit.addEventListener('change', function () {
        updateImageInput(imageTypeEdit, imageInputEdit);
    });

    if (addEditInventoryForm) {
        addEditInventoryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(addEditInventoryForm);
            const xhr = new XMLHttpRequest();
            let url = '/dashboard/inventory_add'
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            if (jsonData['edit-id']) {
                url = '/dashboard/inventory_edit'
            }
            xhr.open('POST', url, false);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    clearErrorMessage("error-message-inventory");
                    addEditInventoryForm.reset();
                    imageInputEdit.innerHTML = "";
                    updateImageInput(imageTypeEdit, imageInputEdit);
                    loadAllInventory();
                } else {
                    showErrorMessage(xhr.responseText, errorMessage);
                }
            };
            xhr.onerror = function () {
                showErrorMessage(
                    'Произошла ошибка при отправке данных',
                    errorMessage
                );
            };
            xhr.send(formData);
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    initInventoryAddEdit()
});