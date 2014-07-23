

exports.onConnectionEvent = function(socket) {
  // called when a new socket connects to the server
};

exports.handleEvent = function(socket, args, next){
  var name = args.shift(), msg = args.shift();
  socket.emit('received event', name, msg);
};
