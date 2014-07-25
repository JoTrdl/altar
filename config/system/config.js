
var path = require('path'),
    i18n = require('i18n');

/*
  Config system:

  config/
    system/
      config.json
      config.js
    development/
      config.json
      config.js
    production /
      config.json
      config.js

  1 - Source config.json & merge ENV/config.json
  2 - Require system/config.js
  3 - Requrie ENV/config.js
 */

console.log('[Config] Loading config.json');
var config = require(path.resolve('config/system', 'config.json'));

// merge base config with environment config
var envConfig = require(path.resolve('config/' + process.env.NODE_ENV, 'config.json'));
config = Object.merge(config, envConfig);

// properties to be resolved
var resolveProps = 'models,views,controllers,routes,locales,static'.split(',');
resolveProps.forEach(function(prop){
  app.set(prop, path.resolve(config[prop]));
});

// static properties, everything else
Object.keys(config, function(prop, value) {
  if (resolveProps.indexOf(prop) > 0) return;
  app.set(prop, value);
});

console.log('[Config] Configure base middleware');
app.use( require('body-parser').urlencoded({ extended: true }) );
app.use( require('body-parser').json() );
app.use( require('cookie-parser')() );
app.use( require('method-override')() );
app.use( require('express-session')(app.settings['express-session']) );
app.use( require('csurf')() );

/* --------------------------
 * Localization
 * --------------------------------------- */
i18n.configure(Object.merge({directory: app.settings.locales}, app.settings.i18n || {} ));
app.use(i18n.init);

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
  environment: app.settings.environment,

  moment: require('moment')
};

// TODO: better config
// Inititalize a socket server
var server = require('http').Server(app);
app.io = require('socket.io')(server);
app.io.router = require('socket.io-events')();
