module.exports = {
  analyze: {
    sources: ['public/css/app.css']
  },
  options: {
    outputMetrics: 'error',
    thresholds: {
      "complexSelectors": 0,
      "universalSelectors": 5,
      "selectors": 4095,
      "selectorsByTag": null,
      "importants": 10,
      "comments": null,
      "commentsLength": null
    }
  }
};