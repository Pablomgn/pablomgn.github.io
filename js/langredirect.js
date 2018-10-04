//Language Redirect

var language = navigator.language || navigator.browserLanguage; //for IE

// alert(language);


if (language.indexOf('es' || 'ca' || 'gl') < 0) {
  if ($.cookie('LANGUAGE') !== 'SPANISH' || !$.cookie('LANGUAGE')) {
    window.location.href = window.location.href + 'en';
  }
}

if ($.cookie('LANGUAGE') === 'ENGLISH') {
  window.location.href = window.location.href + 'en';
}
