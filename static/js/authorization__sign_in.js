document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin');
    const passStatus = document.getElementById('pass_status');
    if (signinForm) {
      signinForm.addEventListener('submit', function (e) {
        e.preventDefault();
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
              alert(
                'Вы успешно авторизировались!\nПодтвердите действие, и через 2 секунды вы будете перенаправлены в рабочую область'
              );
              setTimeout(function () {
                window.location.href = '/dashboard';
              }, 2000);
            } else {
              response.text().then(text => {
                alert(text);
              });
            }
          })
          .catch(error => {
            console.error('Ошибка:', error);
             alert('Произошла ошибка при отправке данных'); // Вывод сообщения об ошибке
          });
      });
    }

    function showErrorMessage(message, element) {
        element.textContent = message
        element.style.color = 'red';
        element.style.display = "block";
    }
});