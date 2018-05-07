<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Content-Type: application/json'); 

	include_once("conexao.php");	
    include_once("valida.php");
		

    $id_usuario = validar($conn);	
  
	if($id_usuario == 0){
		echo json_encode(array('autenticado' => 0));	
	}
    
	else{
		echo json_encode(array('autenticado' => 1));
	}
    mysqli_close($conn);
?>