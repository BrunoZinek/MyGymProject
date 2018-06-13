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
    var login = window.localStorage.getItem('login');
    var image = new Image();
    image.src = "../assets/img/faces/"+login+".jpg";
    image.onerror = function () {
        $('#avatar').attr('src', "../assets/img/faces/padrao.jpg");
        }
    image.onload = function () {
        $('#avatar').attr('src', "../assets/img/faces/"+login+".jpg");
    }
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/717cu', dados, function (data) {      
        $('#iptNome').attr('value', data[0].usuario[0].nome);
        $('#iptDtNasc').attr('value', data[0].usuario[0].dtNasc.split('-').reverse().join('/'));
        $('#iptEmail').attr('value', data[0].usuario[0].email);
        $('#celular').attr('value', data[0].usuario[0].celular);
        $('#cep').attr('value', "0" + data[0].usuario[0].cep);
        $('#endereco').attr('value', data[0].usuario[0].endereco);
        $('#numero').attr('value', data[0].usuario[0].numero);
        $('#bairro').attr('value', data[0].usuario[0].bairro);
        $('#cidade').attr('value', data[0].usuario[0].cidade);
        $('#estado').attr('value', data[0].usuario[0].estado);
        $('#dtMatric').text(data[0].usuario[0].dtMatric.split('-').reverse().join('/'));
        $.get('https://api.myjson.com/bins/9jfta', dados, function (data) {
            console.log(data[0].abdomen);
            
            $('#abdomen').text(data[0].abdomen);
            $('#altura').text(data[0].altura);
            $('#antebraco').text(data[0].antebraco);
            $('#biceps').text(data[0].biceps);
            $('#coxa').text(data[0].coxa);
            $('#gordura').text(data[0].gordura);
            $('#imc').text(data[0].imc);
            $('#panturrilha').text(data[0].panturrilha);
            $('#peito').text(data[0].peito);
            $('#pescoco').text(data[0].pescoco);
            $('#peso').text(data[0].peso);
            $('#quadril').text(data[0].quadril);
        }).fail(function () {
            alert('Sistema indisponivel. Tente novamente mais tarde!');
            logOut();
        });
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
        logOut();
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
    $("#endereco").prop("disabled", false);
    $("#endereco").removeClass('disabled');
    $("#celular").prop("disabled", false);
    $("#celular").removeClass('disabled');
    $("#numero").prop("disabled", false);
    $("#numero").removeClass('disabled');
    $('#btnEditar').hide();
    $('#btnSalvar').show();
}

function salvarPerfil() {
    /*$('.box-spinner').toggle();
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
    })*/
    
    $('#iptNome').addClass('disabled');
    $("#iptNome").prop("disabled", true);
    $('#iptDtNasc').addClass('disabled');
    $("#iptDtNasc").prop("disabled", true);
    $('#iptEmail').addClass('disabled');
    $("#btnUpload").css("opacity", '0');
    $("#upload").prop("disabled", true);
    $("#iptEmail").prop("disabled", true);
    $("#cep").prop("disabled", true);
    $("#cep").addClass('disabled');
    $("#endereco").prop("disabled", true);
    $("#endereco").addClass('disabled');
    $("#celular").prop("disabled", true);
    $("#celular").addClass('disabled');
    $("#numero").prop("disabled", true);
    $("#numero").addClass('disabled');
    $("#btnSalvar").hide();
    $("#camera").hide();
    $("#btnEditar").show();
    alert('Dados alterados com sucesso');
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
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf);
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
