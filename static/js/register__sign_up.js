document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('#signin');
    const regButton = document.getElementById('RegButton');
    const userInp = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const repPassInput = document.getElementById('rep_pass');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.querySelector('.success-message');
    const continueButton = document.createElement('button');

    continueButton.textContent = 'Продолжить';
    continueButton.classList.add('auth-form');
    continueButton.classList.add('continue-button');
    userInp.parentNode.insertBefore(continueButton, userInp.nextSibling);
    let userExists = false;
    repPassInput.disabled = true;
    repPassInput.style.opacity = 0.5;
    passInput.disabled = true;
    passInput.style.opacity = 0.5;
    continueButton.style.display = 'none';
    regButton.disabled = false;


    userInp.addEventListener('input', function () {
        if (userInp.value) {
            continueButton.style.display = 'flex';
            errorMessage.style.display = 'none';
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
        } else {
            continueButton.style.display = 'none';
            errorMessage.style.display = 'none';
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
        }
    });

    function checkUsernameAvailability(username) {
        return fetch('/check_username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: username,
                }),
            })
            .then(response => response.json())
            .then(data => {
                userExists = data.exists;
                if (userExists) {
                    passInput.disabled = true;
                    repPassInput.disabled = true;
                    passInput.style.opacity = 0.5;
                    repPassInput.style.opacity = 0.5;
                    showErrorMessage(
                        "Пользователь с таким именем уже существует",
                        errorMessage
                    );
                    regButton.style.display = 'none';
                    regButton.classList.remove('slide-in-left')
                } else {
                    passInput.disabled = false;
                    passInput.style.opacity = 1;
                    if (passInput.value) {
                        repPassInput.disabled = false;
                        repPassInput.style.opacity = 1;
                    }
                    errorMessage.style.display = "none"
                }
                return !userExists;
            })
            .catch(error => {
                console.error('Ошибка проверки имени пользователя:', error);
                return false
            });
    }

    continueButton.addEventListener('click', function (e) {
        e.preventDefault();
        checkUsernameAvailability(userInp.value).then(isAvailable => {
            if (isAvailable) {
                continueButton.classList.add('slide-out-up')
                setTimeout(function () {
                    continueButton.style.display = "none"
                    userInp.disabled = true;
                    passInput.parentNode.classList.add('slide-in-down')
                    repPassInput.parentNode.classList.add('slide-in-down')
                }, 500)
            }
        });
    });

    function updatePasswordStatus() {
        if (repPassInput.value && passInput.value) {
            if (passInput.value !== repPassInput.value) {
                showErrorMessage("Пароли не совпадают", errorMessage);
                regButton.style.display = "none"
                regButton.classList.remove('slide-in-left')
            } else {
                if (passInput.value.length < 6) {
                    showErrorMessage("Пароль слишком короткий (минимум 6 символов)", errorMessage);
                    regButton.style.display = "none"
                    regButton.classList.remove('slide-in-left')
                } else {
                    errorMessage.textContent = "Пароли совпадают";
                    errorMessage.style.color = 'green';
                }
            }
            errorMessage.style.display = "flex";
        } else {
            errorMessage.style.display = "none";
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
        }
    }

    passInput.addEventListener('input', function () {
        if (passInput.value && !userExists) {
            repPassInput.disabled = false;
            repPassInput.style.opacity = 1;
        } else {
            repPassInput.disabled = true;
            repPassInput.style.opacity = 0.5;
        }
        updatePasswordStatus();
    });

    repPassInput.addEventListener('input', updatePasswordStatus);

    registrationForm.addEventListener('input', function () {
        if (passInput.value && repPassInput.value && document.getElementById('user').value && passInput.value === repPassInput.value && !userExists && passInput.value.length >= 6) {
            regButton.style.display = 'flex';
            regButton.classList.add('slide-in-left');
        } else {
            regButton.style.display = 'none';
            regButton.classList.remove('slide-in-left');
        }
    });

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        regButton.disabled = true;
        regButton.style.cursor = 'default';

        if (passInput.value !== repPassInput.value) {
            showErrorMessage("Пароли не совпадают", errorMessage);
            regButton.disabled = false;
            regButton.style.cursor = 'pointer';
        } else if (passInput.value.length < 6) {
            showErrorMessage("Пароль слишком короткий (минимум 6 символов)", errorMessage);
            regButton.disabled = false;
            regButton.style.cursor = 'pointer';
        } else {
            fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: userInp.value,
                        pass: passInput.value,
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        successMessage.style.display = "flex"
                        successMessage.innerHTML = `
                                <div class="success-message">
                                  <h2>Регистрация прошла успешно!</h2>
                                  <p>
                                    Через <span id="timer">2</span> секунды Вы будете автоматически
                                    перенаправлены на страницу для прохождения <a href="{{ url_for('signin') }}"">авторизации</a>.
                                  </p>
                                </div>`;
                        setTimeout(function () {
                            window.location.href = '/signin';
                        }, 2000);
                        regButton.disabled = true;

                    } else {
                        response.text().then(text => {
                            showErrorMessage(text, errorMessage);
                        });
                        regButton.disabled = false;
                        regButton.style.cursor = 'pointer';
                        return;
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    showErrorMessage('Произошла ошибка при отправке данных', errorMessage);
                    regButton.disabled = false;
                    regButton.style.cursor = 'pointer';
                    return;
                });
        }
    });
});

function showErrorMessage(message, element) {
    element.textContent = message;
    element.style.color = 'red';
    element.style.display = 'flex';
}