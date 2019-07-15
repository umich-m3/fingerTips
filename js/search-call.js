// JavaScript Document


/*Return to calling page when done with search*/

		$( "#search").click(function(e) {				   
				var myURL = document.URL;
				localStorage.setItem("searchcallpage", myURL);
		});
		
		$(document).ready(function() {
            
            $('#backLink').click(function(){
                var href = localStorage.getItem("searchcallpage");
				localStorage.removeItem("searchcallpage");
                window.location.href = href;
            });
            
        });
		

 
