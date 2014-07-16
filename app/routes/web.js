
app.get('/', controllers.web.homeController.doGet);
app.post('/', controllers.web.homeController.doPost);


app.get('*', controllers.web.errorController.notFound);