
var $root = $('html, body');
$('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});

/*$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30
});*/

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});

$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitColumns'
});

// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('#startchange');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".navbar-inverse").css('background-color', '#f0f0f0');
       } else {
          $('.navbar-inverse').css('background-color', 'transparent');
       }
   });
    }
});

$('a').click(function(event){
  event.preventDefault()
  // run code

})
