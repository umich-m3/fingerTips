localStorage.scoreHi;
localStorage.saveResponse;

	// in page variables
	var scoreCorrect = localStorage.scoreCorrect;
	var scoreIncorrect = localStorage.scoreIncorrect;
	var clicked = "cow";
	var answered = 0;
	var retrievedAnsweredPages = localStorage.getItem("saveResponse");
	var answeredPages = JSON.parse(retrievedAnsweredPages);
	var pageInProgress = document.location.href.match(/[^\/]+$/)[0].replace('.html','');
	var totalItems =  26; //localStorage.totalItems;
	var currentScreen = parseFloat(pageInProgress)+1;
	var percentGrade = (scoreCorrect/totalItems)*100;
	var passing = 80;
	
	// Sets scores to what is in local storage
	$("#correctScore").text(localStorage.scoreCorrect);
	$("#incorrectScore").text(localStorage.scoreIncorrect);
	$("#status").hide();
	$(".currentScreen").text(currentScreen);
	$(".totalScreens").text(totalItems);
	$("#percentGradereport").text(percentGrade.toFixed());
	gradeQuiz();

	$(document).ready(userStatus);
	
	//alert("pageInProgress " + pageInProgress);
	//alert("answeredPages " + answeredPages);
	//alert("answeredPages[pageInProgress] " + answeredPages[pageInProgress]);
	
	
	function retakeLauncher() {
		// Sets localStorage to zero on the intial start of a quiz module
		localStorage.scoreCorrect = 0;
		localStorage.scoreIncorrect = 0;
		localStorage.saveResponse;
		var answeredPages = []
		localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
		document.location.href='0.html';
	}
	
	function gradeQuiz() {
		if (percentGrade > passing) {
			$("#grading").text("Passed");
		} else { 
			$("#grading").text("Did not pass. 80% or more required.");
		}
	}
	
	function userStatus() {
		if (answeredPages[pageInProgress] == 1){
			//alert("userStatus a");
			answeredPages[pageInProgress] = 1;
			$("#status").text("Question has been answered");
			$("#status").show( "fast", function() {
				// Animation complete.
			});
		} else {
			//alert("userStatus b");
			answeredPages[pageInProgress] = 0;
			//alert("answeredPages[pageInProgress] " + answeredPages[pageInProgress]);
			savePage();
		}
	
	}

	function updateDispay() {
		//alert("updateDispay a");
			$("#correctScore").text(localStorage.scoreCorrect);
			$("#incorrectScore").text(localStorage.scoreIncorrect);
			savePage();
	}

	function scoreUpdate() {
		if (answeredPages[pageInProgress] == 1) {
			//alert("scoreUpdate a");
			$("#status").text("Question has been answered");
			$("#status").show( "fast", function() {
				// Animation complete.
			});
		} else if (clicked == "1") {
			//alert("scoreUpdate b");
			//alert(answeredPages[pageInProgress]);
			scoreCorrect++;
			localStorage.scoreCorrect = scoreCorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		} else if (clicked == "0") {
			//alert("scoreUpdate c");
			//alert(answeredPages[pageInProgress]);
			scoreIncorrect++
			localStorage.scoreIncorrect = scoreIncorrect;
			answered++;
			percentGrade == ((scoreCorrect/totalItems)*100);
			updateStatus();
		}
	}

	function savePage() {
		localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
		//alert("savePage");
	}

	function updateStatus(){
		answeredPages[pageInProgress] = 1;
		$("#status").text("Answered Submited");
		updateDispay();
	}

	$( "#accordion a" ).on( "click", function() {
	    clicked = $(this).attr('data-result');
		//alert("click");
		scoreUpdate();	
	});
	
	$( "#retake a").on( "click", function() {
		retakeLauncher();	
	});
	
	$(".nav_home").on("click", function(){
		window.location.href = "../index.html";
	});
	
	$(".next").on("click", function(){
		pageInProgress++
			window.location.href = pageInProgress+".html";
	});
	
	$(".previous").on("click", function(){
		pageInProgress--
		window.location.href = pageInProgress+".html";
	});