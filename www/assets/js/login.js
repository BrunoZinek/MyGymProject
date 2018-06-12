$(function () {
    //$.ajaxSetup({ timeout: 10000 });
    // Logar
    $('#entrar').click(logar);
    
    $('#imgLogin').click(function(){
        window.localStorage.setItem('endereco',prompt("Digite o endereco", ""));
    });
    
    if(!window.localStorage.getItem('endereco')){
        window.localStorage.setItem('endereco','localhost');
    }
    
    $('#user').keypress(function (e) {
        if (e.which == 13) {
            $('#password').focus();
        }
    });
    $('#password').keypress(function (e) {
        if (e.which == 13) {
            logar();
        }
    });
    //Recuperar Senha
    $('#recSenha').click(recuperarSenha);
});

function logar() {
    if (!$('#user').val() || !$('#password').val()) {
        alert("Favor preencher os campos login e senha");
    } else {
        var login = $('#user').val();
        var senha = $('#password').val();
        var dados = {
            login: login,
            senha: senha
        }
        $('.box-spinner').toggle();
        $.post('http://' + window.localStorage.getItem('endereco') + '/mygym/logar.php', dados, function (data) {
            if (data.autenticado == 1) {
                window.localStorage.setItem('login', login);
                window.localStorage.setItem('senha', senha);
                window.location.href = "home.html";
            } else {
                alert("Login ou senha incorreto!");
            }
        }).fail(function () {
            alert("Sistema indisponivel. Tente novamente mais tarde!");
        }).always(function () {
            $('.box-spinner').toggle();
        })
    }
}

function fecharApp() {
    if (confirm('Fechar o aplicativo?'))
        navigator.app.exitApp();
}

function recuperarSenha() {
    if (!$('#user').val()) {
        alert("Favor preencher os campos login e senha");
    } else {
        $.get('https://api.myjson.com/bins/1gdbwn', login, function (data) {
            if (data.autenticado == 1) {
                alert("Senha enviada para o email informado.");
            } else {
                alert("Login incorreto!");
            }
        }).fail(function () {
            alert("Sistema indisponivel. Tente novamente mais tarde!");
        }).always(function () {
            $('.box-spinner').toggle();
        })
    }
}
