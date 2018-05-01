$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    dataMinima();
    recuperaModalidades();
    recuperarAulas();
    $('#btnConfirmar').click(exibirAulas);
});

function recuperaModalidades() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    // Busca Modalidades
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/vvwu7', dados, function (data) {
        $(data).each(function (i) {
            var modalidades = $('#slcModalidade');
            var opcao = $('<option>').attr('value', i + 1).text(data[i].modalidade);
            modalidades.append(opcao);
        });
    })
        .fail(function () {
            alert('Não foi possível recuperar o treino do dia!');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
}

function recuperarAulas() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/vvwu7', dados, function (result) {
        $(result).each(function (i) {
            var tabela = $('#tabela-aulas');
            var linha = $('<tr>');
            var data = $('<td>').attr('id', 'data').text(result[i].data);
            linha.append(data);
            var modalidade = $('<td>').attr('id', 'modalidade').text(result[i].modalidade);
            linha.append(modalidade);
            var horario = $('<td>').attr('id', 'horario').text(result[i].horario);
            linha.append(horario);
            var professor = $('<td>').attr('id', 'professor').text(result[i].professor);
            linha.append(professor);
            linha.click(agendarAula);
            tabela.append(linha);
        });
    })
        .fail(function () {
            alert('Não foi possível recuperar o treino do dia!');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })

}

function dataMinima() {
    var dataAtual = new Date();
    var dia = dataAtual.getDay()-1;
    var mes = dataAtual.getMonth()+1;
    var ano = dataAtual.getFullYear();
    if(dia<10){
        dia='0'+dia;
    } 
    if(mes<10){
        mes='0'+mes;
    } 
    var dataAtual = ano + '-'+mes+'-'+dia;
    $('#dataBusca').attr('min', dataAtual);
}

function exibirAulas() {
    // Ajuste de padrão de data
    var data = $('#dataBusca').val();
    var amd = data.split('-');
    var dataFormatada = amd[2] + '/' + amd[1] + '/' + amd[0];
    console.log(data);


    //window.location.href = "aulas.html";
}

function agendarAula() {
    var data = $(this).find('#data').text();
    var modalidade = $(this).find('#modalidade').text();
    var horario = $(this).find('#horario').text();
    var professor = $(this).find('#professor').text();

    if (confirm('Deseja agendar a aula de ' + modalidade + ' no dia ' + data + ', às ' + horario + ' com o professor ' + professor + ' ?')) {
        var dados = {
            login: window.localStorage.getItem('login'),
            senha: window.localStorage.getItem('senha'),
            data: data,
            modalidade: modalidade,
            horario: horario,
            professor: professor
        }
        /*
        $('.box-spinner').toggle();
        .post('url',dados,function(result){
            if(result==1){
                alert('Aula agendada');
            }else{
                alert(Não foi possivel agendar sua aula. Tente novamente mais tarde);
            }

        })
        .fail(function () {
            alert('Sistema indisponível');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
        */
        home();
    }

}