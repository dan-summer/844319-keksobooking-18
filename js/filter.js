'use strict';

// Модуль фильтрации объявлений
(function () {
  var filterHousingTypeSelector = window.map.mapFiltersForm.querySelector('#housing-type'); // Селектор выбора типа жилья в форме фильтрации объявлений

  var successHandler = function (serverData) {
    var filteredData = serverData.filter(function (receivedServerData) {

      return receivedServerData.offer.type === filterHousingTypeSelector.value;
    }).slice(0, 4);

    window.pin.updatePins(filteredData);
  };

  window.map.mapFiltersForm.addEventListener('change', function () {
    var pins = window.pin.mapPins.querySelectorAll('[data-pin-index]'); // Все метки, имеющие атрибут data-pin-index

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
    window.map.deleteCard();
    window.backend.load(successHandler, window.messageHandler.onLoadErrorHandler);
  });
})();
