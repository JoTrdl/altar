module.exports = {
  sass: {
    files: ["public/css/*.scss","public/css/**/*.scss"],
    tasks: ["sass:dev", "autoprefixer", "analyzecss"],
    options: {
      livereload: true
    }
  },

  js: {
    files: ["app/**/*.js","public/js/**/*.js"],
    tasks: ["jshint", "complexity"],
    options: {

    }
  },

  options: {
    spawn: true
  }
};