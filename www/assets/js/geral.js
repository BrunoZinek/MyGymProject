$(function () {
    //Time-out padrão
    $.ajaxSetup({ timeout: 10000 });

    // MENU 
    $('.menu-anchor').on('click touchstart', function (e) {
        $('html').toggleClass('menu-active');
        e.preventDefault();
    });
})

function verificarSessao() {
    if (!window.localStorage.getItem('login')) {
        alert("Você precisa estar logado.");
        window.location.href = "index.html";
    }
}

function sair() {
    if (confirm("Deseja sair?")) {
        window.location.href = "index.html";
        window.localStorage.clear();
    }
}

function voltar() {
    window.history.back();
}

function recuperarSenha() {
    var login = $('#login').val();
    if (!login) {
        alert('Favor preencher o campo login');
    } else {
        $('.box-spinner').toggle();
        $.get('https://api.myjson.com/bins/1gdbwn', login, function (data) {
            if (data.login == login)
                alert("Senha enviada para o celular cadastrado");
            else
                alert("Login não cadastrado");
        })
            .fail(function () {
                alert("Não foi possível reenviar a senha!")
            })
            .always(function () {
                $('.box-spinner').toggle();
            })
    }
}

function alterarSenha() {
    alert("Senha alterada com sucesso");
    window.location.href = "home.html";
}

function salvarTreino(num) {
    $.ajax({
        url: "",
        type: 'POST',
        contentType: 'application/json',
        data: ({
        }),
        success: function () {
        }
    });
    /* if (num == 1) {
       $("#iptSerie1").prop("disabled", true);
       $("#iptRepeticao1").prop("disabled", true);
       $("#edit1").show();
       $("#save1").hide();
     }
     if (num == 2) {
       $("#iptSerie2").prop("disabled", true);
       $("#iptRepeticao2").prop("disabled", true);
       $("#edit2").show();
       $("#save2").hide();
     }
     if (num == 3) {
       $("#iptSerie3").prop("disabled", true);
       $("#iptRepeticao3").prop("disabled", true);
       $("#edit3").show();
       $("#save3").hide();
     }*/
}

function editarTreino(num) {
    $.ajax({
        url: "",
        type: 'POST',
        contentType: 'application/json',
        data: ({
        }),
        success: function () {
            alert("Senha enviada para o celular/email informado")
        }
    });
    /*if (num == 1) {
      $("#iptSerie1").prop("disabled", false);
      $("#iptRepeticao1").prop("disabled", false);
      $("#edit1").hide();
      $("#save1").show();
    }
    if (num == 2) {
      $("#iptSerie2").prop("disabled", false);
      $("#iptRepeticao2").prop("disabled", false);
      $("#edit2").hide();
      $("#save2").show();
    }
    if (num == 3) {
      $("#iptSerie3").prop("disabled", false);
      $("#iptRepeticao3").prop("disabled", false);
      $("#edit3").hide();
      $("#save3").show();
    }*/
}
function editarPerfil() {
    $.ajax({
        url: "",
        type: 'POST',
        contentType: 'application/json',
        data: ({
        }),
        success: function () {
            alert("Senha enviada para o celular/email informado")
        }
    });
    /* $("#iptNome").prop("disabled", false);
     $("#iptDtNasc").prop("disabled", false);
     $("#iptEmail").prop("disabled", false);
     $("#btnSalvar").show();
     $("#btnEditar").hide();*/
}
function salvarPerfil() {
    $.ajax({
        url: "",
        type: 'POST',
        contentType: 'application/json',
        data: ({
        }),
        success: function () {
            alert("Senha enviada para o celular/email informado")
        }
    });
    /*  $("#iptNome").prop("disabled", true);
    $("#iptDtNasc").prop("disabled", true);
    $("#iptEmail").prop("disabled", true);
    $("#btnSalvar").hide();
    $("#btnEditar").show();*/
}
function detalhes(num) {
    $.ajax({
        url: "",
        type: 'POST',
        contentType: 'application/json',
        data: ({
        }),
        success: function () {
            alert("Senha enviada para o celular/email informado")
        }
    });
    /*switch (num) {
      case 1:
        $("#1").slideToggle();
        break;
      case 2:
        $("#2").slideToggle();
        break;
      case 3:
        $("#3").slideToggle();
        break;
      case 4:
        $("#4").slideToggle();
        break;
      case 5:
        $("#5").slideToggle();
        break;
      case 6:
        $("#6").slideToggle();
        break;
      case 7:
        $("#7").slideToggle();
        break;
      default:
    }*/
}
function exibirEvol() {
    $("#divEvol").slideToggle();
}

function exibirAulas() {
    window.open("aulas.html", "_self")
}
function redirectPag() {
    if (confirm("Você será direcionado para a página de pagamento")) {
        window.location.href = "index.html";
    }
}