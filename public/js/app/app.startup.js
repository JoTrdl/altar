
/**
 * Application entry point.
 * Create a new router, load DOM views.
 * Then start Bakbone history.
 */
app.startup = function() {

  app.router = new app.classes.Router();
  
  app.helpers.loadViews($(document));

  Backbone.history.start();
};
