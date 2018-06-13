$(function () {
    if (!window.localStorage.getItem('login')) {
        window.location.href = "login.html";
    } else {
        $.ajaxSetup({ timeout: 10000 });
        if (verificarSessao()) {
             recuperarFoto()
            recuperarTreinoDia();
        }
    }
});

function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/18yqb2', dados, function (data) {
        var dia = diaSemana().toLowerCase();
        if (data.length > 0) {
            $('.treino-home').show();
            $('#treinoDia').text(data[0].grupo + ' e ' + data[1].grupo);
            $('#primeiroTreinoDia').text(data[0].grupo);
            $('#segundoTreinoDia').text(data[1].grupo);
            $(data).each(function (j) {
                if (j < 2) {
                    var tabela = $('#tabela-exercicio' + (j + 1))
                    $(data[0].treino).each(function (i) {
                        var linha = $('<li>');
                        var link = $("<a>").addClass("exibir-exec").attr("href", "#");
                        link.append(data[j].treino[i].titulo + ' - ' + data[j].treino[i].serie + ' séries - ' + data[j].treino[i].repeticao + ' repetições');
                        link.click(exibirExec);
                        linha.append(link);
                        tabela.append(linha);
                    });
                }
            });
        } else {
            $('#treinoDia').text('Descanso');
            alert('Você não tem treino cadastrado para hoje. Descanse!');
        }
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
        logOut();
    }).always(function () {
        $('.box-spinner').toggle();
    })
}

function recuperarFoto() {
    var login = window.localStorage.getItem('login');
    var image = new Image();
    image.src = "../assets/img/faces/"+login+".jpg";
    image.onerror = function () {
        $('#avatar').attr('src', "../assets/img/faces/padrao.jpg");
        }
    image.onload = function () {
        $('#avatar').attr('src', "../assets/img/faces/"+login+".jpg");
    }
}

function exibirExec(item) {
    var treino = item.currentTarget.text;
    window.localStorage.setItem('execucao', treino);
    window.location.href = "execucoes.html";
}
