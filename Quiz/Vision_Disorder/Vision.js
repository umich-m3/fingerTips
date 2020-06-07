localStorage.scoreHiVision;
localStorage.saveResponseVision;

	// in page variables
	var scoreCorrect = localStorage.scoreCorrectVision;
	var scoreIncorrect = localStorage.scoreIncorrectVision;
	var visionIncorrect = JSON.parse(localStorage.getItem("visionIncorrect"));
	if(visionIncorrect == null){visionIncorrect = [];}
	var clicked = "cows";
	var answered = 0;
	var retrievedAnsweredPages = localStorage.getItem("saveResponseVision");
	console.log(localStorage.getItem("saveResponseVision"));
	var answeredPages = JSON.parse(retrievedAnsweredPages);
	var pageInProgress = document.location.href.match(/[^\/]+$/)[0].replace('.html','');
	var totalItems =  21; //localStorage.totalItems;
	var currentScreen = parseFloat(pageInProgress); //holds current screen number
	var percentGrade = (scoreCorrect/totalItems)*100; //calculate user percent score
	var passing = 80; //What is the passign percentage
	
	console.log(retrievedAnsweredPages);
	console.log( JSON.parse(localStorage.getItem("visionIncorrect")));
	// Sets scores to what is in local storage
	$("#correctScore").text(localStorage.scoreCorrectVision);
	$("#incorrectScore").text(localStorage.scoreIncorrectVision);
	$("#status").hide();
	$(".currentScreen").text(currentScreen);
	$(".totalScreens").text(totalItems);
	$("#percentGradereport").text(percentGrade.toFixed());
	gradeQuiz();

	$(document).ready(userStatus);
	
	/*
	if (!window.sessionStorage.getItem("isExecutedVision")) {
		localStorage.scoreCorrectVision = 0;
		localStorage.scoreIncorrectVision = 0;
		localStorage.saveResponseVision;
		var answeredPages = []
		localStorage.setItem("saveResponseVision", JSON.stringify(answeredPages));
		window.sessionStorage.setItem("isExecutedVision", true);
	}
	*/

	function retakeLauncher() {
		// Sets localStorage to zero to restart the quiz
		localStorage.scoreCorrectVision = 0;
		localStorage.scoreIncorrectVision = 0;
		localStorage.saveResponseVision;
		var answeredPages = [];
		var resetVision = [];
		localStorage.setItem("saveResponseVision", JSON.stringify(answeredPages));
		localStorage.setItem("visionIncorrect", JSON.stringify(resetVision));
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
			$("#correctScore").text(localStorage.scoreCorrectVision);
			$("#incorrectScore").text(localStorage.scoreIncorrectVision);
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
			localStorage.scoreCorrectVision = scoreCorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		} else if (clicked == "0") {
			scoreIncorrect++;
			visionIncorrect.push(currentScreen);
			localStorage.setItem("visionIncorrect", JSON.stringify(visionIncorrect));
			localStorage.scoreIncorrectVision = scoreIncorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		}
	}

	function savePage() {
		localStorage.setItem("saveResponseVision", JSON.stringify(answeredPages));
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
		for(i=0;i<visionIncorrect.length;i++){
			numString = visionIncorrect[i].toString();
			tempString += "<a target='_new' onclick='window.open(this.href); return false;' "
			tempString += "href=" + fileBaseString + "/" + numString + ".html>";
			tempString += (numString + " ");
			tempString += "</a>";
		}
		tempString += "</h2>"
		console.log(tempString);
		document.getElementById('incorrectDiv').innerHTML = tempString;
	}
