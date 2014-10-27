
/**
 * Array list of all js ressource.
 * - Dev:
 *     Each files are loaded async but required in the order provided.
 * 
 * - Prod:
 *     Used to generate the app.min.js global file.
 * 
 * @type {Array}
 */
;(function(window) {

  var sources = {};

  // Stylesheets
  sources.css = [
    '/css/app.css',
    '/vendor/fontawesome/css/font-awesome.min.css'
  ];

  // JS
  sources.scripts = [

    // Vendors
    '/vendor/jQuery/dist/jquery.min.js',
    '/vendor/exoskeleton/exoskeleton.js',

    // App stuffs
    '/js/app/app.namespace.js',
    '/js/app/app.helpers.js',
    
    '/js/app/views/app.header.view.js',

    '/js/app/app.router.js',
    '/js/app/app.startup.js'

  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = sources;
  } else {
    window.sources = sources;
  }

})(window);



