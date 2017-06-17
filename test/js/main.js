$(document).on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);
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