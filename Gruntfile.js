
var PUBLIC_ROOT = "public/";

module.exports = function(grunt) {

  // Load the sources map file and update path.
  var sourcesMap = grunt.file.readJSON('public/js/sources.map.json');
  for (i in sourcesMap.css) { sourcesMap.css[i] = PUBLIC_ROOT + sourcesMap.css[i]; }
  for (i in sourcesMap.scripts) { sourcesMap.scripts[i] = PUBLIC_ROOT + sourcesMap.scripts[i]; }

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt, {
    data: {
      sources: sourcesMap,
    },
  });

  grunt.registerTask("buildcss", ["sass:dev", "autoprefixer", "analyzecss"]);
  grunt.registerTask("watchassets", ["concurrent:watch"]);

  grunt.registerTask("dist", [
  	// CSS
  	"sass:dist", "autoprefixer", "analyzecss",

  	// JS
  	"jshint", "uglify"
  ]);

  grunt.registerTask("default", ["buildcss", "watchcss"]);
};