<?php 



// variables 
 $host = $_POST["host"];
$email = $_POST["email"];
$password = $_POST["password"];  


// make a connection with emails using imap
$con = imap_open($host, $email, $password);
//&&  isset($_FILES['attachment'])
if($con){
    if(isset($_POST['to']) && isset($_POST['subject']) && isset($_POST['message']) ){
    
        $to = $_POST["to"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];
        $cc = $_POST["cc"];
        $tmp_name = $_FILES['attachment']['tmp_name']; // get the temporary file name of the file on the server
       /* $name=$_POST['name'];
        $type=$_POST['type'];
        $size=$_POST['size'];*/
        $name     = $_FILES['attachment']['name']; // get the name of the file
        $size     = $_FILES['attachment']['size']; // get size of the file for size validation
        $type     = $_FILES['attachment']['type']; // get type of the file
        $error    = $_FILES['attachment']['error']; // get the error (if any)
        if($error > 0)
        {
            die('Upload error or No files uploaded');
        }

        //read from the uploaded file & base64_encode content
        $handle = fopen($tmp_name, "r"); // set the file handle only for reading the file
        $content = fread($handle, $size); // reading the file
        fclose($handle);                 // close upon completion
 
        $encoded_content = chunk_split(base64_encode($content));
        $boundary = md5("random"); // define boundary with a md5 hashed value    

        
        // headers
        $entete .="MIME-Vsersion: 1.0 \n";
        $entete = "From: $email \n"; // expéditeur
        $entete .= "Cc: $cc \n";
        $entete .= "Reply-To: $email \n"; // Adresse de retour, retour à l'envoyeur en cas d'erreur
        $entete .= "X-Mailer: PHP/" . phpversion() . "\n" ; //version
        $entete .= "Date: ". date("D, j M Y H:i:s") ."\n"; //date;
        $entete .="Content-Transfer-Encoding: 8bit \n";
        $entete .="Content-type: multipart/mixed; charset=utf-8 \n"; 
        $entete .= "boundary = $boundary\r\n"; //Defining the Boundary


        //plain text
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
        $body .= base64_encode($message);
            
        //attachment
        $body .= "--$boundary\r\n";
        $body .="Content-Type: $type; name=".$name."\r\n";
        $body .="Content-Disposition: attachment; filename=".$name."\r\n";
        $body .="Content-Transfer-Encoding: base64\r\n";
        $body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
        $body .= $encoded_content; // Attaching the encoded file with email


        $send = mail($to, $subject, $body, $entete); // send message
                                                    
        if($send){
                                                    //append the sent message to sent folder
                imap_append($con, $host, "From: $email \r\n" 
                            . "To: $to \r\n"
                            . "Subject: $subject\r\n"
                            . "\r\n"
                            
                            . "$body\r\n");

           print_r("send with success");
           print_r($name );
           print_r($type);
        }
        else
        {
            print("Try again !");
        }
    }else{
        print("Something is wrong !");

    }
    imap_close($con);
} else
    {
    echo "FAIL!". imap_last_error() . "\n";
   }

?>

   

    