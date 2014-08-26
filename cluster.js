var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker [' + worker.process.pid + '] died. Fork a new one.');
    cluster.fork();
  });

} else {
  // Worker, start application.
  require('./app.js');
}