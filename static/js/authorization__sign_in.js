document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin');
    const errorMessage = document.getElementById('error-message');
    const logButton = document.getElementById('LogButton');
    const usernameInput = document.getElementById('user');
    const passwordInput = document.getElementById('pass');

    function clearErrorMessage() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
    usernameInput.addEventListener('input', clearErrorMessage);
    passwordInput.addEventListener('input', clearErrorMessage);

    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            logButton.disabled = true;
            logButton.style.cursor = 'default';

            const username = usernameInput.value;
            const password = passwordInput.value;

            fetch('/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: username,
                        pass: password,
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        errorMessage.textContent =
                            'Вы успешно авторизировались! Перенаправление через 2 секунды...';
                        errorMessage.style.color = 'green';
                        errorMessage.style.display = 'block';
                        setTimeout(function () {
                            window.location.href = '/dashboard';
                        }, 2000);
                    } else {
                        response.text().then(text => {
                            showErrorMessage(text, errorMessage);
                        });
                        logButton.disabled = false;
                        logButton.style.cursor = 'pointer';
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    showErrorMessage(
                        'Произошла ошибка при отправке данных',
                        errorMessage
                    );
                    logButton.disabled = false;
                    logButton.style.cursor = 'pointer';
                });
        });
    }

    function showErrorMessage(message, element) {
        element.textContent = message;
        element.style.color = 'red';
        element.style.display = 'block';
    }
});