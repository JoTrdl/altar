var fs = require('fs'),
    path = require('path'),
    bunyan = require('bunyan'),
    PrettyStream = require('bunyan-prettystream');

var losgDir = path.resolve('logs');

if (!fs.existsSync(losgDir)) {
  fs.mkdirSync(losgDir, 0664);
}

var streams = [{
  level: 'error',
  path: path.resolve(losgDir, 'app.log')
}];

var customStream = (function() {
  var colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  function stylize(str, color) {
    var codes = colors[color];
    if (codes) {
      return '\x1B[' + codes[0] + 'm' + str +
             '\x1B[' + codes[1] + 'm';
    }
  }

  var levels = {
    10: ['TRACE', 'grey'],
    20: ['DEBUG', 'magenta'],
    30: ['INFO', 'cyan'],
    40: ['WARN', 'yellow'],
    50: ['ERROR', 'red'],
    60: ['FATAL', 'red']
  }

  return {
    write: function write(data) {
      console.log('write');
      console.log(data);

      var time = (data.time.toISOString && data.time.toISOString()) ||  data.time;
      //time = stylize(time, 'white');

      var level = levels[data.level][0];
      level = stylize(level, levels[data.level][1]);

      console.log("[%s][%s][%s] %s", time, level, data.name, data.msg);

      /*{ name: 'foo',
        hostname: 'jtdl-macbook.local',
        pid: 8812,
        level: 50,
        msg: 'hello',
        time: Wed Jul 30 2014 20:49:41 GMT-0400 (EDT),
        v: 0 }*/

      return true;
    }
  }
})();

// Add pretty logs on console if dev
if (process.env.NODE_ENV == 'development') {
  var prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);

  streams.push({
    level: 'debug',
    type: 'raw',
    stream: customStream
  });

  streams.push({
    level: 'debug',
    type: 'raw',
    stream: prettyStdOut
  });

}

var log = bunyan.createLogger({
  name: 'foo',
  streams: streams
});
log.info("hi");

log.error("hello");

log.configure = function(options) {
  console.log('CONFIGURE')
};


module.exports = log;

