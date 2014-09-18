var path = require('path'),
    requireDir = require(path.resolve(ROOT, 'app', 'utils', 'requireDir.js'));

// Starts to require the system config file
require(path.resolve(ROOT, 'app', 'config/app', 'config.js'));

// Then, requires the environment file
// If no found, throw an error.
var envFile = path.resolve(ROOT, 'app', 'config/' + process.env.NODE_ENV, "config.js");
try {
  log.info("Configuring environment [" + process.env.NODE_ENV + "] middleware");
  require(envFile);
} catch(e) {
  log.error("Error when requiring environment [" + process.env.NODE_ENV + "]", e);
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