'use strict';

// Модуль создания объявлений
(function () {
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = document.querySelector('.map__overlay').offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  window.data = {
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
  };
})();

