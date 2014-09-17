
var path = require('path');

if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

// Global to app
require('sugar');
express = require('express');

ROOT = path.resolve(__dirname, '..');
var port = parseInt(process.env.PORT || 8080, 10);

app = module.exports = express();

require('./config/configure');

app.listen(port);

log.info("Express server listening on port [%d] in [%s] mode", port, app.settings.env);
