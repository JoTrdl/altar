var path = require('path'),
    requireDir = require('./requireDir');

// Starts to require the base config file
require(path.resolve('config', 'base'));

// Then, requires the environment file
// If no found, throw an error.
var envFile = path.resolve('config', process.env.NODE_ENV);
try {
  console.log("[Config] Loading " + envFile);
  require(envFile);
} catch(e) {
  throw new Error("Unknown environment [" + process.env.NODE_ENV + "]");
}


//models = utils.loadModels(ROOT + '/app/models', mongoose);

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
    res.render('error', { error: err });
  }
  next(err);
});


process.on('uncaughtException', function(err) {
  // handle the error safely
  console.error(err.stack);
});
