
var path = require("path");

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: true,
          debugInfo: false
        },
        files: {
          'public/css/app.css': 'public/css/app.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: false,
          debugInfo: false
        },
        files: {
          'public/css/app.css': 'public/css/app.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ["public/css/*.scss","public/css/**/*.scss"],
        tasks: ["sass:dev"],
        options: {
          livereload: true
        }
      },
      options: {
        spawn: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");

  grunt.registerTask("buildcss", ["sass:dev"]);
  grunt.registerTask("watchcss", ["watch:sass"]);
  
  grunt.registerTask("default", ["buildcss", "watchcss"]);
};
