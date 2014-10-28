module.exports = {
  dev: {
    options: {
      outputStyle: 'nested',
      sourceComments: 'none',
      sourceMap: true
    },
    files: {
      'public/css/app.css': 'public/css/app.scss'
    }
  },
  release: {
    options: {
      outputStyle: 'nested', // A bug or something break the grid in "compressed" mode... So will use mincss after...
      sourceComments: 'none',
      sourceMap: false
    },
    files: {
      'public/css/app.css': 'public/css/app.scss'
    }
  }
};