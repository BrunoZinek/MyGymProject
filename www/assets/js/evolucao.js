$(function () {
    $.ajaxSetup({ timeout: 10000 });
    buscarDatas();
    ordenarSelect('#dtInicio');
    ordenarSelect('#dtFim');
    $('#dtInicio').change(exibirDataFinal);

    $('#buscarEvolucao').click(buscarEvolucao);
});

function buscarEvolucao() {
    var dataInicio = $('#dtInicio')[0].selectedIndex;
    var dataFim = $('#dtFim')[0].selectedIndex;
    var ultimoItem = $('#dtFim')[0].length - 1;
    if ($('#dtInicio')[0].selectedIndex == ultimoItem || $('#dtFim')[0].selectedIndex == ultimoItem) {
        alert('Favor selecionar data inicial e data final');
    } else {
        if ($('#dtInicio')[0].selectedIndex >= $('#dtFim')[0].selectedIndex) {
            alert('A data final deve ser maior do que a data inicial!')
        } else {
            // Buscando Medidas Iniciais
            $('.box-spinner').toggle();
            $.get('https://api.myjson.com/bins/1btxyn', function (data) {
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
            })
                .fail(function () {
                    alert('Sistema indisponível');
                })
                .always(function () {
                    $('.box-spinner').toggle();
                })
            $('#divEvol').slideToggle();
        }
    }
}

function buscarDatas() {
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/1btxyn', function (data) {
        $(data).each(function (i) {
            var select = $('#dtInicio,#dtFim');
            var item = $('<option>');
            var dataAfericao = data[i].data_afericao;
            item.text(dataAfericao);
            select.prepend(item);

        })
    })
        .fail(function () {
            alert('Sistema indisponível');
        })
        .always(function () {
            $('.box-spinner').toggle();
        })

}

function exibirDataFinal() {
    var select = $('#dtInicio');
    var ultimoItem = $('#dtFim')[0].length - 1;
    if (select[0].selectedIndex != ultimoItem) {
        $('#dtFim').attr('disabled', false);
    }
}

function ordenarSelect(id_componente) {
    var selectToSort = $(id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
        return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
    })).val(optionActual);
}