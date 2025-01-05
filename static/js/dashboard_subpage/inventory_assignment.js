function showErrorMessage(message, element) {
    element.textContent = message;
    element.style.color = 'red';
    element.style.display = 'flex';
}

function clearErrorMessage() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}