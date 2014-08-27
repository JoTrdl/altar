
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
    },
    autoprefixer: {
      prefixe: {
        options: {
          browser: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
        },
        src: 'public/css/app.css',
        dest: 'public/css/app.css'
      }
    },
    analyzecss: {
      analyze: {
        sources: ['public/css/app.css']
      },
      options: {
        outputMetrics: 'error',
        thresholds: {
          "complexSelectors": 0,
          "universalSelectors": 10,
          "selectors": 4095,
          "selectorsByTag": null,
          "importants": 10,
          "comments": null,
          "commentsLength": null
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks("grunt-contrib-analyze-css");

  grunt.registerTask("buildcss", ["sass:dev", "autoprefixer", "analyzecss"]);
  grunt.registerTask("watchcss", ["watch:sass", "autoprefixer", "analyzecss"]);
  
  grunt.registerTask("default", ["buildcss", "watchcss"]);
};
