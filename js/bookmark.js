// JavaScript Document
/*Determine if bookmark is set*/
		$(function(){	
			var docTitle = document.getElementsByClassName("titleCenter")[0].textContent;
			var docSection = document.getElementsByClassName("scrapeMeTitle")[0].textContent;
			var parts = [docTitle, docSection];
			var myTitle = parts.join(':');
			var myURL = document.URL;
			var bookmark = myTitle+": "+myURL;
			var bookmarks=[];
			var storedData = localStorage.getItem("tehibookmarks");
			if (storedData) {
				bookmarks = JSON.parse(storedData);
				j=bookmarks.indexOf(bookmark);
				if (j !== -1) {
					$( "#bookmark" ).toggleClass( "maize" );
				} 
			}
		});

/*Bookmark and unbookmark*/

		$( "#bookmark").click(function(e) {				   
			$(this).toggleClass( "maize" );
				var docTitle = document.getElementsByClassName("titleCenter")[0].textContent;
				var docSection = document.getElementsByClassName("scrapeMeTitle")[0].textContent;
				var parts = [docTitle, docSection];
				var myTitle = parts.join(':');
				var myURL = document.URL;
				var bookmark = myTitle+": "+myURL;
				var bookmarks=[];
				var storedData = localStorage.getItem("tehibookmarks");
				if (storedData) {
					bookmarks = JSON.parse(storedData);
				}
				
				if ( $(this).hasClass( "maize" ) ) {
				bookmarks.push (bookmark);
				localStorage.setItem("tehibookmarks", JSON.stringify(bookmarks));
			}
			else {
				var i = bookmarks.indexOf(bookmark);
					if(i != -1) {
						bookmarks.splice(i, 1);
					};
				if(bookmarks.length == 0) {
					localStorage.removeItem("tehibookmarks");
				}
				else {
				localStorage.setItem("tehibookmarks", JSON.stringify(bookmarks));
				}
			}
		});
 
 
