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

        for($i = 1; $i <= $count; $i++) {
            $id = imap_uid($con, $i);
            echo $id;
            $header = imap_headerinfo($con, $id, FT_UID);

            echo json_encode($header)."\n";
            
            
        }

        imap_close($con);
    } else
    {
        //echo "FAIL!";
        echo "FAIL!". imap_last_error() . "\n";

    }

?>