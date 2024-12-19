document.addEventListener('DOMContentLoaded', function () {
    const logButton = document.getElementById('LogButton');
    const signinForm = document.getElementById('signin')
    if (logButton) {

        signinForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Предотвращаем стандартную отправку формы
            const username = document.getElementById('user').value;
            const password = document.getElementById('pass').value;

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
                        window.location.href = '/dashboard';// Редирект на дашборд при успехе
                    } else {
                        alert('Неверные учетные данные');// Вывод сообщения об ошибке
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Произошла ошибка при отправке данных');// Вывод сообщения об ошибке
                });
        });
    }
});