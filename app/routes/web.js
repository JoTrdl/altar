/* 
 * Index
 */
app.get('/', controllers.web.homeController.doGet);
app.post('/', controllers.web.homeController.doPost);

/*
 * Demo
 */
app.get('/demo/:type', controllers.web.demoController.doGet);

/*
 * Admin controller
 */
app.get('/admin', loginRequired(true), controllers.web.adminController.doGet);


// testing error 500
app.get('/error', function() {
  throw new Error('test');
});

/*
 * Not found handler.
 */
app.get('*', controllers.errorController.notFound);


function loginRequired(require) {
  return function(req, res, next) {
    if (!require) return next();

    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    //req.flash('error', 'You need to log in to access to this page.');
    return res.redirect('/login');
  };
}