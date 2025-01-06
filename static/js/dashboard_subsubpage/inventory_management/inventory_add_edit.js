document.addEventListener('DOMContentLoaded', function () {
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
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            const image_type = document.getElementById("image_type_edit").value
            let url = '/dashboard/inventory_add'
            if (jsonData['edit-id']) {
                url = '/dashboard/inventory_edit'
            }

            fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => {
                    if (response.ok) {
                        clearErrorMessage();
                        addEditInventoryForm.reset();
                        imageInputEdit.innerHTML = "";
                        updateImageInput(imageTypeEdit, imageInputEdit);
                        loadAllInventory()
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