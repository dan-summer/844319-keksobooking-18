'use strict';

// Модуль фильтрации объявлений
(function () {
  var filterHousingTypeSelector = window.map.mapFiltersForm.querySelector('#housing-type'); // Селектор выбора типа жилья в форме фильтрации объявлений

  var getFilterAnnouncements = function () {
    return window.pin.serverPins.filter(function (announcement) {

      return filterHousingTypeSelector.value === 'any' ? true : announcement.offer.type === filterHousingTypeSelector.value;
    });
  };

  // var filterAnnouncements = getFilterAnnouncements(window.pin.pinsArr);
  // window.pin.filteredPins = filterAnnouncements;

  window.filter = {
    getFilterAnnouncements: getFilterAnnouncements
  };
})();
