document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('#signin');
    const regButton = document.getElementById('RegButton');
    const userInp = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const repPassInput = document.getElementById('rep_pass');
    const passStatus = document.getElementById('pass_status');
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

    userInp.addEventListener('input', function () {
        if (userInp.value) {
            continueButton.style.display = 'block';
            passStatus.style.display = 'none';
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
        } else {
            continueButton.style.display = 'none';
            passStatus.style.display = 'none';
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
                    passStatus.textContent = "Пользователь с таким именем уже существует";
                    passStatus.style.color = "red";
                    passStatus.style.display = "block";
                    regButton.style.display = 'none';
                    regButton.classList.remove('slide-in-left')
                } else {
                    passInput.disabled = false;
                    passInput.style.opacity = 1;
                    if (passInput.value) {
                        repPassInput.disabled = false;
                        repPassInput.style.opacity = 1;
                    }
                    passStatus.style.display = "none"
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
                passStatus.textContent = "Пароли не совпадают";
                passStatus.style.color = 'red';
                regButton.style.display = "none"
                regButton.classList.remove('slide-in-left')
            } else {
                passStatus.textContent = "Пароли совпадают";
                passStatus.style.color = 'green';
            }
            passStatus.style.display = "block"
        } else {
            passStatus.style.display = "none"
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
        }
    }

    passInput.addEventListener('input', function () {
        if (passInput.value && !userExists) {
            repPassInput.disabled = false
            repPassInput.style.opacity = 1
        } else {
            repPassInput.disabled = true
            repPassInput.style.opacity = 0.5
        }
        updatePasswordStatus()
    })

    repPassInput.addEventListener('input', updatePasswordStatus);

    registrationForm.addEventListener('input', function () {
        if (passInput.value && repPassInput.value && document.getElementById('user').value && passInput.value === repPassInput.value && !userExists) {
            regButton.style.display = 'block';
            regButton.classList.add('slide-in-left');
        } else {
            regButton.style.display = 'none';
            regButton.classList.remove('slide-in-left')
        }
    });

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (passInput.value !== repPassInput.value) {
            passStatus.textContent = "Пароли не совпадают";
            passStatus.style.color = 'red';
            regButton.style.display = "none"
            regButton.classList.remove('slide-in-left')
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
                        //  window.location.href = '/signin';
                    } else {
                        response.text().then(text => {
                            showErrorMessage(text, passStatus);
                        });
                        return
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Произошла ошибка при отправке данных');
                    return
                });
        }
    });
    if (successMessage) {
        setTimeout(function () {
            window.location.href = '/signin';
        }, 3000);
    }
});

function showErrorMessage(message, element) {
    element.textContent = message
    element.style.color = 'red';
    element.style.display = "block";
}