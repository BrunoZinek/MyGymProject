
$(function () {
    if (window.localStorage.getItem('login')) {
        window.location.href = "home.html";
    } else {
        window.location.href = "login.html";
    }
    console.log(window.localStorage.getItem('login'));
    
})