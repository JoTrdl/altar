var fs = require('fs');

// Node serves static files in dev
app.use( express.static(app.settings.static) );

var sourcesMap = JSON.parse(fs.readFileSync(ROOT + '/public/js/sources.map.json'));

// Pretty HTML in dev
app.use(function(req, res, next) {
  app.locals.pretty = true;

  app.locals.sources = sourcesMap;
  next();
});