// JavaScript Document
//<!-- Image modal scripting -->

  $('li a').click(function(e) {
  $('#imgModal img').attr('src', $(this).attr('data-img-url')); 
  });

//<!-- Video modal scripting -->
$(document).ready(function(){
  PlayYouTubeModal();
});
 //FUNCTION TO GET YOUTUBE VIDEO FROM DATATAG
function PlayYouTubeModal(){
  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function() {
    var theModal = $(this).data( "target" ),
    videoSRC = $(this).attr( "data-theVideo" );
    $(theModal+' iframe').attr('src', videoSRC);
    $(theModal).on('hidden.bs.modal', function () {
    $(theModal+' iframe').removeAttr('src');
	
});   
  });
}
