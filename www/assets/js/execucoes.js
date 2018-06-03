$(function () {
    $.ajaxSetup({ timeout: 10000 });
    recuperarExec();
});

function recuperarExec() {
    var treino=  window.localStorage.getItem('execucao');
    var tituloTreino = treino.substr(0,treino.indexOf("-")-1);
    $("#titulo").text(tituloTreino);
    var execucao = (tituloTreino.replace(/\s+/g, '')).toLowerCase();
    
    $("#execucao").attr("src","../assets/img/exercicios/"+execucao+".gif");
   

    /*$('.box-spinner').toggle();
    $.get('https://api.myjson.com/bins/dp8xr', function (data) {
        $('#execucao').attr('src', 'data:image/png;charset=utf-8;base64,' + data[0].foto);
    }).fail(function () {
        alert('Sistema indisponivel. Tente novamente mais tarde!');
    }).always(function () {
        $('.box-spinner').toggle();
    })*/
}