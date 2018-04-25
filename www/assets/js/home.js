$(function () {
    verificarSessao();
    diaSemana();
    //recuperarTreinoDia();
    $('.exibir-exec').click(exibirExec);

});

function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    var tabela = $('#tabela-exercicio')

    $('.box-spinner').show();
    $.get('https://api.myjson.com/bins/xfqvb', dados, function (data) {
        $('#treinoDia').text(data[0].titulo + ' e ' + data[1].titulo);
        $('#primeiroTreinoDia').text(data[0].titulo);
        $('#segundoTreinoDia').text(data[0].titulo);
        for (var i = 0; i < data.length; i++) {
            var linha = $('<li>');
            var link = $("<a>").addClass("exibir-exec").attr("href", "#");
            link.append(data[i].exercicio + ' - ' + data[i].serie + ' séries - ' + data[i].repeticoes + ' repetições');
            link.find('.exibir-exec').click(exibirExec);   
            linha.append(link); 
            console.log(linha[i].outerHTML);
            console.log(data);
            tabela.append(linha);     
        }
    })
        .fail(function () {
            alert('Não foi possível recurar o treino do dia!');
        })
            .always(function () {
                $('.box-spinner').toggle();
            });
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


function exibirExec() {
    console.log('foi');
  }