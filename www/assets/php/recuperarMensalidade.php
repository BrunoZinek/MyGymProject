<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);	
  

	$dados = mysqli_query($conn,
		"SELECT pl.titulo,
		pl.descricao,
        pl.id_planos,
        pl.duracao
	    FROM usuario AS us 
        left join planos as pl
        on us.id_planos = pl.id_planos
        WHERE us.id_usuario = '$id_usuario'");

	mysqli_close($conn);
    $rows = mysqli_num_rows($dados);
    $linha = mysqli_fetch_assoc($dados);

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
        		"Titulo" => $linha['titulo'],
		    	"Descricao"  => $linha['descricao'],
        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>