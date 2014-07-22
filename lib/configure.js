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

// Load models
models = requireDir(app.settings.models);

// Load controllers
controllers = requireDir(app.settings.controllers);

// TODO: better config
// Inititalize a socket server
var server = require('http').Server(app);
app.io = require('socket.io')(server);
app.io.router = require('socket.io-events')();

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

