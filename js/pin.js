'use strict';

// Модуль работы с метками объявлений
(function () {
  var PINS_COUNT = 5;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;

  var main = document.querySelector('main'); // Блок <main>
  var map = document.querySelector('.map'); // Карта
  var mainMapPin = map.querySelector('.map__pin--main'); // Главная метка
  var mapPins = document.querySelector('.map__pins'); // Метки объявлений
  var announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
  var addressInput = announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений

  // Стартовые координаты главной метки
  var mainPinStartCoords = {
    top: parseInt(mainMapPin.style.top, 10),
    left: parseInt(mainMapPin.style.left, 10)
  };

  // Функция создания метки объявления
  var createPin = function (pin, pinIndex) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон метки
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - MAIN_PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - MAIN_PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.dataset.pinIndex = pinIndex;

    return pinElement;
  };

  // Добавление элементов с метками на страницу
  var renderPins = function (serverDataArr) {
    var fragment = document.createDocumentFragment();

    serverDataArr.slice(0, PINS_COUNT).forEach(function (data, i) {
      if (data.offer) {
        fragment.appendChild(createPin(data, i));
      }
    });
    mapPins.appendChild(fragment);
  };

  // Функция обратного вызова обработчика события успешной загрузки данных с сервера
  var onLoadSuccessHandler = function (serverDataArr) {
    window.pin.serverPins = serverDataArr;
    renderPins(window.filter.getFilterAnnouncements());
    window.map.enableInputTags(window.map.filterFormSelects);
    window.map.enableInputTags(window.map.filterFormsFieldsets);
  };

  // Функция записи координат центра главной метки в поле "Адрес"
  var getPinCenterCoordinate = function () {
    addressInput.value = Math.round(mainPinStartCoords.left + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(mainPinStartCoords.top + MAIN_PIN_HEIGHT / 2);
  };

  getPinCenterCoordinate();

  window.pin = {
    main: main,
    map: map,
    mainMapPin: mainMapPin,
    mapPins: mapPins,
    announcementForm: announcementForm,
    addressInput: addressInput,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    renderPins: renderPins,
    onLoadSuccessHandler: onLoadSuccessHandler,
    getPinCenterCoordinate: getPinCenterCoordinate
  };
})();
