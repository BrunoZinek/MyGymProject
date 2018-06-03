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
        return false;
    }
    return true;
}

function sair() {
    if (confirm("Deseja sair?")) {
        window.location.href = "login.html";
        window.localStorage.clear();
    }
}

function voltar() {
    window.history.back();
}

function home() {
    window.location.href = "home.html";
}

function diaSemana() {
    var hoje = new Date();
    var dia = hoje.getDay();
    var semana = new Array(6);
    semana[0] = 'Domingo';
    semana[1] = 'Segunda-Feira';
    semana[2] = 'Terça-Feira';
    semana[3] = 'Quarta-Feira';
    semana[4] = 'Quinta-Feira';
    semana[5] = 'Sexta-Feira';
    semana[6] = 'Sábado';
    $('#diaSemana').text(semana[dia]);
    return semana[dia];
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

function converterParaBase64(arquivo) {

    var file = arquivo.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        console.log(reader.result);
    }
    reader.readAsDataURL(file);
}