
app.get('/', controllers.web.homeController.doGet);
app.post('/', controllers.web.homeController.doPost);


app.get('*', controllers.errorController.notFound);