<?php

    // variables
    $host = $_POST["host"];
    $user = $_POST["user"];
    $password = $_POST["password"];

    // make a connection with emails using imap
    $con = imap_open($host, $user, $password);


    // testing the connexion
    if($con){

        $count = imap_num_msg($con); //the numbers of messages
       
        $message_nums = $_POST["message_nums"]; //message number
        
      if ($message_nums >1 && $message_nums <= $count)
        {
            imap_delete($con, $message_nums);
            imap_expunge($con);

        }
      
        imap_close($con);
    } else
    {
        
        echo "FAIL!". imap_last_error() . "\n";

    }

?>