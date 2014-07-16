
app.use(function(req, res, next) {
  app.locals.pretty = true;
  next();
});