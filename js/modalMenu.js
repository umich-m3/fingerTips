
function openCloseNav() {
  let width = window.screen.width;
  let element = document.getElementById("mySidenav");

  if (element.style.width == "250px" || element.style.width=="125px") {element.style.width = "0px";} 
  else if(width > 450){element.style.width = "250px";}
  else{element.style.width = "125px";}

  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function modalBoxInOut(){
    $(".hoverMe").mouseover(function(){
      $(".boxHidden").css("visibility","visible")
    });

    $(".hoverMe").mouseout(function(){
      $(".boxHidden").css("visibility","hidden")
    });

    $(".hoverMe2").mouseover(function(){
      $(".boxHidden2").css("visibility","visible")
    });

    $(".hoverMe2").mouseout(function(){
      $(".boxHidden2").css("visibility","hidden")
    });

    $(".hoverMe3").mouseover(function(){
      $(".boxHidden3").css("visibility","visible")
    });

    $(".hoverMe3").mouseout(function(){
      $(".boxHidden3").css("visibility","hidden")
    });

    $(".hoverMe4").mouseover(function(){
      $(".boxHidden4").css("visibility","visible")
    });

    $(".hoverMe4").mouseout(function(){
      $(".boxHidden4").css("visibility","hidden")
    });

    $(".hoverMe5").mouseover(function(){
      $(".boxHidden5").css("visibility","visible")
    });

    $(".hoverMe5").mouseout(function(){
      $(".boxHidden5").css("visibility","hidden")
    });

    $(".hoverMe6").mouseover(function(){
      $(".boxHidden6").css("visibility","visible")
    });

    $(".hoverMe6").mouseout(function(){
      $(".boxHidden6").css("visibility","hidden")
    });

    $(".hoverMe7").mouseover(function(){
      $(".boxHidden7").css("visibility","visible")
    });

    $(".hoverMe7").mouseout(function(){
      $(".boxHidden7").css("visibility","hidden")
    });

    $(".hoverMe8").mouseover(function(){
      $(".boxHidden8").css("visibility","visible")
    });

    $(".hoverMe8").mouseout(function(){
      $(".boxHidden8").css("visibility","hidden")
    });

    $(".hoverMe9").mouseover(function(){
      $(".boxHidden9").css("visibility","visible")
    });

    $(".hoverMe9").mouseout(function(){
      $(".boxHidden9").css("visibility","hidden")
    });

    $(".hoverMe10").mouseover(function(){
      $(".boxHidden10").css("visibility","visible")
    });

    $(".hoverMe10").mouseout(function(){
      $(".boxHidden10").css("visibility","hidden")
    });

    $(".hoverMe11").mouseover(function(){
      $(".boxHidden11").css("visibility","visible")
    });

    $(".hoverMe11").mouseout(function(){
      $(".boxHidden11").css("visibility","hidden")
    });

    $(".hoverMe12").mouseover(function(){
      $(".boxHidden12").css("visibility","visible")
    });

    $(".hoverMe12").mouseout(function(){
      $(".boxHidden12").css("visibility","hidden")
    });

  }
  
 

modalBoxInOut();



