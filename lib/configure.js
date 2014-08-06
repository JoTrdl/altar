var path = require('path'),
    requireDir = require('./requireDir');

// Starts to require the system config file
require(path.resolve('config/app', 'config.js'));

// Then, requires the environment file
// If no found, throw an error.
var envFile = path.resolve('config/' + process.env.NODE_ENV, "config.js");
var env;
try {
  log.info("Loading " + envFile);
  env = require(envFile);
} catch(e) {
  log.error("Unknown environment [" + process.env.NODE_ENV + "]");
}

// Load models
models = requireDir(app.settings.models);

// Load controllers
controllers = requireDir(app.settings.controllers);

// Load routes
requireDir(app.settings.routes);

// Install error handlers
app.use(controllers.errorController.serverError);
process.on('uncaughtException', controllers.errorController.onUncaughtException);