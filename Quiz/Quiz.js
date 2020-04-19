if (!window.sessionStorage.getItem("isExecutedVision")) {
    localStorage.scoreCorrectVision = 0;
    localStorage.scoreIncorrectVision = 0;
    localStorage.saveResponseVision;
    //var answeredPages = []
    localStorage.setItem("saveResponseVision", JSON.stringify(answeredPages));
    window.sessionStorage.setItem("isExecutedVision", true);
}

if (!window.sessionStorage.getItem("isExecuted")) {
    localStorage.scoreCorrect1 = 0;
    localStorage.scoreIncorrect = 0;
    localStorage.saveResponse;
    //var answeredPages = []
    localStorage.setItem("saveResponse", JSON.stringify(answeredPages));
    window.sessionStorage.setItem("isExecuted", true);
    
}

if (!window.sessionStorage.getItem("isExecutedEye")) {
    localStorage.scoreCorrectEye = 0;
    localStorage.scoreIncorrectEye = 0;
    localStorage.saveResponseEye;
    //var answeredPages = []
    localStorage.setItem("saveResponseEye", JSON.stringify(answeredPages));
    window.sessionStorage.setItem("isExecutedEye", true);
    
}

if (!window.sessionStorage.getItem("isExecutedNero")) {
    localStorage.scoreCorrectNero = 0;
    localStorage.scoreIncorrectNero = 0;
    localStorage.saveResponseNero;
    //var answeredPages = []
    localStorage.setItem("saveResponseNero", JSON.stringify(answeredPages));
    window.sessionStorage.setItem("isExecutedNero", true);
    
}