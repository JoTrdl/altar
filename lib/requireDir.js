var fs = require('fs'),
    path = require('path');

var walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  });
  return results;
};

var requireDir = function(dir) {
  var requiredFiles = {};

  walk(dir).forEach(function(file) { 

    var rel = path.relative(dir, file);
    var ns = rel.split('/');

    var base = requiredFiles;
    for (var i = 0; i < ns.length-1; i++) {
      if (!base[ns[i]]) base[ns[i]] = {};
      base = base[ns[i]];
    }

    var name = ns[ns.length-1].replace('.js', '').camelize(false);
    try {
      base[name] = require(file);
    } catch(e) {
      console.error('Cannot require file [' + file + ']');
    }
  });

  return requiredFiles;
}

module.exports = requireDir;