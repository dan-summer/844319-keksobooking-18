'use strict';

// Модуль фильтрации объявлений
(function () {
  var filterHousingTypeSelector = window.map.mapFiltersForm.querySelector('#housing-type'); // Селектор выбора типа жилья в форме фильтрации объявлений

  // Функция фильтрации объявлений
  var getFilterAnnouncements = function () {
    var filteredPins = window.pin.serverPins.filter(function (announcement) {

      return filterHousingTypeSelector.value === 'any' ? true : announcement.offer.type === filterHousingTypeSelector.value;
    });

    window.pin.filteredPins = filteredPins;

    return filteredPins;
  };

  window.filter = {
    getFilterAnnouncements: getFilterAnnouncements
  };
})();
