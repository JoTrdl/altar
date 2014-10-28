var fs = require('fs'),
    path = require('path');

// Node serves static files in dev
app.use( express.static(app.settings.static) );

// Load the sources map file
var sourcesMapFile = path.resolve(ROOT, 'public/js/sources.map.json');
var sourcesMap = [];
try { sourcesMap = JSON.parse(fs.readFileSync(sourcesMapFile)); } catch(e) {}

app.use(function(req, res, next) {
  // Pretty HTML in dev
  app.locals.pretty = true;

  // Set the sources mar in views
  app.locals.sources = sourcesMap;

  next();
});