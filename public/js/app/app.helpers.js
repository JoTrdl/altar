
/**
 * Load all views in the passed container.
 * @param  {jQuery Object} $cont The jQuery element object
 */
app.helpers.loadViews = function($cont) {
  $cont.find("[data-view]").each(function() {
    var $el      = $(this),
        view     = $el.data("view"),
        thisView = app.classes.views[view];

    if (thisView) {
      var v = new thisView({el: this});
      $el.data('cid', v.cid);
      app.views[v.cid] = v;
    }

  });
};

/**
 * Destroy all views in the passed container.
 * @param  {jQuery Object} $cont The jQuery element object
 */
app.helpers.destroyViews = function($cont) {
  $cont.find("[data-view]").each(function() {
    var $el  = $(this),
        cid  = $el.data('cid'),
        view = app.views[cid];

    if (view) {
      view.destroy && view.destroy();
      delete app.views[cid];
    }
  });
};

/**
 * Set true/false if touch device or not. 
 * Inline function executed once.
 */
app.helpers.isTouch = (function() {
  return !!('ontouchstart' in window);
})();
