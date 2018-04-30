<?php

    include_once("conexao.php");

    function validar ($conn){

	    /*if(isset($_POST['login']) && isset($_POST['senha'])&& $_SERVER['REQUEST_METHOD'] === 'POST')
    	{*/
            
            $dados= mysqli_query($conn, "SELECT id_usuario FROM login /*WHERE login = 'mgdiegor' AND senha = '1234'*/");
            
            $rows = mysqli_num_rows($dados);
            $linha = mysqli_fetch_assoc($dados);   
        /*}*/
            
    
    
        if ($rows>0){
        return $linha['id_usuario'];
        }        

        else{
        return 0;
        }

        //mysqli_close($conn);

        

    }

	    
?>

