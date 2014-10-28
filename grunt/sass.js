module.exports = {
  dev: {
    options: {
      outputStyle: 'compressed',
      sourceMap: true
    },
    files: {
      'public/css/app.css': 'public/css/app.scss'
    }
  },
  dist: {
    options: {
      outputStyle: 'compressed',
      sourceMap: false
    },
    files: {
      'public/css/app.css': 'public/css/app.scss'
    }
  }
};