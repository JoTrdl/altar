
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
        tasks: ["sass:dev", "autoprefixer", "analyzecss"],
        options: {
          livereload: true
        }
      },

      complexity: {
        files: ["app/*.js","app/**/*.js"],
        tasks: ["complexity:dev"],
        options: {

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
    },
    complexity: {
      dev: {
        src: ["app/*.js", "app/**/*.js", "lib/*.js", "lib/**/*.js", "config/*.js", "config/**/*.js"],
        options: {
            breakOnErrors: false,
            errorsOnly: false,               // show only maintainability errors
            cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
            halstead: [8, 13, 20],           // or optionally a single value, like 8
            maintainability: 100,
            hideComplexFunctions: false,     // only display maintainability
            broadcast: false                 // broadcast data over event-bus
        }
      }
    },

    concurrent: {
      watch: {
        tasks: ['watch:sass', 'watch:complexity'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks("grunt-contrib-analyze-css");

  grunt.registerTask("buildcss", ["sass:dev", "autoprefixer", "analyzecss"]);
  grunt.registerTask("watchassets", ["concurrent:watch"]);
  grunt.registerTask("cr", ["complexity:dev"]);

  grunt.registerTask("default", ["buildcss", "watchcss"]);
};
