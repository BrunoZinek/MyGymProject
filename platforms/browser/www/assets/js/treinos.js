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
        $('#btnSegunda').addClass('active')
    } else if ($('#btnTerca').text() == diaAtual) {
        $('#btnTerca').addClass('active');
    } else if ($('#btnQuarta').text() == diaAtual) {
        $('#btnQuarta').addClass('active');
    } else if ($('#btnQuinta').text() == diaAtual) {
        $('#btnQuinta').addClass("active");
    } else if ($('#btnSexta').text() == diaAtual) {
        $('#btnSexta').addClass('active');
    } else if ($('#btnSabado').text() == diaAtual) {
        $('#btnSabado').addClass('active');
    } else if ($('#btnDomingo').text() == diaAtual) {
        $('#btnDomingo').addClass('active');
    }
}


function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }

    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/13411b', dados, function (data) {
        if (data.length > 0) {
            for(var i = 0; i < 7; i++){
                var exercicio = data[i];
                var tabela = $('#tabela-exercicio' + (i+1))
                if(exercicio){
                    $(exercicio.treino).each(function (naouso,treino) {
                        var linha = $('<li>');
                        linha.append(treino.titulo + ' - ' + treino.serie + ' séries - ' + treino.repeticao + ' repetições');
                        tabela.append(linha);
                    });
                }
                else{
                    var linha = $('<li>');
                    linha.append("Você não tem treino cadastrado para hoje. Descanse!");
                    tabela.append(linha);
                }
            }
        }
    })
        .fail(function () {
            alert('Sistema indisponivel. Tente novamente mais tarde!');
            logOut();
        })
        .always(function () {
           $('.box-spinner').toggle();
        })
}


function detalhes(botao) {
    var dia = $('#' + botao.currentTarget.id + ' + div');
     dia.slideToggle();
    

    /* $.ajax({
         url: "",
         type: 'POST',
         contentType: 'application/json',
         data: ({
         }),
         success: function () {
             alert("Senha enviada para o celular/email informado")
         }
     });
     switch (num) {
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
/*
function verificaTreinoVazio() {
    for (i = 0; i < 7; i++) {
        var tabela = $('#tabela-exercicio' + (i + 1));
        console.log(tabela[0].children.length);

        //if(tabela.chieldElementsCount)

    }
}*/