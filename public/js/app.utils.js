
/**
 * Load all views in the passed container.
 * @param  {jQuery Object} $cont The jQuery element object
 */
app.utils.loadViews = function($cont) {
  $cont.find("[data-view]").each(function() {
    var $el      = $(this),
        view     = $el.data("view"),
        thisView = app.views[view];
        
    if (thisView) {
      var v = new thisView({el: this});
      $el.data('cid', v.cid);
      app.aliveViews[v.cid] = v;
    }

  });
};

/**
 * Destroy all views in the passed container.
 * @param  {jQuery Object} $cont The jQuery element object
 */
app.utils.destroyViews = function($cont) {
  $cont.find("[data-view]").each(function() {
    var $el  = $(this),
        cid  = $el.data('cid'),
        view = app.aliveViews[cid];

    if (view) {
      view.destroy && view.destroy();
      delete app.aliveViews[cid];
    }
  });
};