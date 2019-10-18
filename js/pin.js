'use strict';

// Модуль работы с метками объявлений
(function () {
  var main = document.querySelector('main'); // Блок <main>
  var map = document.querySelector('.map'); // Карта
  var mainMapPin = map.querySelector('.map__pin--main'); // Главная метка
  var mapPins = document.querySelector('.map__pins'); // Метки объявлений
  var announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
  var addressInput = announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений
  var errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Шаблон ошибки создания объявления
  var errorElement = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success').content.querySelector('.success'); // Шаблон сообщения об успешной отправки формы

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
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
  var renderPins = function (serverDataArr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < serverDataArr.length; i++) {
      if (serverDataArr[i].offer) {
        fragment.appendChild(createPin(serverDataArr[i], i));
      }
    }
    mapPins.appendChild(fragment);
  };

  // Функция обратного вызова обработчика события успешной загрузки данных с сервера
  var onLoadSuccessHandler = function (serverDataArr) {
    renderPins(serverDataArr);
    window.pin.pinsArr = serverDataArr;
  };

  // Функция обратного вызова обработчика события неуспешной загрузки данных c сервера
  var onLoadErrorHandler = function (errorMessage) {
    errorElement.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(errorElement);
    console.log('onLoadErrorHandler');
    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  //  Функция скрытия сообщения об ишибке загрузки данных по клику
  var onErrorMessageClick = function () {
    console.log('onErrorMessageClick');
    removeErrorMessage();
    document.removeEventListener('click', onErrorMessageClick);
  };

  // Функция скрытия сообщения об ошибке загрузки данных по нажатию ESC
  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      console.log('onErrorMessageEscPress');
      removeErrorMessage();
    }
    console.log('onErrorMessageEscPress');
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  // Функция удаления сообщения об ошибке загрузки данных из разметки
  var removeErrorMessage = function () {
    if (errorElement) {
      console.log('removeErrorMessage');
      errorElement.remove();
    }
  };
  // _________________________________________________________________________________________________________________________________________
  // Функция обратного вызова обработчика события успешной загрузки данных на сервер
  var onSaveSuccessHandler = function (successMassage) {
    var successElement = successTemplate.cloneNode(true);

    window.map.getInitialPage();
    successElement.querySelector('.success__message').textContent = successMassage;
    main.appendChild(successTemplate);

    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  //  Функция скрытия сообщения успешной отправки формы по клику
  var onSuccessMessageClick = function () {
    removeSuccessMessage();

    document.removeEventListener('click', onSuccessMessageClick);
  };

  // Функция скрытия сообщения успешной отправки формы по нажатию ESC
  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      removeSuccessMessage();
    }

    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  // Функция удаления сообщения успешной отправки формы из разметки
  var removeSuccessMessage = function () {
    if (successTemplate) {
      successTemplate.remove();
    }
  };

  // Функция записи координат центра главной метки в поле "Адрес"
  var getPinCenterCoordinate = function () {
    addressInput.value = Math.round(MAIN_PIN_START_LEFT_COORD + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(MAIN_PIN_START_TOP_COORD + MAIN_PIN_HEIGHT / 2);
  };

  getPinCenterCoordinate();

  window.pin = {
    map: map,
    mainMapPin: mainMapPin,
    mapPins: mapPins,
    announcementForm: announcementForm,
    addressInput: addressInput,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    renderPins: renderPins,
    onLoadSuccessHandler: onLoadSuccessHandler,
    onLoadErrorHandler: onLoadErrorHandler,
    onSaveSuccessHandler: onSaveSuccessHandler,
    getPinCenterCoordinate: getPinCenterCoordinate
  };
})();
