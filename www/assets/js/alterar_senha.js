$(function () {
    //Time-out padrão
    $.ajaxSetup({ timeout: 10000 });

    $('#btnEnviar').click(alterarSenha);
    $('#btnVoltar').click(function () {
        window.history.back();
    });

})


function alterarSenha() {
    var senhaAntiga = $('#senhaAntiga').val();
    var senhaNova = $('#senhaNova').val();
    var confirmaSenha = $('#confirmaSenha').val();
    console.log(senhaAntiga);
    console.log(senhaNova);
    console.log(confirmaSenha);
    if (!senhaAntiga) {
        alert('Favor digitar a senha antiga.');
    } else if (!senhaNova) {
        alert('Favor digitar a nova senha.');
    } else if (senhaAntiga == senhaNova) {
        alert('A nova senha deve ser diferente da senha antiga');
    } else if (!confirmaSenha) {
        alert('Favor digitar a confirmação de senha.');
    } else if (senhaNova != confirmaSenha) {
        alert('Nova senha e confirmação de senha estão diferentes');
    } else {
        var dados = {
            senha: senhaAntiga,
            senhaNova: senhaNova
        }
        $('.box-spinner').toggle();
        $.post('', dados, function (data) {
            if (data == 1) {
                alert('Senha atualizada com sucesso');
                window.location.href = 'perfil.html';
            } else {
                alert('Senha atual informada diferente da cadastrada');
            }
        }).fail(function () {
            alert('Sistema indisponivel. Tente novamente mais tarde!');
            logOut();
        }).always(function () {
            $('.box-spinner').toggle();
        })
    }
}