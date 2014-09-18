
// If socket.io is disabled
if (!app.io) return;

app.io.on('connection', controllers.websocket.controller.onConnectionEvent);
app.io.router.on('some*', controllers.websocket.controller.handleEvent);
app.io.router.on('*event', controllers.websocket.controller.handleEvent);