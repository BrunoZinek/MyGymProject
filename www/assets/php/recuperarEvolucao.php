<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);	
  
	if($id_usuario == 0){
		echo json_encode(array('autenticado' => 0));	
	}
    
	else{
	echo json_encode(array('autenticado' => 1));
	}

	$dados = mysqli_query($conn,
		"SELECT us.nome,
	    us.data_nascimento,
	    us.email,
	    evo.id_usuario,
	    evo.peso,
	    evo.altura,
	    evo.imc,
	    evo.gordura,
		evo.biceps,
		evo.quadril,
		evo.antebraco,
		evo.panturrilha,
		evo.peito,
		evo.coxa,
		evo.abdomen
	    FROM usuario AS us 
	    left join evolucao as evo
	    on us.id_usuario = evo.id_usuario
		WHERE us.id_usuario = '$id_usuario'");

	mysqli_close($conn);
    $rows = mysqli_num_rows($dados);

    $linha = mysqli_fetch_assoc($dados);

    echo $linha['id_usuario'],"<br>", $linha['peso'],"<br>",  $linha['altura'];

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
		    	"Nome"  => $linha['nome'],
		         "data_nascimento" => $linha['data_nascimento'],
		         "email" => $linha['email'],
		         "" => $linha['id_usuario'],
		         "" => $linha['peso'],
		         "" => $linha['altura'],
		         "" => $linha['imc'],
		         "" => $linha['gordura'],
		         "" => $linha['biceps'],
		         "" => $linha['quadril'],
		         "" => $linha['antebraco'],
		         "" => $linha['panturrilha'],
		         "" => $linha['peito'],
		         "" => $linha['coxa'],
		         "" => $linha['abdomen'],

        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>