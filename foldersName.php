<?php

$host = $_POST["host"];
$user = $_POST["user"];
$password = $_POST["password"];

// make a connection with emails using imap

    $mbox = imap_open($host, $user, $password, OP_HALFOPEN)
        or die("Connexion impossible : " . imap_last_error());

    $list = imap_list($mbox, $host, "*");
    $folders = [];
    //print_r($list);
    if (is_array($list)) {
        foreach ($list as $val) {
            //echo imap_utf7_decode($val) . "\n";
            array_push($folders, $val);
        }
        print_r(json_encode($folders));

    } else {
        echo "imap_list a échoué : " . imap_last_error() . "\n";
    }

    imap_close($mbox);

?>