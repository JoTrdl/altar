module.exports = {
  sass: {
    files: ["public/css/*.scss","public/css/**/*.scss"],
    tasks: ["sass:dev", "autoprefixer", "analyzecss"],
    options: {
      livereload: true
    }
  },

  complexity: {
    files: ["app/*.js","app/**/*.js"],
    tasks: ["jshint", "complexity"],
    options: {

    }
  },

  options: {
    spawn: true
  }
};