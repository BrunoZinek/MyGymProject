$(function () {
    if (!window.localStorage.getItem('login')) {
        window.location.href = "login.html";
    } else {
        $.ajaxSetup({ timeout: 10000 });
        if (verificarSessao()) {
            recuperarFoto()
            recuperarTreinoDia();
            $('.exibir-exec').click(exibirExec(this));
        }
    }
});

function recuperarTreinoDia() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/13411b', dados, function (data) {
        diaSemana();
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
                    link.click(exibirExec);
                    linha.append(link);
                    tabela.append(linha);
                });
            });
        } else {
            $('#treinoDia').text('Descanso');
            alert('Você não tem treino cadastrado para hoje. Descanse!');
        }
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
        $('.box-spinner').toggle();
    })
}

function recuperarFoto() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.post('http://10.0.2.2/mygym/recuperarPerfil.php', dados, function (data) {
        if (data.autenticado == 0)
            logOut();
        else
            $('#avatar').attr('src', 'data:image/png;charset=utf-8;base64,' + data.usuario.foto);
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
        logOut();
    }).always(function () {
        $('.box-spinner').toggle();
    })
}

function exibirExec(item) {
    var treino = item.currentTarget.text;
    window.localStorage.setItem('execucao', treino);
    window.location.href = "execucoes.html";
}
