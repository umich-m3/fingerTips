// JavaScript Document
 <!--Save accordian state--> 
  var docTitle = document.title;
  var parts = docTitle.split(':');
  var myTitle = parts[0]; 
  var expAccordion = jQuery.parseJSON(localStorage.getItem("expAcc"));


 $(document).ready(function () {
	if (expAccordion) {
		$('.panel-collapse').collapse('show');
	} 
	else {
		var last=sessionStorage.getItem(myTitle);
		if (last!=null) {
		//remove default collapse settings
		$("#accordion .collapse").removeClass('in');
		//show the last visible group
		$("#"+last).collapse("show");
	}
		
	};

	
	//when a group is shown, save it as the active accordion group
    $("#accordion").on('shown.bs.collapse', function () {
      var active = $("#accordion .in").attr('id');
	  		 sessionStorage.setItem(myTitle,active);
    });
    $("#accordion").on('hidden.bs.collapse', function () {
      sessionStorage.removeItem(myTitle); 
    });
    
    <!-- Delete sessionStorage when use offcanvas menu -->
    $("#sectionmenu a").click(function(e) {
      sessionStorage.removeItem(myTitle); 
			});

	<!-- Delete sessionStorage before going back -->
    $("#goBack").click(function(e) {
      sessionStorage.removeItem(myTitle); 
			});
			
});