/* -----------------------
 *  RequireDir
 *  Auto require all files in folder recursively.
 * ---------------------------------------------------------- */
var path = require('path'),
    walk = require('./walkDir');

var requireDir = function(dir) {
  var requiredFiles = {};

  walk(dir).forEach(function(file) {
    var ext = path.extname(file);
    if (['.js', '.json'].indexOf(ext) < 0) return; // only .js & .json 

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
      console.error(e);
      console.error(e.stack);
    }
  });

  return requiredFiles;
};

module.exports = requireDir;