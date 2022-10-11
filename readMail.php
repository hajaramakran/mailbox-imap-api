<?php

    // variables
    $host = $_POST["host"];
    $user = $_POST["user"];
    $password = $_POST["password"];
    $id = $_POST["id"];

    $con = imap_open($host, $user, $password);
   
    if($con){
       // 
      $tempArray=[];

      $mailBody = imap_fetchbody($con, $id, 1);
        $header = json_encode(imap_headerinfo($con, $id));
        
        $tempArray = json_decode($header, true);
        $tempArray['message'] =  $mailBody;

        print_r(json_encode($tempArray));
    


        imap_close($con);
    } else
    {
        //echo "FAIL!";
        echo "FAIL!". imap_last_error() . "\n";

    }

?>