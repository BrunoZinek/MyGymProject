$(function () {
    $.ajaxSetup({ timeout: 10000 });
    buscarDatas();
    $('#buscarEvolucao').click(buscarEvolucao);
    $('#dtInicio, #dtFim').change(limparCampos);
});

function buscarEvolucao() {
    $('#buscarEvolucao').attr('disabled', false);
    if ($('#dtInicio')[0].selectedIndex >= $('#dtFim')[0].selectedIndex) {
        alert('A data final deve ser maior do que a data inicial!')
    } else {
        // Buscando Medidas Iniciais e Finais
        $('.box-spinner').toggle();
        $.get('https://api.myjson.com/bins/9jfta', function (data) {
            $('#inicial1').append(data[0].altura);
            $('#inicial2').append(data[0].peso);
            $('#inicial3').append(data[0].imc);
            $('#inicial4').append(data[0].gordura);
            $('#inicial5').append(data[0].biceps);
            $('#inicial6').append(data[0].antebraco);
            $('#inicial7').append(data[0].peito);
            $('#inicial8').append(data[0].abdomen);
            $('#inicial9').append(data[0].quadril);
            $('#inicial10').append(data[0].panturrilha);
            $('#inicial11').append(data[0].coxa);
            $('#inicial12').append(data[0].pescoco);
            $('#final1').append(data[1].altura);
            $('#final2').append(data[1].peso);
            $('#final3').append(data[1].imc);
            $('#final4').append(data[1].gordura);
            $('#final5').append(data[1].biceps);
            $('#final6').append(data[1].antebraco);
            $('#final7').append(data[1].peito);
            $('#final8').append(data[1].abdomen);
            $('#final9').append(data[1].quadril);
            $('#final10').append(data[1].panturrilha);
            $('#final11').append(data[1].coxa);
            $('#final12').append(data[1].pescoco);
        }).fail(function () {
            alert('Sistema indisponivel. Tente novamente mais tarde!');
        }).always(function () {
            $('.box-spinner').toggle();
        })
        $('#divEvol').slideToggle();
        $('#buscarEvolucao').attr('disabled', true);
    }
}

function buscarDatas() {
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/9jfta', function (data) {
        console.log(data[0].dataAfericao);
        
        $(data).each(function (i) {
            var select = $('#dtInicio,#dtFim');
            var item = $('<option>');
            var dataAfericao = data[i].dataAfericao;
            item.text(dataAfericao);
            select.prepend(item);
        })
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
        $('.box-spinner').toggle();
        ordenar();
    })

}

function ordenar() {
    //Ordenando Data Inicio
    var ordenarInicio = $('#dtInicio option').sort(function (a, b) {
        return a.text < b.text ? -1 : 1;
    });
    $('#dtInicio').html(ordenarInicio);
    $('#dtInicio option:first').attr('selected', true);
    //Ordenando Data Fim
    var ordenarFim = $('#dtFim option').sort(function (a, b) {
        return a.text < b.text ? -1 : 1;
    });
    $('#dtFim').html(ordenarFim);
    $('#dtFim option:eq(1)').attr('selected', true);

}

function limparCampos() {
    $('#buscarEvolucao').attr('disabled', false);
    $('#divEvol').hide();
    $('#inicial1').text('');
    $('#inicial2').text('');
    $('#inicial3').text('');
    $('#inicial4').text('');
    $('#inicial5').text('');
    $('#inicial6').text('');
    $('#inicial7').text('');
    $('#inicial8').text('');
    $('#inicial9').text('');
    $('#inicial10').text('');
    $('#inicial11').text('');
    $('#inicial12').text('');
    $('#final1').text('');
    $('#final2').text('');
    $('#final3').text('');
    $('#final4').text('');
    $('#final5').text('');
    $('#final6').text('');
    $('#final7').text('');
    $('#final8').text('');
    $('#final9').text('');
    $('#final10').text('');
    $('#final11').text('');
    $('#final12').text('');
}