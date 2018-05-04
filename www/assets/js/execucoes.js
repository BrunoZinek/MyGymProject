$(function () {
    $.ajaxSetup({ timeout: 10000 });
    recuperarExec();
    $('.exibir-exec').click(exibirExec);
});

function recuperarExec() {
    $('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/dp8xr', function (data) {
        $('#execucao').attr('src', 'data:image/png;charset=utf-8;base64,' + data[0].foto);
    }).fail(function () {
        alert('Sistema indisponível');
    }).always(function () {
        $('.box-spinner').toggle();
    })
}