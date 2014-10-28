
module.exports = {

  dist: {
    files: {
      'public/js/app.min.js': '<%= sources.scripts %>',
      'public/js/loader.min.js': ['public/js/loader.js']
    }
  }
};  