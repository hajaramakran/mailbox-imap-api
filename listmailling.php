

<?php

    //header('Content-Type: application/json');

    // variables
    $host = $_POST["host"];
    $user = $_POST["user"];
    $password = $_POST["password"];

    // make a connection with emails using imap
    $con = imap_open($host, $user, $password);


    // testing the connexion
    if($con){

        $count = imap_num_msg($con); //the numbers of messages
        $headers =[];
      //$i = 1; $i <= $count; $i++
          
        for($i = $count; $i >= 1; $i--) {
            $header = imap_headerinfo($con, $i);
            array_push($headers, $header);
        }

        print_r(json_encode($headers));

        //print(gettype ($headers));

        imap_close($con);
    } else
    {
        echo "FAIL!". imap_last_error() . "\n";
    }

?>
