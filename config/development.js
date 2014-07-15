var config = require('./common').config

app.use(function(req, res, next) {
  app.locals.pretty = true;
  next();
});


exports.config = config;
