module.exports = {
  // define the files to lint
  files: ['app/**/*.js', 'public/js/**/*.js', "!**/*.min.js"],
  
  // configure JSHint (documented at http://www.jshint.com/docs/)
  options: {
    expr: true,
    loopfunc: true
  }
};