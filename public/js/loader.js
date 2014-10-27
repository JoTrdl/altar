/**
 * Sources loader.
 *
 * Largely inspired by basket.js.
 * Store ressources in localStorage if available.
 * 
 */
(function(window, document) { 
  'use strict';

  var head = document.head || document.getElementsByTagName('head')[0],
      storagePrefix = 'source_',
      timeout = 5000;

  /**
   * Fetch url from the network.
   * @param  {String}   url      Url to fetch
   * @param  {Function} callback Done callback
   */
  var fetch = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback && callback(null, xhr.responseText);
        }
        else {
          callback && callback(new Error(xhr.statusText));
        }
      }
    };

    // By default XHRs never timeout, fake it.
    setTimeout( function () {
      if( xhr.readyState < 4 ) { xhr.abort(); }
    }, timeout);

    xhr.send();
  };

  var require = function(srclist, type, version, callback) {
    var total = srclist.length || 0,
        datas = new Array(total),
        index = 0,
        count = 0;

    var next = function(i, data, type) {
      // Need to inject data in order.
      datas[i] = { data: data, type: type };
      while(datas[index]) {
        var d = datas[index];
        injectContent(d.data, d.type);
        index ++;
      }
      
      count ++;
      if (count >= total)
        callback && callback();
    };

    for (var i = 0; i < total; i++) {
      (function(i) {
        var url = srclist[i];
        var key = '|' + version + '|_' + url;

        // First, check localstorage
        var data = getSource(key);
        if (data) {
          // OK, got it
          next(i, data, type);
          return;
        };

        fetch(url, function(e, content) {
          // Save to the cache
          addSource(key, content);

          next(i, content, type);
        });
      })(i);
    } // for each src

  };

  var injectContent = function(content, type) {
    switch(type) {
      case 'js':
        var script = document.createElement('script');
        script.defer = true;
        script.text = content;
        head.appendChild(script);
        break;

      case 'css': 
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');

        if (style.styleSheet) {
          style.styleSheet.cssText = content;
        } 
        else if ('textContent' in style) {
          style.textContent = content;
        } 
        else {
          style.appendChild(document.createTextNode(content));
        }

        head.appendChild(style);
        break;
    }
  };

  var removeSource = function(key) {
    localStorage && localStorage.removeItem(storagePrefix + key);
  };

  var addSource = function(key, data) {

    try { 
      localStorage && localStorage.setItem(storagePrefix + key, data);
    } catch (e) {
      if (e.name.toUpperCase().indexOf('QUOTA') < 0) {
        return;
      }
      // Quota error. Need to clean up cache.
      
      var currentVersion = key.split('|')[1];
      
      for (item in localStorage) {
        if (item.indexOf(storagePrefix) === 0 ) {
          var version = item.split('|')[1];
          if (version != currentVersion) {
            // Not the same version, clear it
            removeSource(key);
          }
        }
      }
    }// catch
  };

  var getSource = function(key) {
    var data = (localStorage && localStorage.getItem(storagePrefix + key)) || null;
    if (!data)
      return null;

    return data;
  };


  window.loader = {

    require: require,

    clear: function() {
      var item, key;
      for (item in localStorage) {
        key = item.split(storagePrefix)[1];
        if (key) {
          removeSource(key);
        }
      }
    }

  }
})(this, document);
