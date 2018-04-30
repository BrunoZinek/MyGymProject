<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);	
  

	$dados = mysqli_query($conn,
		"SELECT id_aulas,
		modalidade,
		data,
		horario,
		professor
	    FROM aulas 
		/*WHERE id_usuario = '$id_usuario'*/");

	mysqli_close($conn);
    $rows = mysqli_num_rows($dados);
    $linha = mysqli_fetch_assoc($dados);

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
        		"Id_Aula" => $linha['id_aulas'],
		    	"Data"  => $linha['data'],
		        "Horario" => $linha['horario'],
		        "Professor" => $linha['professor'],
        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>