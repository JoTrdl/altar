
/**
 * Application entry point.
 * Create a new router, load DOM views.
 * Then start Bakbone history.
 */
app.startup = function() {
	
  // Start the Backbone history before the router 
  // in order to avoid the first route changed event.
  Backbone.history.start({pushState: true,  hashChange: false});
  app.router = new app.classes.Router();
  
  // Load views associated in the document.
  app.helpers.loadViews($(document));
};
