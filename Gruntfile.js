

/**
 * Project Gruntfile.
 *
 * Main tasks
 * ---------------------------
 * 
 * - buildcss: build the CSS for development mode.
 * - watchall: load the Grunt watcher for building CSS. Also, analyze JS code (Front/Back) with JSHint/Complexity.
 * - release: prepare all assets for production enviroment.
 *
 * - default: buildcss + watchall
 */
module.exports = function(grunt) {

  // Load the sources map file and update each path.
  var PUBLIC_ROOT = "public/";
  var sourcesMap = grunt.file.readJSON('public/js/sources.map.json');
  for (var i in sourcesMap.css) { sourcesMap.css[i] = PUBLIC_ROOT + sourcesMap.css[i]; }
  for (var i in sourcesMap.scripts) { sourcesMap.scripts[i] = PUBLIC_ROOT + sourcesMap.scripts[i]; }

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt, {
    data: {
      sources: sourcesMap,
    },
  });

  grunt.registerTask("buildcss", ["sass:dev", "autoprefixer", "analyzecss"]);
  grunt.registerTask("watchall", ["concurrent:watch"]);

  grunt.registerTask("release", [
  	"sass:release", "autoprefixer", "analyzecss", "concat", // CSS
  	"jshint", "uglify" // JS
  ]);

  grunt.registerTask("default", ["buildcss", "watchall"]);
};