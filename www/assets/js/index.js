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
function erroExec() {
  alert("Imagem não cadastrada. Contate um funcionário da academia.")
}
function agendarAula(){
  if(confirm("Deseja agendar Spinning no dia 10/10/2018 às 20:00?")){
    alert("Aula agendada com sucesso. Caso não possa comparecer, favor avisar a recepção.")
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
