// password1 = document.getElementById("pass").value
// password2 = document.getElementById("rep_pass").value

// console.log(4)

RegButton.onclick = function() {
    pass = document.getElementById('pass').value;
    pass_rep = document.getElementById('rep_pass').value;
    uname = document.getElementById('user').value;
    console.log(pass);
    console.log(pass_rep);
    if(pass == pass_rep){
        console.log(1)
    }
    else{
        console.log(0)
    }

};