'use strict';

// Модуль фильтрации объявлений
(function () {
  var filterHousingTypeSelector = window.map.mapFiltersForm.querySelector('#housing-type'); // Селектор типа жилья
  var filterHousingPriceSelector = window.map.mapFiltersForm.querySelector('#housing-price'); // Селектор цены жилья
  var filterHousingRoomsSelector = window.map.mapFiltersForm.querySelector('#housing-rooms'); // Селектор колл-ва комнат
  var filterHousingQuestsSelector = window.map.mapFiltersForm.querySelector('#housing-guests'); // Селектор колл-ва гостей
  var filterHousingFeaturesChecboxes = window.map.mapFiltersForm.querySelectorAll('input[type=checkbox]'); // Кнопки выбора удобств

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  // Функция фильтрации типа жилья
  var getHousingType = function (announcement) {
    return filterHousingTypeSelector.value === 'any' ? true : announcement.offer.type === filterHousingTypeSelector.value;
  };

  // Функция фильтрации цены жилья
  var getHousingPrice = function (announcement) {
    if (filterHousingPriceSelector.value === 'low') {
      return announcement.offer.price < MIN_PRICE;
    } else if (filterHousingPriceSelector.value === 'middle') {
      return announcement.offer.price >= MIN_PRICE && announcement.offer.price <= MAX_PRICE;
    } else if (filterHousingPriceSelector.value === 'high') {
      return announcement.offer.price > MAX_PRICE;
    }

    return true;
  };

  // Функция филтрации колл-ва комнат
  var getHousingRoomsCount = function (announcement) {
    return filterHousingRoomsSelector.value === 'any' ? true : announcement.offer.rooms === parseInt(filterHousingRoomsSelector.value, 10);
  };

  // Функция филтрации колл-ва гостей
  var getHousingQuestsCount = function (announcement) {
    return filterHousingQuestsSelector.value === 'any' ? true : announcement.offer.quests === parseInt(filterHousingQuestsSelector.value, 10);
  };

  // Функция фильтрации объявлений
  var getFilterAnnouncements = function () {
    var filteredPins = window.pin.serverPins.filter(function (announcement) {

      return getHousingType(announcement) && getHousingPrice(announcement) && getHousingRoomsCount(announcement) && getHousingQuestsCount(announcement);
    });

    window.pin.filteredPins = filteredPins;

    return filteredPins;
  };

  window.filter = {
    getFilterAnnouncements: getFilterAnnouncements
  };
})();
