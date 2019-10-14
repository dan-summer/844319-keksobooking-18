'use strict';

// Модуль создания объявлений
(function () {
  var cursorCoordX = parseInt(window.pin.mainMapPin.style.left, 10); // Координата курсора мыши по X
  var cursorCoordY = parseInt(window.pin.mainMapPin.style.top, 10); // Координата курсора мыши по Y

  var MAIN_PIN_LOCATION_X_MIN = 0;
  var MAIN_PIN_LOCATION_X_MAX = document.querySelector('.map__overlay').offsetWidth;
  var MAIN_PIN_LOCATION_Y_MIN = 130;
  var MAIN_PIN_LOCATION_Y_MAX = 630;

  // Ограничение главной метки по X
  var mainPinLimitXMin = MAIN_PIN_LOCATION_X_MIN - window.pin.MAIN_PIN_WIDTH / 2;
  var mainPinLimitXMax = MAIN_PIN_LOCATION_X_MAX - window.pin.MAIN_PIN_WIDTH / 2;
  // Ограничение главной метки по Y
  var mainPinLimitYMin = MAIN_PIN_LOCATION_Y_MIN - window.pin.MAIN_PIN_HEIGHT - window.map.MAIN_PIN_SHARD_END_HEIGHT;
  var mainPinLimitYMax = MAIN_PIN_LOCATION_Y_MAX - window.pin.MAIN_PIN_HEIGHT - window.map.MAIN_PIN_SHARD_END_HEIGHT;

  // Событие перемещения главной метки по карте
  window.pin.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!window.map.isPageActive) {
      window.map.activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.map.mainPinCurrentX = window.pin.mainMapPin.offsetLeft - shift.x;
      window.map.mainPinCurrentY = window.pin.mainMapPin.offsetTop - shift.y;

      cursorCoordX = cursorCoordX - shift.x;
      cursorCoordY = cursorCoordY - shift.y;

      if (window.map.mainPinCurrentX > mainPinLimitXMax || cursorCoordX > mainPinLimitXMax) {
        window.map.mainPinCurrentX = mainPinLimitXMax;
      } else if (window.map.mainPinCurrentX < mainPinLimitXMin || cursorCoordX < mainPinLimitXMin) {
        window.map.mainPinCurrentX = mainPinLimitXMin;
      }
      if (window.map.mainPinCurrentY > mainPinLimitYMax || cursorCoordY > mainPinLimitYMax) {
        window.map.mainPinCurrentY = mainPinLimitYMax;
      } else if (window.map.mainPinCurrentY < mainPinLimitYMin || cursorCoordY < mainPinLimitYMin) {
        window.map.mainPinCurrentY = mainPinLimitYMin;
      }

      window.pin.mainMapPin.style.top = window.map.mainPinCurrentY + 'px';
      window.pin.mainMapPin.style.left = window.map.mainPinCurrentX + 'px';
      window.map.getPinSharpEndCoordinate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

