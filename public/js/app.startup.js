
/**
 * Application entry point.
 * Create a new router, load DOM views.
 * Then start history.
 */
$('document').ready(function() {

  app.router = new app.Router();
  
  app.utils.loadViews($(document));

  Backbone.history.start();
});