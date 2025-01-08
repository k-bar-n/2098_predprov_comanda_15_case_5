function showErrorMessage(message, element) {
    if (!element) {
        console.error("Элемент для вывода ошибки не найден.");
        return;
    }
    element.textContent = message;
    element.style.color = 'red';
    element.style.display = 'flex';
}

function clearErrorMessage(elementId) {
    const errorMessage = document.getElementById(elementId);
    if (!errorMessage) {
        console.error("Элемент для очистки ошибки не найден.");
        return;
    }
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}