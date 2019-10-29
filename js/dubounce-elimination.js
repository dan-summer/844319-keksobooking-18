'use strict';

// Модуль устранения "дребезга"
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (callBack) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callBack.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounceElimination = {
    debounce: debounce
  };
})();
