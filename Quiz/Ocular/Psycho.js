localStorage.scoreHi;
localStorage.saveResponse;

	// in page variables
	var scoreCorrect = localStorage.scoreCorrect1;
	var scoreIncorrect = localStorage.scoreIncorrect;
	var clicked = "cow";
	var answered = 0;
	var psychoIncorrect = JSON.parse(localStorage.getItem("psychoIncorrect"));
	if(psychoIncorrect == null){psychoIncorrect = [];}
	var retrievedAnsweredPages = localStorage.getItem("saveResponse");
	console.log(localStorage.getItem("saveResponse"));
	var answeredPages = JSON.parse(retrievedAnsweredPages);
	var pageInProgress = document.location.href.match(/[^\/]+$/)[0].replace('.html','');
	var totalItems =  36; //localStorage.totalItems;
	var currentScreen = parseFloat(pageInProgress); //holds current screen number
	var percentGrade = (scoreCorrect/totalItems)*100; //calculate user percent score
	var passing = 80; //What is the passign percentage
	
	console.log(retrievedAnsweredPages);
	console.log( JSON.parse(localStorage.getItem("psychoIncorrect")));
	// Sets scores to what is in local storage
	$("#correctScore").text(localStorage.scoreCorrect1);
	$("#incorrectScore").text(localStorage.scoreIncorrect);
	$("#status").hide();
	$(".currentScreen").text(currentScreen);
	$(".totalScreens").text(totalItems);
	$("#percentGradereport").text(percentGrade.toFixed());
	gradeQuiz();

	/*
	if (!window.sessionStorage.getItem("isExecuted")) {
		localStorage.scoreCorrect1 = 0;
		localStorage.scoreIncorrect = 0;
		localStorage.saveResponse;
		var answeredPages = []
		localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
		window.sessionStorage.setItem("isExecuted", true);
		
	}
	*/

	$(document).ready(userStatus);
	
	function retakeLauncher() {
		// Sets localStorage to zero to restart the quiz
		localStorage.scoreCorrect1 = 0;
		localStorage.scoreIncorrect = 0;
		localStorage.saveResponse;
		var answeredPages = [];
		var resetPsycho = [];
		localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
		localStorage.setItem("psychoIncorrect", JSON.stringify(resetPsycho));
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
			$("#correctScore").text(localStorage.scoreCorrect1);
			$("#incorrectScore").text(localStorage.scoreIncorrect);
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
			localStorage.scoreCorrect1 = scoreCorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		} else if (clicked == "0") {
			scoreIncorrect++;
			psychoIncorrect.push(currentScreen);
			localStorage.setItem("psychoIncorrect", JSON.stringify(psychoIncorrect));
			localStorage.scoreIncorrect = scoreIncorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		}
	}

	function savePage() {
		localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
	}

	function updateStatus(){
		answeredPages[pageInProgress] = 1;
		$("#status").text("Answered Submited");
		updateDispay();
	}
	
	//Triggers scoring of a users response
	$( "#accordion a" ).on( "click", function() {
	    clicked = $(this).attr('data-result');
		//alert("click");
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
		for(i=0;i<psychoIncorrect.length;i++){
			numString = psychoIncorrect[i].toString();
			tempString += "<a target='_new' onclick='window.open(this.href); return false;' "
			tempString += "href=" + fileBaseString + "/" + numString + ".html>";
			tempString += (numString + " ");
			tempString += "</a>";
		}
		tempString += "</h2>"
		console.log(tempString);
		document.getElementById('incorrectDiv').innerHTML = tempString;
	}

