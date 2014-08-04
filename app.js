
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

// Global to app
require('sugar');
express = require('express');
logger = require('./lib/logger');

var port = parseInt(process.env.PORT || 8080, 10);

app = module.exports = express();

require('./lib/configure');

app.listen(port);

console.log("[System] Express server listening on port [%d] in [%s] mode", port, app.settings.env);
