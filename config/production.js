var config = require('./common').config

app.enable('view cache');

app.use( require('compression')() );

exports.config = config;
