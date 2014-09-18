
// TODO: better config
// Inititalize a socket server
var server = require('http').Server(app);
app.io = require('socket.io')(server);
app.io.router = require('socket.io-events')();
