//******************
// IE detector
//******************


if (document.documentElement.lang === "es") {
  var IeWarningHeader = "Esta web no admite Internet Explorer";
  var IeWarningText = "Por favor, utiliza un navegador moderno como Google Chrome, Mozilla Firefox or Microsoft Edge.";
  var IeWarningLink = "Más información";
} else {
  var IeWarningHeader = "This web does not support Internet Explorer";
  var IeWarningText = "Please, use a modern browser like Google Chrome, Mozilla Firefox or Microsoft Edge.";
  var IeWarningLink = "More info";
}


if (IE10orBelow() < 9) {
  document.body.innerHTML = "<html> <body> <div class='container'> <img src='img/warning.gif'> <div class='content' id='content'><b>" + IeWarningHeader + IE10orBelow() + "</b><br/><br/>" + IeWarningText + "</br></br><a style='text-align: center;'href='https://browsehappy.com/'><b>" + "+ " + IeWarningLink + "</b></a></div> <style> html, body { margin: 0; padding: 0; width: 100%; height: 100%; display: table; background: black; } .container { position: absolute; top: 50px; left: 50%; width: 500px; margin-left: -250px; /* half the box width */ } .content { background-color: white; color: black; display: inline-block; text-align: left; font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif; padding: 10px; } </style> </body> </html>";
}

function IE10orBelow() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
}

//******************
// Scripts
//******************

