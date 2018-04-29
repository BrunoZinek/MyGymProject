$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    recuperarPerfil();
    $('#btnEditar').click(editarPerfil);
    $('#btnSalvar').click(salvarPerfil);
    $('#btnSalvar').click(salvarPerfil);
    $('#btnAltSenha').click(function () {
        window.location.href = 'alterar_senha.html';
    });
    $(document).on("change", "#uploadFoto", function (e) {
        trocarFoto(this.files);
        
    });
})

function recuperarPerfil() {
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/avb6n', function (data) {
        $('#avatar').attr('src', 'data:image/png;charset=utf-8;base64,' + data[0].foto);
        $('#iptNome').attr('value', data[0].nome);
        $('#iptDtNasc').attr('value', data[0].dtNasc);
        $('#iptEmail').attr('value', data[0].email);
        $('#altura').text(data[0].altura);
        $('#peso').text(data[0].peso);
        $('#imc').text(data[0].imc);
        $('#gordura').text(data[0].gordura);
        $('#biceps').text(data[0].biceps);
        $('#antebraco').text(data[0].antebraco);
        $('#peito').text(data[0].peito);
        $('#abdomen').text(data[0].abdomen);
        $('#quadril').text(data[0].quadril);
        $('#panturrilha').text(data[0].panturrilha);
        $('#coxa').text(data[0].coxa);
        $('#pescoco').text(data[0].pescoco);
        $('#dtMatric').text(data[0].dtMatric);
    })
        .fail(function () {
            alert('Sistema indisponivel')
        })
        .always(function () {
            $('.box-spinner').toggle();
        })
}

function editarPerfil() {
    $('#iptNome').removeClass('disabled');
    $("#iptNome").prop("disabled", false);
    $('#iptDtNasc').removeClass('disabled');
    $("#iptDtNasc").prop("disabled", false);
    $('#iptEmail').removeClass('disabled');
    $("#uploadFoto").prop("disabled", false);
    $("#camera").show();
    $("#iptEmail").prop("disabled", false);
    $('#btnEditar').hide();
    $('#btnSalvar').show();
}

function salvarPerfil() {
    $('.box-spinner').toggle();
    var dados = {
        nome: $("#iptNome").val(),
        dtNasc: $("#iptDtNasc").val(),
        email: $("#iptEmail").val(),
        foto: $("#avatar").attr('src'),
    }
    $.post('', dados, function (data) {
        if (data.autenticado == 1) {
            alert('Dados alterados com sucesso');
            $("#iptNome").prop("disabled", true);
            $("#iptDtNasc").prop("disabled", true);
            $("#iptEmail").prop("disabled", true);
            $("#btnSalvar").hide();
            $("#btnEditar").show();
        } else {
            alert('Não foi possivel atualizar os dados. Tente novamente mais tarde');
        }
    })
        .fail(function () {
            alert('Sistema indisponível. Tente novamente mais tarde');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })

    /*  $("#iptNome").prop("disabled", true);
    $("#iptDtNasc").prop("disabled", true);
    $("#iptEmail").prop("disabled", true);
    $("#btnSalvar").hide();
    $("#btnEditar").show();*/
}
function trocarFoto(foto) {
    if (foto && foto[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#avatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(foto[0]);
    }
}