

app.io.router.on('some*', controllers.ws.controller.handleEvent);
app.io.router.on('*event', controllers.ws.controller.handleEvent);