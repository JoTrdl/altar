module.exports = function(grunt) {

  // measures the time each task takes
  //require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt);

  grunt.registerTask("buildcss", ["sass:dev", "autoprefixer", "analyzecss"]);
  grunt.registerTask("watchassets", ["concurrent:watch"]);
  grunt.registerTask("cr", ["complexity:dev"]);

  grunt.registerTask("default", ["buildcss", "watchcss"]);
};