import {listmail, deletemail, sendmail, readmail} from './ajaxx.js';


let userMail = localStorage.getItem("user");
let userPassword = localStorage.getItem("userPassword");
let host = localStorage.getItem("host");
 
$(document).ready(function() {
     
    load();

    $('#check').click(function() {
        
        $('#btnDelete').show();
    });
 
    //Delete mail
    $('#btnDelete').click(function(){
     
       let id = $('#tablemail').find(':checkbox:checked').closest('tr').attr('id');
       console.log(id);
       let data={"host": host+"INBOX", "user": userMail, "password": userPassword, "message_nums": id };
       deletemail(data); 
       location.reload(true);
    });

   

    //send mail
    $('#btnSend').click(function(){

        let to = $('#inputEmail').val();
        let subject = $('#inputSubject').val();
        let message = $('#inputMessage').val();
        let cc = $('#inputCc').val();
        let attachment = $('#attachment')[0].files[0];
        console.log(attachment.name);
        console.log(attachment.type);
        console.log(attachment.tmp_name);
        //"name": attachment.name, "type": attachment.type,"size": attachment.size
        sendmail({"host": host+"INBOX.Sent", "email": userMail, 
        "password": userPassword, "to": to, "subject": subject, "message": message, "cc": cc});
        
    })

    //Inbox folder
    $('#inboxmails').click(function(){
        $("#tablemail tbody").html('');
        $(".pageNumber").html('');
        $('#loadingImage').toggle();
        randertabllistmail();
    })

    $('#importantFolder').click(function(){
        $("#tablemail").html('');
        $("#emptyFolder").html('');
       
        $("#emptyFolder").html("This folder is empty.");

    })
    $('#draftFolder').click(function(){
        $("#tablemail").html('');
        $("#emptyFolder").html('');
        $("#emptyFolder").html("This folder is empty.").css("text-align", "center");
       
    })
    $('#trashFolder').click(function(){
        $("#tablemail").html('');
        $("#emptyFolder").html('');
        $("#emptyFolder").html("This folder is empty.");
       
    })
   

    function load() {
        console.log("load");       
        console.log("load");       
      
        randertabllistmail();
     /*   
        let donnee={"host":  host, "user": userMail, "password": userPassword };
        let folder = foldersName(donnee);
        
        for (var i in folder) {
            $("<li id='" + folder[i].split("}")[1] +"'><a>" + folder[i].split("}")[1] + "<span id='numberofmails' class='label label-danger pull-right'></span></a></li>").appendTo($("#menu"));
                    
           
        }
        $('#menu li').click(function(){
            console.log("menu li clicked");
            let idFolder = $(this).attr('id');
             $('.active').removeClass('active');
            $(this).addClass('active');
            $("#tablemail tbody").html('');
          
            console.log(idFolder); 
            let dataFolder = {"host":  host+idFolder, "user": userMail, "password": userPassword };
            let result = listmail(dataFolder);
            console.log(result);
            
            var state = {
                'querySet': result,
                
                'page': 1,
                'rows': 10,
                'window': 5,
                }
                
            buildTable()
                
            function pagination(querySet, page, rows) {
        
                    var trimStart = (page - 1) * rows
                    var trimEnd = trimStart + rows
                    
                    var trimmedData = querySet.slice(trimStart, trimEnd)
                    
                    var pages = Math.round(querySet.length / rows);
                    
                    return {
                        'querySet': trimmedData,  //return table data
                        'pages': pages,           // return total of pages
                    }
                    }
                
                
            function pageButtons(pages) {
                var wrapper = document.getElementById('pagination-wrapper')
                
                wrapper.innerHTML = ``
                console.log('Pages:', pages)
                
                var maxLeft = (state.page - Math.floor(state.window / 2))
                var maxRight = (state.page + Math.floor(state.window / 2))
                
                if (maxLeft < 1) {
                    maxLeft = 1
                    maxRight = state.window
                }
                
                if (maxRight > pages) {
                    maxLeft = pages - (state.window - 1)
                    
                    if (maxLeft < 1){
                        maxLeft = 1
                    }
                    maxRight = pages
                }
                
                
                
                for (var page = maxLeft; page <= maxRight; page++) {
                    wrapper.innerHTML += `<button value=${page} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">${page}</button>`
                }
                
                if (state.page != 1) {
                    wrapper.innerHTML = `<button value=${1} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">&#171; First</button>` + wrapper.innerHTML
                }
                
                if (state.page != pages) {
                    wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm" style=" background-color: white; color: black; border: 2px solid #2980b9;">Last &#187;</button>`
                }
                
                $('.page').on('click', function() {
                    $('#tablemail tbody').empty()
                
                    state.page = Number($(this).val())
                
                    buildTable()
                })
                
                }
                
                
            function buildTable() 
            {
                
                var data = pagination(state.querySet, state.page, state.rows)
                var myList = data.querySet
                
    
            ////////////////////////////////
            for(var i in myList){
                
                $("<tr data-toggle='modal' class='read' id='" + myList[i].Msgno + "'><td class='inbox-small-cells'><input type='checkbox' class='mail-checkbox'></td>"+
                "<td class='inbox-small-cells'><i class='fa fa-star'></i></td>"
                +"<td  class='view-message  dont-show'>" + myList[i].toaddress + "</td>"
                +"<td class='view-message'>" + myList[i].Subject.substr(0, 20) + "</td>"
                +"<td class='view-message  inbox-small-cells'><i class='fa fa-paperclip'></i></td>"
                +"<td  class='view-message'>" + myList[i].MailDate + "</td>"
                + "</tr>").appendTo($("#tablemail tbody"));
               
            }
                   //read email's body
        $('#tablemail tr').click(function(){
            console.log("clicked");
            $(this).removeClass("unread");
            $(this).addClass("read");
            
            let id = $(this).closest('tr').attr('id');
            console.log(id);
            let data={"host": host+idFolder, "user": userMail, "password": userPassword, "id": id };
            let mailBody = readmail(data); 
            console.log(mailBody.message);
           // $("#mailBody").html("");

            $("#mailBody").html(mailBody.message).css("white-space", "pre-wrap");
            $("#mailDate").html(mailBody.Date);
            $("#bodyFrom").text(mailBody.from[0].mailbox+'@'+mailBody.from[0].host);

           

            $("#deleteOnViewMail").click(function(){
                console.log("clicked");
                console.log(id);
                let data2={"host": host+idFolder, "user": userMail, "password": userPassword, "message_nums": id };
                deletemail(data2); 
                location.reload(true);
            });
            
        });
          
    
            pageButtons(data.pages)
        }
        })
     */
    } 
  
    function randertabllistmail() {
//"admin@sholegoo.com", "password": "N98tNZhJTC20"

        
        console.log("randertable"); 
        
        //'{'+serverr+':993/imap/ssl}INBOX'
       //"{sholegoo.com:993/imap/ssl}INBOX"
       //{imap-mail.outlook.com:993/ssl}INBOX
        let data={"host":  host+"INBOX", "user": userMail, "password": userPassword };
        $('#myEmail').val(data.user);
        let list = listmail(data);
        let rowsTotal = list.length;
        $('#numberofmails').html(rowsTotal);
       
       

        var state = {
            'querySet': list,
            
            'page': 1,
            'rows': 10,
            'window': 5,
            }
        
        buildTable()
  
    
        function pagination(querySet, page, rows) {
        
            var trimStart = (page - 1) * rows
            var trimEnd = trimStart + rows
            
            var trimmedData = querySet.slice(trimStart, trimEnd)
            
            var pages = Math.round(querySet.length / rows);
            
            return {
                'querySet': trimmedData,  //return table data
                'pages': pages,           // return total of pages
            }
            }
        
        function pageButtons(pages, page, window) {
                var wrapper = document.getElementById('pagination-wrapper')
                
                wrapper.innerHTML = ``
                console.log('Pages:', pages)
                
                var maxLeft = (state.page - Math.floor(state.window / 2))
                var maxRight = (state.page + Math.floor(state.window / 2))
                
                if (maxLeft < 1) {
                    maxLeft = 1
                    maxRight = state.window
                }
                
                if (maxRight > pages) {
                    maxLeft = pages - (state.window - 1)
                    
                    if (maxLeft < 1){
                        maxLeft = 1
                    }
                    maxRight = pages
                }
                
                
                
                for (var page = maxLeft; page <= maxRight; page++) {
                    wrapper.innerHTML += `<button value=${page} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">${page}</button>`
                }
                
                if (state.page != 1) {
                    wrapper.innerHTML = `<button value=${1} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">&#171; First</button>` + wrapper.innerHTML
                }
                
                if (state.page != pages) {
                    wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm" style=" background-color: white; color: black; border: 2px solid #2980b9;">Last &#187;</button>`
                }
                
                $('.page').on('click', function() {
                    $('#tablemail tbody').empty()
                
                    state.page = Number($(this).val())
                
                    buildTable()
                })
                
                }
        function buildTable() {
       
        
                var data = pagination(state.querySet, state.page, state.rows)
                var myList = data.querySet
                
                for (var i in myList) {
                    $("<tr data-toggle='modal'href='#reading' class='read' id='" + myList[i].Msgno + "'><td class='inbox-small-cells'><input id='check'  type='checkbox' class='mail-checkbox'></td>"+
                            "<td class='inbox-small-cells'><i class='fa fa-star'></i></td>"
                            +"<td id='from' class='view-message  dont-show'>" + myList[i].from[0].personal + "</td>"
                            +"<td class='view-message'>" + myList[i].subject.substr(0, 20) + "</td>"
                            +"<td class='view-message  inbox-small-cells'><i class='fa fa-paperclip'></i></td>"
                            +"<td id='dateMail' class='view-message'>" + dateconvert(myList[i].Date) + "</td>"
                            + "</tr>").appendTo($("#tablemail tbody"));
                            if(myList[i].Unseen === 'U'){
                                $('#tablemail tr').addClass("unread");
                            }
                   
                }
                $('#loadingImage').hide();
                //read email's body
        $('#tablemail tr').click(function(){
            console.log("clicked");
            $(this).removeClass("unread");
            $(this).addClass("read");
            
            let id = $(this).closest('tr').attr('id');
            console.log(id);
            let data={"host": host+"INBOX", "user": userMail, "password": userPassword, "id": id };
            let mailBody = readmail(data); 
            console.log(mailBody.message);
            

            $("#mailBody").html(mailBody.message).css("white-space", "pre-wrap");
            $("#mailDate").html(mailBody.Date);
            $("#bodyFrom").text(mailBody.from[0].mailbox+'@'+mailBody.from[0].host);

             //Reply to mail insde body
            $('#replyToMsg').click(function(){
                $("#replyDiv").toggle();   
                $('#replyBtnSend').click(function(){
                    
                    $("#replyTo").val(mailBody.from[0].mailbox+'@'+mailBody.from[0].host);

                    let messageReply = $('#replyMessage').val();
                    let cc = $('#replyCc').val();
                    sendmail({"host": host+"INBOX.Sent", "email": userMail, 
                    "password": userPassword, "to": mailBody.from[0].mailbox+'@'+mailBody.from[0].host, "subject": mailBody.subject, 
                    "message": messageReply, "cc": cc});
                    console.log("Sent with success");
                })
         })

            $("#deleteOnViewMail").click(function(){
                console.log("clicked");
                console.log(id);
                let data2={"host": host+"INBOX", "user": userMail, "password": userPassword, "message_nums": id };
                deletemail(data2); 
                location.reload(true);
            });
            
        });
        pageButtons(data.pages)
        } 
     
    } 

    function dateconvert(data) {
        let todayDate = new Date();
        let todayMonth = todayDate.toDateString().split(" ")[1];
        let todayDay = todayDate.toDateString().split(" ")[2][1];
        let todayDay2 = todayDate.toDateString().split(" ")[2][0] + todayDate.toDateString().split(" ")[2][1];

        let todayYear = todayDate.toDateString().split(" ")[3];

        let hour = data.split(",")[1].split(" ")[4].split(":")[0]+':'+data.split(",")[1].split(" ")[4].split(":")[1];
        let day = data.split(",")[1].split(" ")[1];
        
        let month = data.split(",")[1].split(" ")[2];
        let year = data.split(",")[1].split(" ")[3];


        if(((todayDay === day) || (todayDay2 === day)) & (todayMonth === month) & ( todayYear === year))
        {
            return hour;
        }else{
            if((todayMonth === month) & ( todayYear === year) & (todayDay != day))
                {
                    return day+" "+month;
                }
            }return day+" "+month+" "+year;
        
        
        
    }

    //Sent mails folder

    $('#sentmails').click(function()
    {
        $('.active').removeClass('active');
        $(this).addClass('active');
        
        $("#tablemail thead").html('');
        $("#tablemail tbody").html('');
        
        let hostMAil = '';
        
        if(host === "{imap-mail.outlook.com:993/ssl}"){
            hostMAil = host+"Sent";

        }else
         {
            hostMAil = host+"INBOX.Sent";
         }
         
         let data={"host": hostMAil, "user": userMail, "password": userPassword };

        let list = listmail(data);
        
        /////////////////////
        var state = {
            'querySet': list,
            
            'page': 1,
            'rows': 10,
            'window': 5,
            }
            
        buildTable()
            
        function pagination(querySet, page, rows) {
    
                var trimStart = (page - 1) * rows
                var trimEnd = trimStart + rows
                
                var trimmedData = querySet.slice(trimStart, trimEnd)
                
                var pages = Math.round(querySet.length / rows);
                
                return {
                    'querySet': trimmedData,  //return table data
                    'pages': pages,           // return total of pages
                }
                }
            
            
        function pageButtons(pages) {
            var wrapper = document.getElementById('pagination-wrapper')
            
            wrapper.innerHTML = ``
            console.log('Pages:', pages)
            
            var maxLeft = (state.page - Math.floor(state.window / 2))
            var maxRight = (state.page + Math.floor(state.window / 2))
            
            if (maxLeft < 1) {
                maxLeft = 1
                maxRight = state.window
            }
            
            if (maxRight > pages) {
                maxLeft = pages - (state.window - 1)
                
                if (maxLeft < 1){
                    maxLeft = 1
                }
                maxRight = pages
            }
            
            
            
            for (var page = maxLeft; page <= maxRight; page++) {
                wrapper.innerHTML += `<button value=${page} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">${page}</button>`
            }
            
            if (state.page != 1) {
                wrapper.innerHTML = `<button value=${1} class="page btn btn-sm " style=" background-color: white; color: black; border: 2px solid #2980b9;">&#171; First</button>` + wrapper.innerHTML
            }
            
            if (state.page != pages) {
                wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm" style=" background-color: white; color: black; border: 2px solid #2980b9;">Last &#187;</button>`
            }
            
            $('.page').on('click', function() {
                $('#tablemail tbody').empty()
            
                state.page = Number($(this).val())
            
                buildTable()
            })
            
            }
            
            
        function buildTable() 
        {
            
            var data = pagination(state.querySet, state.page, state.rows)
            var myList = data.querySet
            

        ////////////////////////////////
        $("<tr class='unread'><td class='inbox-small-cells'></td><td class='inbox-small-cells'><i class='fa fa-star'></i></td>"
        + "<td class='view-message  dont-show'>To</td><td class='view-message'>Subject</td>"
        + "<td class='view-message  inbox-small-cells'><i class='fa fa-paperclip'></i></td>"
        + "<td class='view-message'>Date</td></tr>").appendTo($("#tablemail thead"));

        for(var i in myList){
            
            $("<tr data-toggle='modal' class='read' id='" + myList[i].Msgno + "'><td class='inbox-small-cells'><input type='checkbox' class='mail-checkbox'></td>"+
            "<td class='inbox-small-cells'><i class='fa fa-star'></i></td>"
            +"<td  class='view-message  dont-show'>" + myList[i].toaddress + "</td>"
            +"<td class='view-message'>" + myList[i].Subject.substr(0, 20) + "</td>"
            +"<td class='view-message  inbox-small-cells'><i class='fa fa-paperclip'></i></td>"
            +"<td  class='view-message'>" + myList[i].MailDate + "</td>"
            + "</tr>").appendTo($("#tablemail tbody"));
           
        }
                 //read email's body
                 $('#tablemail tr').click(function(){
                    console.log("clicked");
                    
                    let id = $(this).closest('tr').attr('id');
                    console.log(id);
                    let data={"host": hostMAil, "user": userMail, "password": userPassword, "id": id };
                    let mailBody = readmail(data); 
                    console.log(mailBody.message);
                    //mailBody
                    $("#tablemail").hide();
                    $("#backkBtn").show();
                    $("#sentBody").html("<span>Date :  </span>" + mailBody.Date + "\n" + "<span>To :  </span>" + mailBody.toaddress
                                        + "\n" + "Subject: " + mailBody.Subject
                                        + "\n" + mailBody.message).css("white-space", "pre-wrap");

                    $("#backkBtn").click(function(){
                        console.log("clicked");
                        $("#tablemail").show();
                        $("#sentBody").html('');
                        $("#backkBtn").hide();
                    })
                    
                    
                });
                
        pageButtons(data.pages)
    }
       
 
       
    }) 

     
    
});
