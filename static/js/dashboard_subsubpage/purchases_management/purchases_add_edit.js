function initPurchasesAddEdit() {
    const addEditPurchaseForm = document.getElementById('add-edit-purchase-form');
    const errorMessage = document.getElementById('error-message-purchases');

    if (addEditPurchaseForm) {
        addEditPurchaseForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(addEditPurchaseForm);
            const jsonData = Object.fromEntries(formData.entries());
            let url = '/dashboard/purchase_add'
            if (jsonData['edit-id']) {
                url = '/dashboard/purchase_edit'
            }
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                })
                .then(response => {
                    if (response.ok) {
                        clearErrorMessage();
                        loadAllPurchases()
                        addEditPurchaseForm.reset();
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
}
document.addEventListener('DOMContentLoaded', function () {
    initPurchasesAddEdit();
});