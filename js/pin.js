'use strict';

// Модуль работы с метками объявлений
(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_SHARD_END_HEIGHT = 22;

  window.map = document.querySelector('.map'); // Карта
  window.mainMapPin = window.map.querySelector('.map__pin--main'); // Главная метка
  window.mapPins = document.querySelector('.map__pins'); // Метки объявлений
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон метки
  window.announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
  window.addressInput = window.announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений

  var PIN_TOP_COORDINATE = parseInt(window.mainMapPin.style.top, 10);
  var PIN_LEFT_COORDINATE = parseInt(window.mainMapPin.style.left, 10);

  // Функция создания метки объявления
  var createPin = function (pin, pinIndex) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.dataset.pinIndex = pinIndex;

    return pinElement;
  };

  // Добавление элементов с метками на страницу
  window.renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.announcements.length; i++) {
      fragment.appendChild(createPin(window.announcements[i], i));
    }
    window.mapPins.appendChild(fragment);
  };

  // Функция нахождения координат центра главной метки
  var getPinCenterCoordinate = function () {
    window.addressInput.value = Math.round(PIN_LEFT_COORDINATE + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP_COORDINATE + PIN_HEIGHT / 2);
  };

  getPinCenterCoordinate();

  // Функция нахождения координат острого конца главной метки
  window.getPinSharpEndCoordinate = function () {
    window.addressInput.value = Math.round(PIN_LEFT_COORDINATE + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP_COORDINATE + PIN_HEIGHT + PIN_SHARD_END_HEIGHT);
  };
})();
