<?php

session_start();

 if(isset($_POST['login'])){
    
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $domain_name = explode("@",$user);
    //Check if domain mail is real
    if(checkdnsrr(array_pop($domain_name),"MX")){
     
      $connection = new mysqli("localhost", "root", "", "logindB");
      $data = $connection->query("SELECT id FROM user WHERE email = '$user' AND pass = '$pass'");

      if($data->num_rows > 0)
      {
        $_SESSION['loggedIn'] = 1;
        $_SESSION['user'] = $user;
        $_SESSION['pass'] = $pass;
            
        exit($user."=".$pass);
      }else 
      {
        $sql = "INSERT INTO user (email, pass) VALUES ('$user', '$pass')";

        if ($connection->query($sql) === TRUE)
        {
          exit($user."=".$pass);
        } else 
        {
          echo "Error: " . $sql . "<br>" . $connection->error;
        }
            
      }
      
      exit($user . " = " . $pass);
    
    }else
    {
      exit("False");
    }
  }
?>