
exports.notFound = function(req, res, next) {
  if (req.xhr) {
    res.send(404, { error: 'Not found.' });
  } else {
    res.status(404);
    res.render('errors/404');
  }
  next(err);
};


exports.serverError = function(err, req, res, next) {
  console.error(err.stack);
  if (req.xhr) {
    res.send(500, { error: 'Internal Server Error.' });
  } else {
    res.status(500);
    res.render('errors/500', { error: err });
  }
  next(err);
}

exports.onUncaughtException = function(err) {
  // handle the error safely
  console.error(err.stack);
};

