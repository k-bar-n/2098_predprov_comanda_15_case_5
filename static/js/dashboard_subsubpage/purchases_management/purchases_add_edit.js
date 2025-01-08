function initPurchasesAddEdit() {
    const addEditPurchaseForm = document.getElementById('add-edit-purchase-form');
    const errorMessage = document.getElementById('error-message-purchases');

    if (addEditPurchaseForm) {
        addEditPurchaseForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(addEditPurchaseForm);
            const jsonData = Object.fromEntries(formData.entries());
            const xhr = new XMLHttpRequest();
            let url = '/dashboard/purchase_add'
            if (jsonData['edit-id']) {
                url = '/dashboard/purchase_edit'
            }
            xhr.open('POST', url, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    clearErrorMessage("error-message-purchases");
                    loadAllPurchases()
                    addEditPurchaseForm.reset();
                } else {
                    showErrorMessage(xhr.responseText, errorMessage);
                }
            };
            xhr.onerror = function () {
                showErrorMessage('Произошла ошибка при отправке данных', errorMessage);
            };
            xhr.send(JSON.stringify(jsonData));
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initPurchasesAddEdit();
});