module.exports = {
   
   options: {
    stripBanners: true,
    banner: '/*! <%= package.name %> - v<%= package.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
  },

  release: {
    src: "<%= sources.css %>",
    dest: "public/css/app.css"
  }
};