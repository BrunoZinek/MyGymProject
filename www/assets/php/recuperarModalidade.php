<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);	
  

	$dados = mysqli_query($conn,
		"SELECT id_aulas,
		modalidade
	    FROM aulas 
		/*WHERE id_usuario = '$id_usuario'*/");

	mysqli_close($conn);
    $rows = mysqli_num_rows($dados);
    $linha = mysqli_fetch_assoc($dados);

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
		    	"Modalidade"  => $linha['modalidade'],
		         "Id_Aula" => $linha['id_aulas'],
        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>