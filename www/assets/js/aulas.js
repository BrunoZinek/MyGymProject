$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    recuperarAulas();
});



function recuperarAulas() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/13swhq', dados, function (result) {


        $(result).each(function (i) {
            if (window.localStorage.getItem('modalidade') != "" &&
                window.localStorage.getItem('dataBusca') != "undefined/undefined/") {
                if (result[i].modalidade == window.localStorage.getItem('modalidade') && result[i].data == window.localStorage.getItem('dataBusca')) {
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
                }
            } else if (window.localStorage.getItem('modalidade') != "") {
                if (result[i].modalidade == window.localStorage.getItem('modalidade')) {
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
                }
            } else if (window.localStorage.getItem('dataBusca') != "undefined/undefined/") {
                console.log(result);
                if (result[i].data == window.localStorage.getItem('dataBusca')) {
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
                }
            }
        });
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
        logOut();
    }).always(function () {
        $('.box-spinner').toggle();
        if (!$('#tabela-aulas').html()) {
            alert("Não foram encontradas aulas com a modalidade/data informada.");
            $("#btnConfirmar").click();
            return false;
        }
    })
}
function agendarAula() {
    var data = $(this).find('#data').text();
    var modalidade = $(this).find('#modalidade').text();
    var horario = $(this).find('#horario').text();
    var professor = $(this).find('#professor').text();

    if (confirm('Deseja agendar a aula de ' + modalidade + ' no dia ' + data + ', às ' + horario + ' com o professor ' + professor + ' ?')) {
        alert("Aula agendada com sucesso");
        window.location.href = "agenda.html"
        /*var dados = {
            login: window.localStorage.getItem('login'),
            senha: window.localStorage.getItem('senha'),
            data: data,
            modalidade: modalidade,
            horario: horario,
            professor: professor
        }
        
        $('.box-spinner').toggle();
        .post('url',dados,function(result){
            if(result==1){
                alert('Aula agendada');
            }else{
                alert(Não foi possivel agendar sua aula. Tente novamente mais tarde);
            }

        }).fail(function () {
            alert('Sistema indisponível');
        }).always(function () {
            $('.box-spinner').toggle();
        })
        */
    }

}

function voltarAgenda() {
    window.location.href = "agenda.html";

}