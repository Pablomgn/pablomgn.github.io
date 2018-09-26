$(document).ready(function() {

  var tl404 = new TimelineMax();

  $(".wrapper").append('<div class="revealing-block"></div>');

  var revealingBlock = $(".revealing-block");
  var title404 = $("h1");
  var upperText = $("p");
  var button = $("#goHome");
  var tlBlockReveal = new TimelineMax();

  tl404
                .to(title404, 0, { opacity: 0 })
                .to(button, 0, { opacity: 0, ease: Expo.easeOut })
                .to(revealingBlock, 0.5, { width: '100%', ease: Expo.easeOut }, "+=0.5")
                .to(title404, 0.2, { opacity: 1, ease: Expo.easeOut }, "-=0.1")
                .to(revealingBlock, 0.5, { left: '100%', ease: Expo.easeOut }, "-=0.1")
                .to(revealingBlock, 0.5, { width: '0%', ease: Expo.easeOut }, "-=0.1")
                .fromTo(upperText, 1, {opacity: 0, y: "+30%"}, {opacity: 1, y: "0%", ease: Expo.easeOut})
                .fromTo(button, 1, {opacity: 0, y: "+30%"}, {opacity: 1, y: "0%", ease: Expo.easeOut});


  });
