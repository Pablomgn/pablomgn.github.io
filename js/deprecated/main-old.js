$(document).ready(function() {

// ***********
// MENU MOBILE
// ***********

  var tlMainMenu = new TimelineMax();
  var isMenu = false;

  $( "#burger-wrapper" ).click(function() {
    menuIn ();
  });

  tlMainMenu
    .staggerTo($("span", "#open-burger"), 0.005, { width: "0%", ease: Power4.easeInOut }, 0.08, 0)
    .to($("#main-nav"), 0.8, { height: "100vh", ease: Power4.easeInOut }, 0)
    .staggerFrom($("span", "#closed-burger"), 0.005, { width: "0%", ease: Power4.easeInOut }, 0.08, "-=0.4");

    tlMainMenu.stop();


  function menuIn (){
    if (isMenu==false){
      // menuEasing = Expo.easeout;
      tlMainMenu.play();
      isMenu = true;
    } else {
      // menuEasing = Expo.easein;
      tlMainMenu.reverse();
      isMenu = false;
    }
  }

  // ******************
  // Rest of Animations
  // ******************


  var controller = new ScrollMagic.Controller();

  // Hero Image Appears

  var heroImageReveal = new TimelineMax();

  $(".hero-section").append('<div class="revealing-block"></div>');

  var topMenu = $(".top-menu");
  var revealingBlock = $(".revealing-block", ".hero-section");
  var innerImage = $(".bcg", ".hero-section");
  var innerText = $(".hero-wrapper", ".hero-section");
  var tlBlockReveal = new TimelineMax();

  heroImageReveal
                .to(innerImage, 0, { opacity: 0 })
                .to(innerText, 0, { opacity: 0, ease: Expo.easeOut })
                .to(revealingBlock, 0.5, { width: '100%', ease: Expo.easeOut }, "+=0.5")
                .to(innerImage, 0.2, { opacity: 1, ease: Expo.easeOut }, "-=0.1")
                .to(revealingBlock, 0.5, { left: '100%', ease: Expo.easeOut }, "-=0.1")
                .to(revealingBlock, 0.5, { width: '0%', ease: Expo.easeOut }, "-=0.1")
                .fromTo (topMenu, 1, { top: "-100%"}, { top: "0%", ease: Expo.easeOut }, "-=0.5")
                .add('text',"+=0.0")
                .from(innerText, 1, { y: "+5%", ease: Expo.easeOut, onComplete: function() { allowSlideTextOpacity();}},"text")
                .to(innerText, 1, { opacity: 1, ease: Expo.easeOut },"text");


//Parallax
  var slideParallaxScene = new ScrollMagic.Scene({
      triggerElement: ".hero-section",
      triggerHook: 0,
      duration: "100%"

    })
    .setTween(TweenMax.to('.bcg', 1, {
      y: '+30%',
      ease: Power0.easeNone
    }))
    // .addIndicators({
    //   name: "parallax",
    //   colorTrigger: "red",
    // })
    .addTo(controller);

    function allowSlideTextOpacity() {

      $(".hero-wrapper").css("transform", "");

      var slideTextOpacity = new ScrollMagic.Scene({
          triggerElement: ".hero-section",
          triggerHook: 0,
          duration: "30%"
        })
        .setTween(TweenMax.to('.hero-wrapper', 1, {
          opacity: '0',
          ease: Power0.easeNone
        }))
        .addTo(controller);
  }


    var fadeInIntro = new ScrollMagic.Scene({
        triggerElement: "#introText",
        triggerHook: 0.7,
        reverse: false

      })
      .setTween(TweenMax.from("#introText", 1, {
        opacity: '0',
        y: '10%',
        ease: Expo.easeOut
      }))
      .addTo(controller);

  $('.content-block').each(function() {
  if ($(this).not('#introText')) {
    $(".image-container", this).append('<div class="revealing-block"></div>');

    var revealingBlock = $(".revealing-block", this);
    var innerImage = $("img", this);
    var outsideText = $(".text-wrapper", this);
    var tlBlockReveal = new TimelineMax();

    tlBlockReveal
                  .to(innerImage, 0, { opacity: 0 })
                  .to(outsideText, 0, { opacity: 0, ease: Expo.easeOut })
                  .to(revealingBlock, 0.5, { width: '100%', ease: Expo.easeOut })
                  .to(innerImage, 0.2, { opacity: 1, ease: Expo.easeOut }, "-=0.1")
                  .to(revealingBlock, 0.5, { left: '100%', ease: Expo.easeOut }, "-=0.1")
                  .to(revealingBlock, 0.5, { width: '0%', ease: Expo.easeOut }, "-=0.1")
                  .fromTo(outsideText, 1, { y: "+10%", opacity: 0}, { y: "0%", opacity: 1, ease: Expo.easeOut},"-=0.5");

    var fadeInContent = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.7,
        reverse: false
      })
      .setTween(tlBlockReveal)
      .addTo(controller);
  }
  });

  //*************************************
  // Add smooth scrolling to anchor links
  //*************************************

  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  //*************************
  // Delay external page load
  //*************************

  $("a").click(function(e) {
    e.preventDefault(); // prvent default behavior
    var goTo = this.getAttribute("href"); // store anchor href

    setTimeout(function() {
      window.location = goTo;
    }, 1000);
  });

  //***********
  // JQuery End
  //***********

});
