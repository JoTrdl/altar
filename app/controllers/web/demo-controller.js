var fs = require('fs');

exports.doGet = function(req, res, next){

  var demoFile = app.get('views') + '/' + 'demo/' + req.params.type + '.jade';

  fs.exists(demoFile, function(exists) {
    if (exists) {
      res.render('demo/' + req.params.type);
    }
    else {
      res.redirect('/notfound');
    }
  });
  
};