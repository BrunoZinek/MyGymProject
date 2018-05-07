<?php

    function validar ($conn){
		if($_SERVER['REQUEST_METHOD'] === 'POST'){
			if(isset($_POST['login']) && isset($_POST['senha']))
			{
				$login = $_POST['login'];
				$senha = $_POST['senha'];
				$dados= mysqli_query($conn, "SELECT id_usuario FROM login WHERE login = '$login' AND senha = '$senha'");
				
				$rows = mysqli_num_rows($dados);
				$linha = mysqli_fetch_assoc($dados);   
				
				if ($rows>0){
					return $linha['id_usuario'];
				}        
			}
		}
		            
    return 0;
	
	//mysqli_close($conn);
	}	    
?>

