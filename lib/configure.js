var path = require('path'),
    requireDir = require('./requireDir');

// Starts to require the system config file
require(path.resolve('config', 'system'));

// Then, requires the environment file
// If no found, throw an error.
var envFile = path.resolve('config', process.env.NODE_ENV);
var env;
try {
  console.log("[Config] Loading " + envFile);
  env = require(envFile);
} catch(e) {
  console.error("Unknown environment [" + process.env.NODE_ENV + "]");
  console.error(e.stack);
}

// Load models
models = requireDir(app.settings.models);

// Load controllers
controllers = requireDir(app.settings.controllers);

// Load routes
requireDir(app.settings.routes);

// install error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (req.xhr) {
    res.send(500, { error: 'Oops, error!' });
  } else {
    res.status(500);
    res.render('errors/500', { error: err });
  }
  next(err);
});

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.error(err.stack);
});
