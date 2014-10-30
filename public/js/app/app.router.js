app.classes.Router = Backbone.Router.extend({

  routes: {
    "*all": "all",
  },

  initialize: function() {
    
    this.$content = $('.content');

    $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      // If new tab or new window requested... abort.
      if (e.metaKey || e.ctrlKey)
        return;

      var href = this.getAttribute("href");
      var isAbsolute = href.indexOf(':') > -1 || href.indexOf('//') > -1;

      if (!isAbsolute) { // Link to the site
        e.preventDefault();
        Backbone.history.navigate(href, {trigger: true});
      }
      
    });
  },

  all: function() {
    var self = this;
    var url = "/" + Backbone.history.getFragment();
    console.log('Route change: [' + url + ']');

    // Fetch the content from server
    $.ajax({
      url: url,
      dataType: "html",
    }).done(function(data, status, xhr) {
      self.$content.html(data);

    }).fail(function(xhr, status) {
      alert( "error" );
    });
  }

});