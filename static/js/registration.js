document.querySelector('#signin').addEventListener('submit', function (e) {
    e.preventDefault();
});


RegButton.onclick = function () {
    pass = document.getElementById('pass').value;
    pass_rep = document.getElementById('rep_pass').value;
    uname = document.getElementById('user').value;

    if (pass == pass_rep) {
        delta = document.getElementById("wrong_pass");
        delta.style.display = "none"
    }
    else {
        delta = document.getElementById("wrong_pass");
        delta.style.display = "block"
    }
}