'use strict';

// Модуль работы с метками объявлений
(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_SHARD_END_HEIGHT = 22;

  var map = document.querySelector('.map'); // Карта
  var mainMapPin = map.querySelector('.map__pin--main'); // Главная метка
  var mapPins = document.querySelector('.map__pins'); // Метки объявлений
  var announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
  var addressInput = announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений

  var PIN_TOP_COORDINATE = parseInt(mainMapPin.style.top, 10);
  var PIN_LEFT_COORDINATE = parseInt(mainMapPin.style.left, 10);

  // Функция создания метки объявления
  var createPin = function (pin, pinIndex) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон метки
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
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

  // Функция нахождения координат центра главной метки
  var getPinCenterCoordinate = function () {
    addressInput.value = Math.round(PIN_LEFT_COORDINATE + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP_COORDINATE + PIN_HEIGHT / 2);
  };

  getPinCenterCoordinate();

  // Функция нахождения координат острого конца главной метки
  var getPinSharpEndCoordinate = function () {
    addressInput.value = Math.round(PIN_LEFT_COORDINATE + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP_COORDINATE + PIN_HEIGHT + PIN_SHARD_END_HEIGHT);
  };

  window.pin = {
    map: map,
    mainMapPin: mainMapPin,
    mapPins: mapPins,
    renderPins: renderPins,
    getPinSharpEndCoordinate: getPinSharpEndCoordinate,
    announcementForm: announcementForm,
    addressInput: addressInput
  };
})();
