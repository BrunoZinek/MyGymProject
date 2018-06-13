$(function () {
    //Time-out padrão
    $.ajaxSetup({ timeout: 10000 });
    verificaDia();
    recuperarTreinoDia();

    //verificaTreinoVazio();
    $('button').click(detalhes);
})

function verificaDia() {
    var diaAtual = diaSemana().toUpperCase();
    if ($('#btnSegunda').text() == diaAtual) {
        $('#btnSegunda').addClass('dia-ativo')
    } else if ($('#btnTerca').text() == diaAtual) {
        $('#btnTerca').addClass('dia-ativo');
    } else if ($('#btnQuarta').text() == diaAtual) {
        $('#btnQuarta').addClass('dia-ativo');
    } else if ($('#btnQuinta').text() == diaAtual) {
        $('#btnQuinta').addClass("dia-ativo");
    } else if ($('#btnSexta').text() == diaAtual) {
        $('#btnSexta').addClass('dia-ativo');
    } else if ($('#btnSabado').text() == diaAtual) {
        $('#btnSabado').addClass('dia-ativo');
    } else if ($('#btnDomingo').text() == diaAtual) {
        $('#btnDomingo').addClass('dia-ativo');
    }
}

function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/12y93i', dados, function (data) {
        console.log(data);
        
       if (data.length > 0) {
            var dia = 0;
            for (var i = 0; i < 7; i++) {
                
                var tabela = $('#tabela-exercicio' +(i+1))
                if (data[dia+1]) {
                    $(data[dia].treino).each(function (index, treino) {
                        var linha = $('<li>');
                        linha.append(treino.titulo + ' - ' + treino.serie + ' séries - ' + treino.repeticao + ' repetições');
                        tabela.append(linha);
                    });
                    $(data[dia+1].treino).each(function (index, treino) {
                        var linha = $('<li>');
                        linha.append(treino.titulo + ' - ' + treino.serie + ' séries - ' + treino.repeticao + ' repetições');
                        tabela.append(linha);
                    });
                }
                else {
                    var linha = $('<li>');
                    linha.append("Você não tem treino cadastrado para hoje. Descanse!");
                    tabela.append(linha);
                }
                dia +=2;
            }
        }
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
        $('.box-spinner').toggle();
    })
}

function detalhes(botao) {
    var dia = $('#' + botao.currentTarget.id + ' + div');
    dia.slideToggle();
}