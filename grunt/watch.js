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
    tasks: ["complexity:dev"],
    options: {

    }
  },

  options: {
    spawn: true
  }
};