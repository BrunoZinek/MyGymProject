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
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
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
        var dia = dataAtual.getDate();
        var mes = dataAtual.getMonth() + 1;
        var ano = dataAtual.getFullYear();
        if (dia < 10) {
            var dia = '0' + dia;
        }
        if (mes < 10) {
            var mes = '0' + mes;
        }
        var dataAtualYMD = ano + '/' + mes + '/' + dia;
        var d = "03/05/2018";
        var dma = d.split("/");
        var dataContratacao = new Date(
            parseInt(dma[2], 10),
            parseInt(dma[1], 10),
            parseInt(dma[0], 10) + validade);
        var dataFormatadaYMD = dataContratacao.getFullYear() + '/' + (dataContratacao.getMonth() < 10 ? '0' + dataContratacao.getMonth() : dataContratacao.getMonth()) + '/' + (dataContratacao.getDate() < 10 ? '0' + dataContratacao.getDate() : dataContratacao.getDate());
        var dataFormatadaDMY = (dataContratacao.getDate() < 10 ? '0' + dataContratacao.getDate() : dataContratacao.getDate()) + '/' + (dataContratacao.getMonth() < 10 ? '0' + dataContratacao.getMonth() : dataContratacao.getMonth()) + '/' + dataContratacao.getFullYear();
        $('#dtValidade').text(dataFormatadaDMY);
        if (dataFormatadaYMD < dataAtualYMD) {
            $('#vencido').show();
        } else {
            $('#vencido').hide();
        }
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
        $('.box-spinner').toggle();
    })
}
