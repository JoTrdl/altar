var config = exports.config = {
  title: "My app",
  app_url: "http://localhost:8080",
  views: ROOT + "/app/views",
};

app.set('views', config.views);
app.set('view engine', 'jade');
app.set('x-powered-by', null);

app.use( require('body-parser').urlencoded({ extended: true }) );
app.use( require('body-parser').json() );
app.use( require('cookie-parser')() );
app.use( require('method-override')() );
app.use( require('morgan')({ format: ':method :url' }) );
app.use( require('express-session')({ secret: 'secret', key: 'app.sid', saveUninitialized: true, resave: true }) );
app.use( require('csurf')() );

app.use( express.static(ROOT + '/public') );


app.use(function(req, res, next) {
  res.locals.path = req.path;
  res.locals.url = req.url;
  res.locals.user = req.user;
  res.locals.csrftoken = req.csrfToken();
  next();
});
