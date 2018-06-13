$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    dataMinima();
    recuperaModalidades();
    $('#btnConfirmar').click(exibirAulas);
});


function recuperaModalidades() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    // Busca Modalidades
    $('#slcModalidade').append('<option></option>');
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/vvwu7', dados, function (data) {
        $(data).each(function (i) {
            var modalidades = $('#slcModalidade');
            var opcao = $('<option>').attr('value', i + 1).text(data[i].modalidade);
            modalidades.append(opcao);
        });
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
        logOut();
    }).always(function () {
        $('.box-spinner').toggle();
    })
}
function exibirAulas() {
    var data = $('#dataBusca').val();
    var amd = data.split('-');
    var dataFormatada = amd[2] + '/' + amd[1] + '/' + amd[0];

    var modalidade = $("#slcModalidade option:selected").text();
    window.localStorage.setItem('dataBusca', dataFormatada);
    window.localStorage.setItem('modalidade', modalidade);
    window.location.href = "aulas.html";
}

function dataMinima() {
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();


    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    var dataAtual = ano + '-' + mes + '-' + dia;
    $('#dataBusca').attr('min', dataAtual);
}

