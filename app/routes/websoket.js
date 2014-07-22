

app.io.router.on('some*', controllers.websocket.controller.handleEvent);
app.io.router.on('*event', controllers.websocket.controller.handleEvent);