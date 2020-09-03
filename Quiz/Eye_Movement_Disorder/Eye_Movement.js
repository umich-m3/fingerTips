localStorage.scoreHiEye;
localStorage.saveResponseEye;

	// in page variables
	var scoreCorrect = localStorage.scoreCorrectEye;
	var scoreIncorrect = localStorage.scoreIncorrectEye;
	var eyeIncorrect = JSON.parse(localStorage.getItem("eyeIncorrect"));
	if(eyeIncorrect == null){eyeIncorrect = [];}
	var clicked = "co";
	var answered = 0;
	var retrievedAnsweredPages = localStorage.getItem("saveResponseEye");
	//console.log(localStorage.getItem("saveResponseVision"));
	var answeredPages = JSON.parse(retrievedAnsweredPages);
	var pageInProgress = document.location.href.match(/[^\/]+$/)[0].replace('.html','');
	var totalItems =  23; //localStorage.totalItems;
	var currentScreen = parseFloat(pageInProgress); //holds current screen number
	var percentGrade = (scoreCorrect/totalItems)*100; //calculate user percent score
	var passing = 80; //What is the passign percentage
	
	console.log(retrievedAnsweredPages);
	console.log( JSON.parse(localStorage.getItem("eyeIncorrect")));
	// Sets scores to what is in local storage
	$("#correctScore").text(localStorage.scoreCorrectEye);
	$("#incorrectScore").text(localStorage.scoreIncorrectEye);
	$("#status").hide();
	$(".currentScreen").text(currentScreen);
	$(".totalScreens").text(totalItems);
	$("#percentGradereport").text(percentGrade.toFixed());
	gradeQuiz();

	$(document).ready(userStatus);

	/*
	if (!window.sessionStorage.getItem("isExecutedEye")) {
		localStorage.scoreCorrectEye = 0;
		localStorage.scoreIncorrectEye = 0;
		localStorage.saveResponseEye;
		var answeredPages = []
		localStorage.setItem("saveResponseEye", JSON.stringify(answeredPages));
		window.sessionStorage.setItem("isExecutedEye", true);
		
	}
	*/

	
	function retakeLauncher() {
		// Sets localStorage to zero to restart the quiz
		localStorage.scoreCorrectEye = 0;
		localStorage.scoreIncorrectEye = 0;
		localStorage.saveResponseEye;
		var answeredPages = [];
		var resetEye = [];
		localStorage.setItem("saveResponseEye", JSON.stringify(answeredPages));
		localStorage.setItem("eyeIncorrect", JSON.stringify(resetEye));
		document.location.href='1.html';
		
	}
	
	// Resets first page if either score is null
	function resetIfEmpty(){
		if(scoreCorrect == null || scoreIncorrect == null){
			console.log("reset");
			retakeLauncher();
		}
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
			$("#correctScore").text(localStorage.scoreCorrectEye);
			$("#incorrectScore").text(localStorage.scoreIncorrectEye);
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
			//alert("Correct");
			localStorage.scoreCorrectEye = scoreCorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		} else if (clicked == "0") {
			scoreIncorrect++
			//alert("Incorrect");
			eyeIncorrect.push(currentScreen);
			localStorage.setItem("eyeIncorrect", JSON.stringify(eyeIncorrect));
			localStorage.scoreIncorrectEye = scoreIncorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		}
	}

	function savePage() {
		localStorage.setItem("saveResponseEye", JSON.stringify(answeredPages));
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
		for(i=0;i<eyeIncorrect.length;i++){
			numString = eyeIncorrect[i].toString();
			tempString += "<a target='_new' onclick='window.open(this.href); return false;' "
			tempString += "href=" + fileBaseString + "/" + numString + ".html>";
			tempString += (numString + " ");
			tempString += "</a>";
		}
		tempString += "</h2>"
		console.log(tempString);
		document.getElementById('incorrectDiv').innerHTML = tempString;
	}
