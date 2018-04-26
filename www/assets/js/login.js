$(function () {
    // Logar
    $('#entrar').click(function () {
        if (!$('#user').val() || !$('#password').val()) {
            console.log($('#user').val());
            console.log($('#password').val());
            
            alert("Favor preencher os campos login e senha");
        } else {
            logar();
        }
    });

    //Recuperar Senha
    $('#recSenha').click(function () {
      fecharApp();
        //  recuperarSenha();
    });

    $('document').on("backbutton", fecharApp, false);
})

function logar() {
    var login = $('#user').val();
    var senha = $('#password').val();
    var dados = {
        login: login,
        senha: senha
    }

    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/1gdbwn', dados, function (data) {
        if (data.login == dados.login && data.senha == dados.senha) {
            window.localStorage.setItem('login', login);
            window.localStorage.setItem('senha', senha);
            window.location.href = "home.html";
        } else {
            alert("Login ou senha incorreto!");
        }
    })
        .fail(function () {
            alert("Sistema indisponivel");
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
    /*
    $('.box-spinner').toggle();
    $.post('php/logar.php', dados, function () {
      window.localStorage.setItem('login', login);
      window.localStorage.setItem('senha', senha);
      window.location.href = "home.html";
    })
      .fail(function () {
        alert('Login ou senha incorretos!');
        console.log(login);
        console.log(senha);
        
      })
      .always(function () {
        $('.box-spinner').toggle();
      })*/
}
function fecharApp() {
    if (confirm('Fechar o aplicativo?'))
        navigator.app.exitApp();
}