

app.io.router.on('some*', controllers.socket.controller.handleEvent);
app.io.router.on('*event', controllers.socket.controller.handleEvent);