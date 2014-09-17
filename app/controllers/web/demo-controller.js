var fs = require('fs');

exports.doGet = function(req, res, next){

  var demoFile = app.get('views') + '/' + 'components/demo/' + req.params.type + '.jade';

  fs.exists(demoFile, function(exists) {
    if (exists) {
      res.render('components/demo/' + req.params.type);
    }
    else {
      res.redirect('/notfound');
    }
  });
  
};