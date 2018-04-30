<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);	
  

	$dados = mysqli_query($conn,
		"SELECT tr.id_treino,
		tr.treino,
		ex.grupo_muscular,
		ex.id_exercicio
	    FROM usuario as us

	    left join treino AS tr 
	    on us.id_treino = tr.id_treino

	    left join exercicio as ex
	    on tr.id_exercicio = ex.id_exercicio
		
		WHERE us.id_usuario = '$id_usuario'");

	mysqli_close($conn);
    $rows = mysqli_num_rows($dados);

    $linha = mysqli_fetch_assoc($dados);

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
		    	"Id_Treino"  => $linha['id_treino'],
		         "Id_Exercicio" => $linha['id_exercicio'],
		         "Treino" => $linha['treino'],
		         "Grupo Muscular" => $linha['grupo_muscular'],
		        

        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>