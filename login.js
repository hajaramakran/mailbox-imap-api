//import {login} from './ajax.js';

$(document).ready(function() {

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }

    $('#btnLogin').click(function(){
          console.log("clicked");
        let user = $('#userr').val();
        let password = $('#passwordd').val();
        let serverr = user.split("@")[1];
        let host = '';
    
        if(user == "" || password == ""){

            alert("Please check your inputs");
        }else{ 
            if( !isEmail(user)){
            console.log("We are in email validation.")
            alert("Check your adress mail !");

            }else
            {
                if(serverr === "hotmail.com"){
                    host = "{imap-mail.outlook.com:993/ssl}";
                }else{
                    host = "{"+serverr+":993/imap/ssl}";
                }
                localStorage.setItem("host", host);
                
                login({'login': 1, 'user': user, 'pass': password});
                //console.log(localStorage.getItem("host"));

                
            // let userMail = localStorage.getItem("user");
       
            }
        }
    
       })
    
   

       function login(data) {
        
       
        $.ajax({
            
            url: 'http://localhost/imap/login.php',
            type: 'POST',
            data: data,
            //dataType: 'json',
            async: false,
           
    
            success: function(response) {
               
               // if(response.indexOf('success') >= 0){
                //console.log(localStorage.getItem("host"));
               
               if(response === "False")
               {
                console.log("Email does not exist");
                alert("Email or domain name does not exist !");
               }else
               {
                
                localStorage.setItem("user", response.split("=")[0]);
                localStorage.setItem("userPassword", response.split("=")[1]);
                window.location = 'inbox.html';
                
               }
               // }
        //list=response;
            },
            
            error: function(xhr, status, error) {
                console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
                var err = eval("(" + xhr.responseText + ")");
                console.error(err.Message);
            } 
        });
       
       
    }
    
       });


    