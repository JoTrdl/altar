
(function(w, $, P) {

  console.log(P)
  
  var breaker = function() {
    $('*').not('html, head, body, link, script, style, meta').each(function() {
      console.log(this.innerText)
    });
  };
  
  window.breaker = breaker;

})(window, jQuery, Physics);