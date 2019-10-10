'use strict';

// Модуль работы с метками объявлений
(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_SHARD_END_HEIGHT = 22;

  var map = document.querySelector('.map'); // Карта
  var mainMapPin = map.querySelector('.map__pin--main'); // Главная метка
  var mapPins = document.querySelector('.map__pins'); // Метки объявлений
  var announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
  var addressInput = announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений

  var MAIN_PIN_START_TOP_COORD = parseInt(mainMapPin.style.top, 10);
  var MAIN_PIN_START_LEFT_COORD = parseInt(mainMapPin.style.left, 10);

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
  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.announcements.length; i++) {
      fragment.appendChild(createPin(window.data.announcements[i], i));
    }
    mapPins.appendChild(fragment);
  };

  // Запись координат центра главной метки в поле "Адрес"
  addressInput.value = Math.round(MAIN_PIN_START_LEFT_COORD + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(MAIN_PIN_START_TOP_COORD + MAIN_PIN_HEIGHT / 2);

  window.pin = {
    map: map,
    mainMapPin: mainMapPin,
    mapPins: mapPins,
    renderPins: renderPins,
    announcementForm: announcementForm,
    addressInput: addressInput,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_START_TOP_COORD: MAIN_PIN_START_TOP_COORD,
    MAIN_PIN_START_LEFT_COORD: MAIN_PIN_START_LEFT_COORD,
    MAIN_PIN_SHARD_END_HEIGHT: MAIN_PIN_SHARD_END_HEIGHT
  };
})();