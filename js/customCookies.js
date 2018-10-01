jQuery(document).ready(function($) {
  // $("body").append('<div class="cookie-warning"><div class="cookie-wrapper"></div><div class="consent-text">We use cookies like everyone else.</div><div class="consent-button block-hover block-hover-negative">Accept</div></div></div>');
  var cookieWarning = $(".cookie-warning");

  setTimeout(
  function()
  {
    $.cookie("VISITED", "1", { path: '/', expires: 1 });
  }, 5000);


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
      $.cookie("CONSENT", "1", { path: '/', expires: 365 });
      console.log( $.cookie("CONSENT") );
      window['ga-disable-UA-125435154-1'] = false;
      //...snip...
      //set a cookie to express that the user has opted-in to tracking, for future pageviews
      _gaq.push(['_trackPageview']); // now run the pageview that you 'missed
  }


});

// jQuery(document).ready(function($) {
//   var controller = new ScrollMagic.Controller();
//   $("body").append('<div class="cookie-warning"><div class="cookie-wrapper"></div><div class="consent-text">We use cookies like everyone else.</div><div class="consent-button block-hover block-hover-negative">Accept</div></div></div>');
//
//   var cookieWarning = $(".cookie-warning");
//
//   var cookieAppear = new ScrollMagic.Scene({
//     duration: cookieWarning.outerHeight()
//
//   })
//   .setTween(TweenMax.from(".cookie-warning", 1, {
//     y: '100%',
//     reverse: false,
//     ease: Power0.noease
//   }))
//   .addTo(controller);
// });
