
//============counter============
$(document).ready(function(){  
$('.counter span').each( function() {
  var $this = $(this),
  countTo = $this.attr('data-to');
  $({ countNum: $this.text()}).animate({
    countNum: countTo
    },
  {
    duration: 3000,
    easing:'linear',
    step: function() {
      $this.text(Math.ceil(this.countNum));			
    },
      })  
})
})