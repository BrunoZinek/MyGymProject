function exit() {
  if (confirm("Deseja sair?")) {
    window.location.href = "index.html";
  }
}

function buscarItemTabela() {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("buscaItemTabela");
  filter = input.value.toUpperCase();
  table = document.getElementById("tblItens");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function voltar() {
  window.history.back();
}
function enviarSenha() {
  alert("Senha enviada para o celular/email informado")
}
function excluirCliente() {
  if (confirm("Deseja excluir o cliente 'Bruno Paulino Zinek'?")) {
    alert("Cliente excluido com sucesso!");
  }
}
function excluirExercicio() {
  if (confirm("Deseja excluir o exercício 'Supino Reto' ?")) {
    alert("Exercício excluido com sucesso!");
  }
}
function excluirTreino() {
  if (confirm("Deseja excluir o treino 'Adaptação'?")) {
    alert("Treino excluido com sucesso!");
  }
}
function adicionarTreino() {
  $("#novoExerc").show();
  $("#iptSerie").prop("disabled", true);
  $("#iptRepeticao").prop("disabled", true);
  $("#cmbExercicio").prop("disabled", true);
  $("#cmbDiaSemana").prop("disabled", true);
  $("#cmbGrupMusc").prop("disabled", true);
  $("#btnAdd").hide();
}
function excluirAula() {
  if (confirm("Deseja excluir a aula 'Spinning'?")) {
    alert("Aula excluida com sucesso!");
  }
}
function excluirPlano() {
  if (confirm("Deseja excluir o plano 'Musculação Easy'?")) {
    alert("Plano excluido com sucesso!");
  }
}
function salvarTreino(num) {
  if (num == 1) {
    $("#iptSerie1").prop("disabled", true);
    $("#iptRepeticao1").prop("disabled", true);
    $("#edit1").show();
    $("#save1").hide();
  }
  if (num == 2) {
    $("#iptSerie2").prop("disabled", true);
    $("#iptRepeticao2").prop("disabled", true);
    $("#edit2").show();
    $("#save2").hide();
  }
  if (num == 3) {
    $("#iptSerie3").prop("disabled", true);
    $("#iptRepeticao3").prop("disabled", true);
    $("#edit3").show();
    $("#save3").hide();
  }
}
function editarTreino(num) {
  if (num == 1) {
    $("#iptSerie1").prop("disabled", false);
    $("#iptRepeticao1").prop("disabled", false);
    $("#edit1").hide();
    $("#save1").show();
  }
  if (num == 2) {
    $("#iptSerie2").prop("disabled", false);
    $("#iptRepeticao2").prop("disabled", false);
    $("#edit2").hide();
    $("#save2").show();
  }
  if (num == 3) {
    $("#iptSerie3").prop("disabled", false);
    $("#iptRepeticao3").prop("disabled", false);
    $("#edit3").hide();
    $("#save3").show();
  }
}
function editarPerfil() {

  $("#iptNome").prop("disabled", false);
  $("#iptDtNasc").prop("disabled", false);
  $("#iptEmail").prop("disabled", false);
  $("#btnSalvar").show();
  $("#btnEditar").hide();
}
function salvarPerfil() {

  $("#iptNome").prop("disabled", true);
  $("#iptDtNasc").prop("disabled", true);
  $("#iptEmail").prop("disabled", true);
  $("#btnSalvar").hide();
  $("#btnEditar").show();
}
function detalhes(num) {
  switch (num) {
      case 1:
          $("#1").slideToggle();
          break;
      case 2:
          $("#2").slideToggle();
          break;
      case 3:
          $("#3").slideToggle();
          break;
      case 4:
          $("#4").slideToggle();
          break;
      case 5:
          $("#5").slideToggle();
          break;
      case 6:
          $("#6").slideToggle();
          break;
      case 7:
          $("#7").slideToggle();
          break;
      default:
  }
}
function exibirEvol(){
  $("#divEvol").slideToggle();
}

function exibirAulas(){
  window.open("aulas.html","_self")
}
function redirectPag(){
  if(confirm("Você será direcionado para a página de pagamento")){
    window.location.href = "index.html";
  }
}
// MENU 
$('.menu-anchor').on('click touchstart', function (e) {
  $('html').toggleClass('menu-active');
  e.preventDefault();
});
