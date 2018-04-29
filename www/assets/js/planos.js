$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    recuperarPlanos();
    recuperarValidadePlano();
});

function recuperarPlanos() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/1b4lxb', dados, function (data) {
        $(data).each(function (i) {
            var boxPlano = $('#boxPlano');
            var link = $("<a>").addClass("redirecPag").attr("href", "#");
            var plano = $('<div>').addClass("card");
            var titulo = $('<label>');
            var textoTitulo = $('<h4>').text(data[i].titulo);
            titulo.append(textoTitulo);
            var desc = $('<span>').text(data[i].descricao);
            var preco = $('<label>');
            var textoPreco = $('<h4>').text('R$' + data[i].preco + ',00');
            preco.append(textoPreco);
            plano.append(titulo);
            plano.append(desc);
            plano.append(preco);
            link.append(plano);
            link.click(redirectPag);
            boxPlano.append(plano);
        });
    })
        .fail(function () {
            alert('Não foi possível recuperar o treino do dia!');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
}

function recuperarValidadePlano() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/1b4lxb', dados, function (data) {
        var validade = +data[0].validade;
        var dataAtual = new Date();
        var dataAtualFormatada = dataAtual.getDate() + '/' + dataAtual.getMonth() + '/' + dataAtual.getFullYear();
        var d = "28/04/2018";
        var dma = d.split("/");
        var dataContratacao = new Date(
            parseInt(dma[2], 10),
            parseInt(dma[1], 10) - 1,
            parseInt(dma[0], 10) + validade);
        var dataFormatada = dataContratacao.getDate() + '/' + dataContratacao.getMonth() + '/' + dataContratacao.getFullYear();
        $('#dtValidade').text(dataFormatada);
        if (dataFormatada < dataAtualFormatada){
            $('#vencido').show();
        }
            
    })
        .fail(function () {
            alert('Sistema indisponível');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
}