$(function () {
    $.ajaxSetup({timeout:10000});
    verificarSessao();
    recuperarFoto()
    diaSemana();
    recuperarTreinoDia();
    $('.exibir-exec').click(exibirExec);
    document.addEventListener("backbutton", onBackKeyDown, false);
});

function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }

    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/13411b', dados, function (data) {
        if (data.length > 0) {
            $('.treino-home').show();
            $('#treinoDia').text(data[0].grupo + ' e ' + data[1].grupo);
            $('#primeiroTreinoDia').text(data[0].grupo);
            $('#segundoTreinoDia').text(data[1].grupo);
            $(data).each(function (j) {
                var tabela = $('#tabela-exercicio' + (j + 1))
                $(data[0].treino).each(function (i) {
                    var linha = $('<li>');
                    var link = $("<a>").addClass("exibir-exec").attr("href", "#");
                    link.append(data[j].treino[i].titulo + ' - ' + data[j].treino[i].serie + ' séries - ' + data[j].treino[i].repeticao + ' repetições');
                    link.find('.exibir-exec').click(exibirExec);
                    linha.append(link);
                    tabela.append(linha);
                });
            });
        } else {
            $('#treinoDia').text('Descanso');
            alert('Você não tem treino cadastrado para hoje. Descanse!');
        }
    })
        .fail(function () {
            alert('Não foi possível recurar o treino do dia!');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
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
}

function recuperarFoto() {
    $.get('https://api.myjson.com/bins/dp8xr', function (data) {
        $('#avatar').attr('src', 'data:image/png;charset=utf-8;base64,' + data[0].foto);
    })
}

function exibirExec() {
    console.log('foi');
}

function onBackKeyDown() {
    navigator.app.exitApp();
}