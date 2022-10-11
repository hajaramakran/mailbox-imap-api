  //ajax

  export function listmail(data) {
    let list = [];
   
    console.log(data);
    $.ajax({
        
        url: 'http://localhost/imap/listmailling.php',
        type: 'POST',
        data: data,
        //dataType: 'json',
        async: false,
       

        success: function(data) {
            console.log("s");
            //console.log(data);
            list=JSON.parse(data);
            console.log(list);
           
        },
        
        error: function(xhr, status, error) {
            console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        } 
    });
   return list;
    
}

export function deletemail(data) {
  
    $.ajax({
        
        url: 'http://localhost/imap/deletemail.php',
        type: 'POST',
        data: data,
        async: false,
       

        success: function(data) {
                console.log(data);
            console.log("deleted");
           
        },
        
        error: function(xhr, status, error) {
            console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        } 
    });
  
    
}



export function sendmail(data) {
  
    $.ajax({
        
        url: 'http://localhost/imap/sendMail.php',
        type: 'POST',
        data: data,
        //data: $.toJSON(data),
        //processData: false,
       // contentType: false,
        //processData: false,
        async: false,
        

        success: function(data) {
            
           // list=JSON.parse(data);
            console.log(data);
           
        },
        
        error: function(xhr, status, error) {
            console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        } 
    });
  
    
}


export function readmail(data) {
    let mail = [];
      $.ajax({
          
          url: 'http://localhost/imap/readMail.php',
          type: 'POST',
          data: data,
          //dataType: 'json',
          async: false,
          
         
  
          success: function(data) {
           // console.log(data);
            mail = JSON.parse(data); 
            //console.log(mail);
            
          },
          
          error: function(xhr, status, error) {
              console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
              var err = eval("(" + xhr.responseText + ")");
              console.error(err.Message);
          } 
      });
    
      return mail;
  } 

 
  export function foldersName(data) {
   
    let folders =[];
    $.ajax({
        
        url: 'http://localhost/imap/foldersName.php',
        type: 'POST',
        data: data,
        //dataType: 'json',
        async: false,
        
       

        success: function(data) {
         
          folders = JSON.parse(data);
       
         
        },
        
        error: function(xhr, status, error) {
            console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        } 
    });
  return folders;
} 