$(document).ready(function() {

  Barba.Pjax.start();
  Barba.Prefetch.init();
  animateOnLoad();

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {

      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {

      $("body").append("<div class='page-transition'></div>");

      var tlBlockpage = new TimelineMax();
      var pageTransitionBlock = $(".page-transition");

      tlBlockpage

        .to(pageTransitionBlock, 0.5, {
          width: '100%',
          ease: Expo.easeOut
        })
        .to(this.oldContainer, 0.2, {
          opacity: 0,
          ease: Expo.easeOut
        }, "-=0.1")
        .to(pageTransitionBlock, 0.5, {
          left: '100%',
          ease: Expo.easeOut
        }, "-=0.1");

      return $(this.oldContainer).animate({
        opacity: 0
      }).promise();


    },

    fadeIn: function() {

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 1
      });

      $("html, body").animate({
        scrollTop: 0
      }, "fast");

      animateOnLoad();

      setTimeout(function() {
        _this.done();
      }, 500);

    }
  });


  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  function animateOnLoad() {
    var isMenu = false;

    // ***********
    // MENU MOBILE
    // ***********

    var tlMainMenu = new TimelineMax();

    $(".burger-wrapper").click(function() {
      menuIn();
    });

    var menuLinks = $('li', '.main-nav');
    menuLinks.click(function() {
      menuIn();
    });

    tlMainMenu
      .staggerTo($("span", ".open-burger"), 0.005, {
        width: "0%",
        ease: Power4.easeInOut
      }, 0.08, 0)
      .to($(".main-nav"), 0.8, {
        height: "100vh",
        ease: Power4.easeInOut
      }, 0)
      .staggerFrom($("span", ".closed-burger"), 0.005, {
        width: "0%",
        ease: Power4.easeInOut
      }, 0.08, "-=0.35");

    tlMainMenu.stop();


    function menuIn() {
      if (isMenu == false) {
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
    var menuBackground = $(".menu-background");
    var topMenu = $(".top-menu");

    var innerImage = $(".bcg", ".hero-section");
    var innerText = $(".hero-wrapper", ".hero-section");
    var cookieWarning = $(".cookie-warning");


    heroImageReveal
      .from(innerImage, 0.7, {
        width: "0%",
        ease: Expo.easeout
      })
      .to(innerText, 0, {
        opacity: 0,
        ease: Expo.easeOut
      }, 0)
      .fromTo(menuBackground, 1, {
        top: "-100%"
      }, {
        top: "0%",
        ease: Expo.easeOut
      }, 0.25)
      .fromTo(topMenu, 1, {
        top: "-100%"
      }, {
        top: "0%",
        ease: Expo.easeOut
      }, 0.25)
      .add('text', "-=0.2")
      .from(innerText, 1, {
        y: "-5%",
        ease: Expo.easeOut,
        onComplete: function() {
          allowSlideTextOpacity();
        }
      }, "text")
      .to(innerText, 1, {
        opacity: 0.99,
        ease: Expo.easeOut
      }, "text")
      .to(cookieWarning, 1, {
        opacity: 1,
        ease: Expo.easeOut,
      });


    //*************************
    // Home page animations
    //*************************

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
      .addTo(controller);

    // Change opacity of welcome text on slide

    function allowSlideTextOpacity() {

      $(".hero-wrapper").css("transform", "");

      var slideTextOpacity = new ScrollMagic.Scene({
          triggerElement: ".hero-section",
          triggerHook: 0,
          duration: "20%"
        })
        .setTween(TweenMax.to('.hero-wrapper', 1, {
          opacity: '0',
          ease: Power0.easeNone
        }))
        .addTo(controller);
    }

    // H1 Animation
    $('h1', 'main').each(function() {
      var fadeInTitle = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.70,
          reverse: false
        })
        .setTween(TweenMax.from(this, 1, {
          opacity: 0,
          y: '+10%',
          ease: Expo.easeOut,
          delay: 0.3
        }))
        .addTo(controller);
    });

    // Animate each service card

    $('.small-card').each(function() {
      $(this).append('<div class="revealing-block"></div>');

      var tlSrBlockReveal = new TimelineMax();
      var srRevealingBlock = $(".revealing-block", ".small-card");
      var srCard = $(this);
      var srCardColor = srCard.css('background-color');
      var srIcon = $(".big-icon", this);
      var srTitle = $("h3", this);
      var srText = $("p", this);

      tlSrBlockReveal
        .to(srCard, 0, {
          backgroundColor: "white"
        })
        .to(srRevealingBlock, 0.35, {
          width: '100%',
          ease: Expo.easeOut
        })
        .to(srCard, 0.1, {
          backgroundColor: srCardColor
        })
        .to(srRevealingBlock, 0.5, {
          left: '100%',
          ease: Expo.easeOut
        })
        .set(srIcon, {
          className: "big-icon draw-animation"
        }, "-=0.5")
        .from(srTitle, 1, {
          opacity: '0',
          y: '10%',
          ease: Expo.easeOut
        }, "-=0.5")
        .from(srText, 1, {
          opacity: '0',
          y: '10%',
          ease: Expo.easeOut
        }, "-=0.8");


      var fadeInContent = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.7,
          reverse: false
        })
        .setTween(tlSrBlockReveal)
        .addTo(controller);
    });

    // Animate each project card

    $('.project-card').each(function() {
      $(".image-container", this).append('<div class="revealing-block"></div>');

      var revealingBlock = $(".revealing-block", ".image-container");
      var innerImage = $("img", this);
      var outsideText = $(".text-wrapper", this);
      var tlBlockReveal = new TimelineMax();

      tlBlockReveal
        .to(innerImage, 0, {
          opacity: 0
        })
        .to(outsideText, 0, {
          opacity: 0,
          ease: Expo.easeOut
        })
        .to(revealingBlock, 0.35, {
          width: '100%',
          ease: Expo.easeOut
        })
        .to(innerImage, 0.2, {
          opacity: 1,
          ease: Expo.easeOut
        }, "-=0.1")
        .to(revealingBlock, 0.5, {
          left: '100%',
          ease: Expo.easeOut
        }, "-=0.1")
        .fromTo(outsideText, 1, {
          y: "+10%",
          opacity: 0
        }, {
          y: "0%",
          opacity: 1,
          ease: Expo.easeOut
        }, "-=0.2");


      var fadeInContent = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.7,
          reverse: false
        })
        .setTween(tlBlockReveal)
        .addTo(controller);
    });

    // CONTACT

    var contactText = $(".main-wrapper", ".color-panel");
    var fadeInContact = new ScrollMagic.Scene({
        triggerElement: ".color-panel",
        triggerHook: 0.8,
        reverse: false
      })
      .setTween(TweenMax.from(contactText, 1, {
        opacity: 0,
        y: '+10%',
        ease: Expo.easeOut
      }))
      .addTo(controller);


    // // Black-Bar inside contact
    // var tlBlackBar = new TimelineMax();
    // var mainColor = $(".color-panel").css('background-color');
    // var navLinks = $("a","nav",".top-menu");
    // var imagotype = $(".imagotype");
    //
    // tlBlackBar
    // .to(navLinks, 0.35,{className: "block-hover negative"},0)
    // .to(imagotype, 0.35,{className: "imagotype block-hover negative"},0)
    // .to(menuBackground, 0.35, { backgroundColor: mainColor, ease: Power4.easeInOut }, 0);
    //
    // var changeNavColor = new ScrollMagic.Scene({
    //     triggerElement: ".color-panel",
    //     triggerHook: 0.1,
    //   })
    //   .setTween(tlBlackBar)
    //   .addTo(controller);


    //*************************
    // Effects inside project
    //*************************

    // Fade in image header

    $(".project-header", ".project").append('<div class="revealing-block"></div>');

    var prRevealingBlock = $(".revealing-block", ".project");
    var prInnerImage = $("img", ".project");
    var prOutsideText = $(".text-wrapper", ".project");
    var prPostContent = $(".content-wrapper");
    var tlPrBlockReveal = new TimelineMax();


    tlPrBlockReveal
      .to(prInnerImage, 0, {
        opacity: 0
      })
      .to(prOutsideText, 0, {
        opacity: 0,
        ease: Expo.easeOut
      })
      .to(prRevealingBlock, 0.5, {
        width: '100%',
        ease: Expo.easeOut
      }, "+=0.5")
      .to(prInnerImage, 0.2, {
        opacity: 1,
        ease: Expo.easeOut
      }, "-=0.1")
      .to(prRevealingBlock, 0.3, {
        left: '100%',
        ease: Expo.easeOut
      }, "-=0.2")
      .from(prPostContent, 1, {
        opacity: '0',
        y: '10%',
        ease: Expo.easeOut
      }, "-=0.4");


    //*************************************
    // Add smooth scrolling to anchor links
    //*************************************

    var $root = $('html, body');

    $('a[href^="#"]').click(function() {
      var href = $.attr(this, 'href');

      $root.animate({
        scrollTop: $(href).offset().top
      }, 1600, 'easeInOutQuart', function() {});

    });

  }

  //***************************
  // MISC
  //***************************

  console.log("%cPeeking around, huh?", "color: black; font-family: Archia, sans-serif; font-size: 2.5em; font-weight: bolder; 1px 1px;");
  console.log("%cIf you have any questions or see anything wrong with the web, send me an email!", "color: black; font-family: sans-serif; font-size: 1.5em; font-weight: normal; 1px 1px;");

  //***************************
  // COOKIES
  //***************************

  var cookieWarning = $(".cookie-warning");

  if ($.cookie('CONSENT')) {
    cookieWarning.remove();
  } else {

    $(".cookie-warning").removeClass("hidden");

    var cookieTl = new TimelineMax();

    cookieTl
      .from(cookieWarning, 1, {
        bottom: "-100%",
        ease: Expo.easeOut
      }, "=+4");

    $(".consent-button").click(function() {
      giveConsent();
    });

    window['ga-disable-UA-125435154-1'] = true;

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-125435154-1']);
    _gaq.push(['_trackPageview']);
  }

  function giveConsent() {
    cookieTl.reverse();
    $.cookie("CONSENT", "1", {
      path: '/',
      expires: 365
    });
    console.log($.cookie("CONSENT"));
    window['ga-disable-UA-125435154-1'] = false;
    //...snip...
    //set a cookie to express that the user has opted-in to tracking, for future pageviews
    _gaq.push(['_trackPageview']); // now run the pageview that you 'missed
  }


  //*****************************
  // PRELOADER
  //*****************************

  var preloader = $('.preloader');
  var isPreloading = true;

  window.onload = function() {
    TweenMax.to($(preloader), 1, {
      left: "100%",
      ease: Expo.easeOut,
      onComplete: function() {
        $(preloader).remove();
        var isPreloading = false;
      }
    });
  };

  var preloaderTime;

  if ($.cookie('LANGUAGE')) {
    preloaderTime = 300;
  } else {
    preloaderTime = 1500;
  }
  setTimeout(function() {
    if (isPreloading === true) {
      TweenMax.to($(preloader), 1, {
        left: "100%",
        ease: Expo.easeOut,
        onComplete: function() {
          $(preloader).remove();
          var isPreloading = false;
        }
      });
    }
  }, preloaderTime);



  //*****************************
  // SNIPPETS
  //*****************************

  //Update Google analytics

  Barba.Dispatcher.on('initStateChange', function() {
    ga('send', 'pageview', location.pathname);
  });


  //Display Age

  function getAge(bornYear) {
    now = new Date();
    theYear = now.getYear();
    if (theYear < 1900) {
      theYear = theYear + 1900;
    }
    age = theYear - bornYear;
    return age;
  }

  $('.getAge').each(function() {
    $(this).html(getAge(1996));
  });

  // Display getYear

  function getYearSpan(start) {

    now = new Date();
    theYear = now.getYear();
    var result;
    if (theYear < 1900) {
      theYear = theYear + 1900;
      if (theYear > start) {
        result = start + " - " + theYear;

      } else {
        result = start;
      }
    }
    return result;
  }

  $('.getYearSpan').each(function() {
    var original = $(this).text();
    $(this).html(getYearSpan(original));
  });


  //***********
  // JQuery End
  //***********


});


function PageScrollFix(x) {

  // BARBA SCROLL FIX
  setTimeout(function() {
    $('html, body').animate({
      scrollTop: $('#' + x).offset().top
    }, 1000);
  }, 500);
}

function setLanguage(x) {
  $.cookie("LANGUAGE", x, {
    path: '/',
    expires: 365
  });
}
