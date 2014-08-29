module.exports = {
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
};