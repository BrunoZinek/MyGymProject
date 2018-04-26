$(function(){
    verificarSessao();
    
    recuperarPerfil();
    
})

function recuperarPerfil(){
    $('.box-spinner').show();
    $.get('https://api.myjson.com/bins/16bqxj',function(data){
        $('#iptNome').attr('value',data[0].nome);
        $('#iptDtNasc').attr('value',data[0].dtNasc);
        $('#iptEmail').attr('value',data[0].email);
    })
    .fail(function(){
        alert('Sistema indisponivel')
    })
    .always(function(){
        $('.box-spinner').toggle();
    })
}