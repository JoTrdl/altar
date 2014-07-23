
// Node serves static files in dev
app.use( express.static(app.settings.static) );
app.use( require('morgan')({ format: '[Serving] :method :url' }) );

// Pretty HTML in dev
app.use(function(req, res, next) {
  app.locals.pretty = true;
  next();
});


exports.locals = {
  environment: 'development'
};
