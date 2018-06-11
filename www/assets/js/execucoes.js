$(function () {
    $.ajaxSetup({ timeout: 10000 });
    recuperarExec();
});

function recuperarExec() {
    var treino=  window.localStorage.getItem('execucao');
    var tituloTreino = treino.substr(0,treino.indexOf("-")-1);
    $("#titulo").text(tituloTreino);
    var execucao = (tituloTreino.replace(/\s+/g, '')).toLowerCase();
    var image = new Image();
    image.src = "../assets/img/exercicios/"+execucao+".gif";
    image.onerror = function () {
        alert("Execução não cadastrada");
        window.history.back();
        }
    image.onload = function () {
        $("#execucao").attr("src","../assets/img/exercicios/"+execucao+".gif");
    }
}