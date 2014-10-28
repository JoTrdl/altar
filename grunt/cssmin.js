module.exports = {
  release: {
    options: {
      banner: '/*! <%= package.name %> - v<%= package.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    files: {
      "public/css/app.css": "<%= sources.css %>"
    }
  }
};