var fs = require('fs');

var config = (function() {

  var data = {};

  var testRequire = function(file){
    try{
      console.log("Trying to load " + file);
      require(file);
      return true;
    }catch(e){
      console.log("error: " + e);
      return false;
    }
  }

  return {
    get: function(val, env){
      env = env || process.env.NODE_ENV;

      if (val == env) return env;
      if (!data[env]) {
        var path = './environments/' + env;
        if (!testRequire(path)) {
          throw new Error("Unknown environment " + env);
        }
        data[env] = require(path).config;
      }
      return data[env][val];
    }
  }
})();

var walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  })
  return results;
};

//models = utils.loadModels(ROOT + '/app/models', mongoose);

controllers = {};
var controllerFiles = walk(ROOT + '/app/controllers');
for (f in controllerFiles) {
  var file = controllerFiles[f].replace(ROOT + '/app/controllers/', '');

  var ns = file.split('/');
  var base = controllers;

  for (var i = 0; i < ns.length-1; i++) {
    if (!base[ns[i]]) base[ns[i]] = {};
    base = base[ns[i]];
  }
  var name = ns[ns.length-1].replace('.js', '').camelize(false);
  base[name] = require(controllerFiles[f]);
};


app.locals = {
  title: config.get("title"),
  app_version: (function(){
    return config.get("app_version");
  })(),
  app_url: (function(){
    return config.get("app_url");
  })()
};


// Load routes - TODO: better
var routesFile = walk(ROOT + '/app/routes');
for (f in routesFile) {
  require(routesFile[f]);
};

// install error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (req.xhr) {
    res.send(500, { error: 'Oops, error!' });
  } else {
    res.status(500);
    res.render('error', { error: err });
  }
  next(err);
});


process.on('uncaughtException', function(err) {
  // handle the error safely
  console.error(err.stack);
});

