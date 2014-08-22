var fs = require('fs'),
    path = require('path'),
    bunyan = require('bunyan'),
    PrettyStream = require('bunyan-prettystream');


module.exports = function(options) {

  var dir = options && options.directory || path.resolve('logs');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0775);
  }

  var streams = [{
    level: 'error',
    path: path.resolve(dir, 'app.log')
  }];

  if (options && options.console) {
    var prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);
  
    streams.push({
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut
    });
  }

  var log = bunyan.createLogger({
    name: options && options.name || 'app',
    streams: streams
  });

  return log;
}




