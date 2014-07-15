
// Global to app
express = require('express');
sugar = require('sugar');

ROOT = __dirname;

if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

const port = parseInt(process.env.PORT || 8080);

app = module.exports = express();

require('./config/configure');

app.listen(port);

console.log("Express server listening on port [%d] in [%s] mode", port, app.settings.env);
