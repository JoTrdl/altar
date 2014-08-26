
app.get('/', controllers.web.homeController.doGet);
app.post('/', controllers.web.homeController.doPost);

app.get('/demo/:type', controllers.web.demoController.doGet);

app.get('*', controllers.errorController.notFound);