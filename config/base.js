
var path = require('path');

console.log('[Config] Loading config.json');
var config = require(path.resolve('config', 'config.json'));

// properties to be resolved
var props = 'models,views,controllers,routes,static'.split(',');
props.forEach(function(prop){
  app.set(prop, path.resolve(config[prop]));
});

// static properties
props = 'title,version,view engine,x-powered-by,express-session'.split(',');
props.forEach(function(prop){
  app.set(prop, config[prop]);
});

console.log('[Config] Configure base middleware');
app.use( require('body-parser').urlencoded({ extended: true }) );
app.use( require('body-parser').json() );
app.use( require('cookie-parser')() );
app.use( require('method-override')() );
app.use( require('express-session')(app.settings['express-session']) );
app.use( require('csurf')() );

/* --------------------------
 * Dynamic locals
 * --------------------------------------- */
app.use(function(req, res, next) {
  res.locals.path = req.path;
  res.locals.url = req.url;
  res.locals.user = req.user;
  res.locals.csrftoken = req.csrfToken();
  next();
});

/* --------------------------
 * Static locals
 * --------------------------------------- */
app.locals = {
  title: app.settings.title,
  version: app.settings.version,

  moment: require('moment')
};
