
// Global to app
express = require('express');
require('sugar');

ROOT = __dirname;

if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

var port = parseInt(process.env.PORT || 8080, 10);

app = module.exports = express();

require('./lib/configure');

app.listen(port);

console.log("Express server listening on port [%d] in [%s] mode", port, app.settings.env);
