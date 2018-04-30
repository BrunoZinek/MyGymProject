<?php

	include_once("valida.php"); 

	$id_usuario = validar($conn);

	$dados = mysqli_query($conn,
		"SELECT us.nome,
		us.id_usuario,
	    us.data_nascimento,
	    US.data_matricula,
	    us.email,
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

    $arrayDados = array();

	if (count($linha))    
    	foreach ($dados as $dados) {
        	$arrayDados[] = array(
		    	"Nome"  => $linha['nome'],
		         "data_nascimento" => $linha['data_nascimento'],
		         "Data de Matrícula" => $linha['data_matricula'],
		         "email" => $linha['email'],
		         "Id Usuário" => $linha['id_usuario'],
		         "Peso" => $linha['peso'],
		         "Altura" => $linha['altura'],
		         "IMC" => $linha['imc'],
		         "Gordura" => $linha['gordura'],
		         "Biceps" => $linha['biceps'],
		         "Quadril" => $linha['quadril'],
		         "" => $linha['antebraco'],
		         "Panturrilha" => $linha['panturrilha'],
		         "Peito" => $linha['peito'],
		         "Coxa" => $linha['coxa'],
		         "Abdomen" => $linha['abdomen'],

        );
    }

    echo '<pre>';
    echo json_encode($arrayDados);
    echo '<pre>';


?>