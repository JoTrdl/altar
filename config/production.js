
app.enable('view cache');

app.use( require('compression')() );

exports.locals = {
  environment: 'production'
};