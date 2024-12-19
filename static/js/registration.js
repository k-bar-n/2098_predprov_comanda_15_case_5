document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('#signin');
    const regButton = document.getElementById('RegButton');
    const wrongPassMessage = document.getElementById('wrong_pass');

    if (registrationForm) {
        regButton.onclick = function (e) { // Теперь клик по кнопке отправляет форму
            const pass = document.getElementById('pass').value;
            const passRep = document.getElementById('rep_pass').value;
            if (pass !== passRep) {
                wrongPassMessage.style.display = 'block';
                e.preventDefault(); // Предотвращаем отправку формы
            } else {
                wrongPassMessage.style.display = 'none';
                registrationForm.submit()
            }
        }
    }
});