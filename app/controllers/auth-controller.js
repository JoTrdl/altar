var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var fakeUser = {
  'login': 'admin'
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username == 'admin')
      return done(null, fakeUser);
    else
      return done(null, false, { message: 'Incorrect username.' });
  }
));