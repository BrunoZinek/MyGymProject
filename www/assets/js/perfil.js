$(function () {
    $.ajaxSetup({ timeout: 10000 });
    verificarSessao();
    recuperarPerfil();
    buscaEndereco();
    $('#btnEditar').click(editarPerfil);
    $('#btnSalvar').click(salvarPerfil);
    $('#btnSalvar').click(salvarPerfil);
    $('#btnUpload').click(function () {
        $('#upload').click();
    })
    $('#btnExibirMedidas').click(exibirMedidas);
    $('#btnAltSenha').click(function () {
        window.location.href = 'alterar_senha.html';
    });
    $(document).on("change", "#upload", function (e) {
        trocarFoto(this.files);
    });
})

function recuperarPerfil() {
    var dados = {
        login: window.localStorage.getItem('login'),
        senha: window.localStorage.getItem('senha')
    }
    $('.box-spinner').toggle();
    $.post('http://localhost/mygym/recuperarPerfil.php', dados, function (data) {
        if (data.autenticado == 0)
            logOut();
        else {
            $('#avatar').attr('src', 'data:image/png;charset=utf-8;base64,' + data.usuario.foto);
            $('#iptNome').attr('value', data.usuario.nome);
            $('#iptDtNasc').attr('value', data.usuario.dataNascimento.split('-').reverse().join('/'));
            $('#iptEmail').attr('value', data.usuario.email);
            $('#celular').attr('value', data.usuario.celular);
            $('#cep').attr('value', "0" + data.usuario.cep);
            $('#endereco').attr('value', data.usuario.endereco);
            $('#numero').attr('value', data.usuario.numero);
            $('#bairro').attr('value', data.usuario.bairro);
            $('#cidade').attr('value', data.usuario.cidade);
            $('#estado').attr('value', data.usuario.estado);
            $('#dtMatric').text(data.usuario.dataMatricula.split('-').reverse().join('/'));
            $('#altura').text(data.usuario.altura);
            $('#peso').text(data.usuario.peso);
            $('#imc').text(data.usuario.imc);
            $('#gordura').text(data.usuario.gordura);
            $('#biceps').text(data.usuario.biceps);
            $('#antebraco').text(data.usuario.antebraco);
            $('#peito').text(data.usuario.peito);
            $('#abdomen').text(data.usuario.abdomen);
            $('#quadril').text(data.usuario.quadril);
            $('#panturrilha').text(data.usuario.panturrilha);
            $('#coxa').text(data.usuario.coxa);
            $('#pescoco').text(data.usuario.pescoco);
        }
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!')
    }).always(function () {
        $('.box-spinner').toggle();
    })
}

function editarPerfil() {
    $('#iptNome').removeClass('disabled');
    $("#iptNome").prop("disabled", false);
    $('#iptDtNasc').removeClass('disabled');
    $("#iptDtNasc").prop("disabled", false);
    $('#iptEmail').removeClass('disabled');
    $("#btnUpload").css("opacity", '1');
    $("#upload").prop("disabled", false);
    $("#camera").show();
    $("#iptEmail").prop("disabled", false);
    $("#cep").prop("disabled", false);
    $("#cep").removeClass('disabled');
    $("#celular").prop("disabled", false);
    $("#celular").removeClass('disabled');
    $("#numero").prop("disabled", false);
    $("#numero").removeClass('disabled');
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
    }).fail(function () {
        alert('Sistema indisponível. Tente novamente mais tarde');
    }).always(function () {
        $('.box-spinner').toggle();
    })
    $("#iptNome").prop("disabled", true);
    $("#iptDtNasc").prop("disabled", true);
    $("#iptEmail").prop("disabled", true);
    $("#btnSalvar").hide();
    $("#btnEditar").show();
}
function trocarFoto(foto) {
    if (foto && foto[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var tamanho = foto[0].size;
                var height = this.height;
                var width = this.width;
                if (tamanho > 2097152) {
                    alert("Favor selecionar uma imagem com no máximo 2mb");
                } else if (height * 0.9 > width * 1.1 || width * 0.9 > height * 1.1) {
                    alert("Imagem selecionada com resolução incompatível.\nFavor escolher outra imagem");
                } else {
                    $('#avatar').attr('src', e.target.result);
                }
            };
        }
        reader.readAsDataURL(foto[0]);
    }
}

function buscaEndereco() {
    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if (validacep.test(cep)) {
                $('.box-spinner').toggle();
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        $("#cep").val("");
                        $("#cep").focus();
                        alert("CEP não encontrado.");
                    }
                }).always(function () {
                    $('.box-spinner').toggle();
                });
            } //end if.
            else {
                //cep é inválido.
                alert("Formato de CEP inválido.");
                $("#cep").val("");
                $("#cep").focus();

            }

        } //end if.
    });
}

function exibirMedidas() {
    $('#tabelaMedidas').slideToggle("slow");
    var botao = $("#btnExibirMedidas");
    if (botao.text() == "Exibir Medidas") {
        botao.text("Ocultar Medidas");
    } else {
        botao.text("Exibir Medidas");
    }
}
