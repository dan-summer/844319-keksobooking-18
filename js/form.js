'use strict';

// Модуль работы с формой объявления
(function () {
  var MinHousingTypePrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };
  var TITLE_INPUT_MIN_LENGTH = 30;
  var TITLE_INPUT_MAX_LENGTH = 100;
  var PER_NIGHT_INPUT_MAX_PRICE = 1000000;

  var announcementTitleInput = window.pin.announcementForm.querySelector('#title'); // Поле ввода заголовка объявления
  var housingTypeSelector = window.pin.announcementForm.querySelector('#type'); // Селектор выбора типа жилья
  var pricePerNightInput = window.pin.announcementForm.querySelector('#price'); // Поле выбора цены за ночь
  var checkInTimeSelector = window.pin.announcementForm.querySelector('#timein'); // Селектор выбора времени заезда
  var checkOutTimeSelector = window.pin.announcementForm.querySelector('#timeout'); // Селектор выбора времени выезда
  var roomsCountSelector = window.pin.announcementForm.querySelector('#room_number'); // Селектор выбора колличества комнат
  var questsCountSelector = window.pin.announcementForm.querySelector('#capacity'); // Селектор выбора колличества гостей

  // Функция валидации соответсвтия колл-ва комнат от колл-ва гостей
  var getMatchingInputsValidation = function () {
    var roomsSelectedValue = parseInt(roomsCountSelector.value, 10);
    var questsOptions = questsCountSelector.options;

    for (var i = 0; i < questsOptions.length; i++) {
      var questsOptionValue = parseInt(questsCountSelector.options[i].value, 10);

      if (roomsSelectedValue === 100) {
        if (questsOptionValue !== 0) {
          questsOptions[i].disabled = true;
        } else {
          questsOptions[i].disabled = false;
          questsOptions[i].selected = true;
        }
      } else {
        if (questsOptionValue > roomsSelectedValue || questsOptionValue === 0) {
          questsOptions[i].disabled = true;
        } else {
          questsOptions[i].disabled = false;
          questsOptions[i].selected = true;
        }
      }
    }
  };

  getMatchingInputsValidation();
  // Событие изменения значения селектора кол-ва комнат
  roomsCountSelector.addEventListener('change', getMatchingInputsValidation);

  // Валидация поля ввода "заголовок объявления"
  announcementTitleInput.minLength = TITLE_INPUT_MIN_LENGTH;
  announcementTitleInput.maxLength = TITLE_INPUT_MAX_LENGTH;
  announcementTitleInput.required = true;

  // Валидация поля "Адрес"
  window.pin.addressInput.readOnly = true;

  // Валидация поля "Цена за ночь, руб"
  pricePerNightInput.max = PER_NIGHT_INPUT_MAX_PRICE;
  pricePerNightInput.required = true;

  // Функция получения минимальной цены типа жилья
  var getHousingTypeMinPrice = function () {
    var selectedHousingTypeValue = housingTypeSelector.value.toUpperCase();
    pricePerNightInput.min = MinHousingTypePrice[selectedHousingTypeValue];
    pricePerNightInput.placeholder = MinHousingTypePrice[selectedHousingTypeValue];

  };

  getHousingTypeMinPrice();
  // Событие изменения значения селектора типа жилья
  housingTypeSelector.addEventListener('change', getHousingTypeMinPrice);

  // Функция соответствия времени заезда от времени выезда
  var getCheckingTimes = function (checkingValue) {
    checkInTimeSelector.value = checkOutTimeSelector.value = checkingValue;
  };

  getCheckingTimes(checkInTimeSelector.value);
  // Событие изменения значения селектора времени заезда
  checkInTimeSelector.addEventListener('change', function (evt) {
    getCheckingTimes(evt.target.value);
  });
  // Событие изменения значения селектора времени выезда
  checkOutTimeSelector.addEventListener('change', function (evt) {
    getCheckingTimes(evt.target.value);
  });
})();
