
var nameSignupInput = document.getElementById('nameSignupInput');
var emailSignupInput = document.getElementById('emailSignupInput');
var passwordSignupInput = document.getElementById('passwordSignupInput');
var emailLoginInput = document.getElementById('emailLoginInput');
var passwordLoginInput = document.getElementById('passwordLoginInput');
var logInBtn = document.getElementById('logInBtn');
var signupBtn = document.getElementById('signupBtn');
var incorrect = document.getElementById('incorrect');
var exist = document.getElementById('exist');
var home = document.getElementById('home');
// var username = document.getElementById('username');
var usersArray =[];

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

// to say welcome in home page
var username = localStorage.getItem('UserName')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}


if(localStorage.getItem('users') != null){
    usersArray = JSON.parse(localStorage.getItem('users')) ;
}

//=================Signup==========================================
function isEmptyInputs(){
    if(nameSignupInput.value == '' || emailSignupInput.value == '' || passwordSignupInput.value == ''){
        return false;
    }
    else{
        return true;
    }
}

function isExist(){
    for(var i=0;i<usersArray.length;i++){
        if(usersArray[i].email.toLowerCase() == emailSignupInput.value.toLowerCase()){
            return false;
        }
    }
}

function signup(){
    if(isEmptyInputs() == false ){
        exist.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }

    var user = {
        name:nameSignupInput.value,
        email:emailSignupInput.value,
        password:passwordSignupInput.value,
    }

    if (usersArray.length == 0){
        usersArray.push(user);
        localStorage.setItem('users',JSON.stringify(usersArray));
        exist.innerHTML = '<span class="text-success m-3">Success</span>';
        return true;
    }

    if(isExist() == false){
        exist.innerHTML = '<span class="text-danger m-3">email already exists</span>';
    }
    else{
        usersArray.push(user);
        localStorage.setItem('users',JSON.stringify(usersArray));
        exist.innerHTML = '<span class="text-success m-3">Success</span>';
    }
}


//=============================Login=================
function isEmptyLogin(){
    if(emailLoginInput.value == '' || passwordLoginInput.value == ''){
        return false;
    }
    else{
        return true;
    }
}




function login(){
    if(isEmptyLogin() == false){
        incorrect.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }

    for(var i =0 ; i<usersArray.length;i++){
        if(usersArray[i].email.toLowerCase() == emailLoginInput.value.toLowerCase() || usersArray[i].password == passwordLoginInput.value.toLowerCase()){
            localStorage.setItem('UserName',usersArray[i].name);
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        }
        else{
            incorrect.innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
        }
    }
}
function logout() {
    localStorage.removeItem('UserName');
}

// logInBtn.addEventListener('click',function(){
//     login();
// })
// signupBtn.addEventListener('click',function(){
//     signup();
// })
