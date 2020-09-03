localStorage.scoreHiNero;
localStorage.saveResponseNero;

	// in page variables
	var scoreCorrect = localStorage.scoreCorrectNero;
	var scoreIncorrect = localStorage.scoreIncorrectNero;
	var neroIncorrect = JSON.parse(localStorage.getItem("neroIncorrect"));
	if (neroIncorrect == null){neroIncorrect = [];}
	var clicked = "c";
	var answered = 0;
	var retrievedAnsweredPages = localStorage.getItem("saveResponseNero");
	console.log(localStorage.getItem("saveResponseNero"));
	var answeredPages = JSON.parse(retrievedAnsweredPages);
	var pageInProgress = document.location.href.match(/[^\/]+$/)[0].replace('.html','');
	var totalItems =  20; //localStorage.totalItems;
	var currentScreen = parseFloat(pageInProgress); //holds current screen number
	var percentGrade = (scoreCorrect/totalItems)*100; //calculate user percent score
	var passing = 80; //What is the passign percentage
	
	console.log(retrievedAnsweredPages);
	console.log( JSON.parse(localStorage.getItem("neroIncorrect")));
	// Sets scores to what is in local storage
	$("#correctScore").text(localStorage.scoreCorrectNero);
	$("#incorrectScore").text(localStorage.scoreIncorrectNero);
	$("#status").hide();
	$(".currentScreen").text(currentScreen);
	$(".totalScreens").text(totalItems);
	$("#percentGradereport").text(percentGrade.toFixed());
	gradeQuiz();

	/*
	if (!window.sessionStorage.getItem("isExecutedNero")) {
		localStorage.scoreCorrectNero = 0;
		localStorage.scoreIncorrectNero = 0;
		localStorage.saveResponseNero;
		var answeredPages = []
		localStorage.setItem("saveResponseNero", JSON.stringify(answeredPages));
		window.sessionStorage.setItem("isExecutedNero", true);
		
	}
	*/
	
	$(document).ready(userStatus);
	
	// Resets first page if either score is null
	function resetIfEmpty(){
		if(scoreCorrect == null || scoreIncorrect == null){
			console.log("reset");
			retakeLauncher();
		}
	}

	function retakeLauncher() {
		// Sets localStorage to zero to restart the quiz
		localStorage.scoreCorrectNero = 0;
		localStorage.scoreIncorrectNero = 0;
		localStorage.saveResponseNero;
		var answeredPages = [];
		var resetNero = [];
		localStorage.setItem("saveResponseNero", JSON.stringify(answeredPages));
		localStorage.setItem("neroIncorrect", JSON.stringify(resetNero));
		document.location.href='1.html';
	}
	
	//evaluates the user score for passing
	function gradeQuiz() {
		if (percentGrade > passing) {
			$("#grading").text("Passed");
		} else { 
			$("#grading").text("Did not pass. " + passing + "% or more required.");
		}
	}
	
	function userStatus() {
		if (answeredPages[pageInProgress] == 1){
			answeredPages[pageInProgress] = 1;
			$("#status").text("Question has been answered");
			$("#status").show( "fast", function() {
				// Animation complete.
			});
		} else {
			answeredPages[pageInProgress] = 0;
			savePage();
		}
	
	}

	function updateDispay() {
			$("#correctScore").text(localStorage.scoreCorrectNero);
			$("#incorrectScore").text(localStorage.scoreIncorrectNero);
			savePage();
	}

	function scoreUpdate() {
		if (answeredPages[pageInProgress] == 1) {
			$("#status").text("Question has been answered");
			$("#status").show( "fast", function() {
				// Animation complete.
			});
		} else if (clicked == "1") {
			scoreCorrect++;
			localStorage.scoreCorrectNero = scoreCorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		} else if (clicked == "0") {
			scoreIncorrect++
			neroIncorrect.push(currentScreen);
			localStorage.setItem("neroIncorrect", JSON.stringify(neroIncorrect));
			localStorage.scoreIncorrectNero = scoreIncorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		}
	}

	function savePage() {
		localStorage.setItem("saveResponseNero", JSON.stringify(answeredPages));
	}

	function updateStatus(){
		answeredPages[pageInProgress] = 1;
		$("#status").text("Answered Submited");
		updateDispay();
	}
	
	//Triggers scoring of a users response
	$( "#accordion a" ).on( "click", function() {
	    clicked = $(this).attr('data-result');
		//alert(clicked);
		scoreUpdate();	
	});
	
	// Triggers relaunching the quiz from the results screen
	$( "#retake a").on( "click", function() {
		retakeLauncher();	
	});
	
	// Back to home screen
	$(".nav_home").on("click", function(){
		window.location.href = "../index.html";
	});
	
	//next page
	$(".next").on("click", function(){
		pageInProgress++
			window.location.href = pageInProgress+".html";
	});
	
	//previous page
	$(".previous").on("click", function(){
		pageInProgress--
		window.location.href = pageInProgress+".html";
	});

	function printIncorrect(){
		tempString = "<h2 style='color:red'><strong> Incorrect Questions: </strong> </h2> <h2> ";
		fileBaseArr = window.location.toString().split("/");
		fileBaseArr.pop();
		fileBaseString = fileBaseArr.join("/");
		for(i=0;i<neroIncorrect.length;i++){
			numString = neroIncorrect[i].toString();
			tempString += "<a target='_new' onclick='window.open(this.href); return false;' "
			tempString += "href=" + fileBaseString + "/" + numString + ".html>";
			tempString += (numString + " ");
			tempString += "</a>";
		}
		tempString += "</h2>"
		console.log(tempString);
		document.getElementById('incorrectDiv').innerHTML = tempString;
	}
