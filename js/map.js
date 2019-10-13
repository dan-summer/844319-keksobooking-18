'use strict';

// Модуль работы с картой
(function () {
  var mapFilters = document.querySelector('.map__filters-container'); // Блок фильтрации объявлений
  var mapFiltersForm = mapFilters.querySelector('.map__filters'); // Форма фильтраци объявлений
  var filterFormSelects = mapFiltersForm.querySelectorAll('select'); // Селекторы формы фильтрации объявлений
  var announcementFormFieldsets = document.querySelectorAll('fieldset'); // Блоки границ у формы подачи объявлений
  var mainPinHalfWidth = window.pin.MAIN_PIN_WIDTH / 2; // Ширина половины главной метки
  var mainPinHeight = window.pin.MAIN_PIN_HEIGHT; // Высота главной метки
  var mainPinShardEndHeight = window.pin.MAIN_PIN_SHARD_END_HEIGHT; // Высота острого конца метки
  var isPageActive = false;
  var cursorCoordX = parseInt(window.pin.mainMapPin.style.left, 10); // Координата курсора мыши по X
  var cursorCoordY = parseInt(window.pin.mainMapPin.style.top, 10); // Координата курсора мыши по Y
  var mainPinCurrentX = window.pin.mainMapPin.offsetLeft; // Текущее положение главной метки по X
  var mainPinCurrentY = window.pin.mainMapPin.offsetTop; // Текущее положение главной метки по Y
  // Ограничение главной метки по X
  var mainPinLimitXMin = window.data.LOCATION_X_MIN - mainPinHalfWidth;
  var mainPinLimitXMax = window.data.LOCATION_X_MAX - mainPinHalfWidth;
  // Ограничение главной метки по Y
  var mainPinLimitYMin = window.data.LOCATION_Y_MIN - mainPinHeight - window.pin.MAIN_PIN_SHARD_END_HEIGHT;
  var mainPinLimitYMax = window.data.LOCATION_Y_MAX - mainPinHeight - window.pin.MAIN_PIN_SHARD_END_HEIGHT;

  // Функция отключения полей ввода
  var disableInputTags = function (select, fieldset) {
    for (var i = 0; i < select.length; i++) {
      select[i].disabled = true;
    }
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  };

  disableInputTags(filterFormSelects, announcementFormFieldsets);

  // Функция включения полей ввода
  var enableInputTags = function (select, fieldset) {
    for (var i = 0; i < select.length; i++) {
      select[i].disabled = false;
    }
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  };

  // Функция активации страницы
  var activatePage = function () {
    isPageActive = true;
    window.backend.load(window.data.loadData, window.pin.onLoadError);
    window.pin.map.classList.remove('map--faded');
    window.pin.announcementForm.classList.remove('ad-form--disabled');
    // window.pin.renderPins();
    enableInputTags(filterFormSelects, announcementFormFieldsets);
    getPinSharpEndCoordinate(mainPinCurrentX, mainPinCurrentY);
  };

  // Функция записи в поле "Адрес" коордитнат острого конца главной метки
  var getPinSharpEndCoordinate = function (pinLeft, pinTop) {
    window.pin.addressInput.value = Math.round(pinLeft + mainPinHalfWidth) + ', ' + Math.round(pinTop + mainPinHeight + mainPinShardEndHeight);
  };

  // Событие перемещения главной метки по карте
  window.pin.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!isPageActive) {
      activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinCurrentX = window.pin.mainMapPin.offsetLeft - shift.x;
      mainPinCurrentY = window.pin.mainMapPin.offsetTop - shift.y;

      cursorCoordX = cursorCoordX - shift.x;
      cursorCoordY = cursorCoordY - shift.y;

      if (mainPinCurrentX > mainPinLimitXMax || cursorCoordX > mainPinLimitXMax) {
        mainPinCurrentX = mainPinLimitXMax;
      } else if (mainPinCurrentX < mainPinLimitXMin || cursorCoordX < mainPinLimitXMin) {
        mainPinCurrentX = mainPinLimitXMin;
      }
      if (mainPinCurrentY > mainPinLimitYMax || cursorCoordY > mainPinLimitYMax) {
        mainPinCurrentY = mainPinLimitYMax;
      } else if (mainPinCurrentY < mainPinLimitYMin || cursorCoordY < mainPinLimitYMin) {
        mainPinCurrentY = mainPinLimitYMin;
      }

      window.pin.mainMapPin.style.top = mainPinCurrentY + 'px';
      window.pin.mainMapPin.style.left = mainPinCurrentX + 'px';
      getPinSharpEndCoordinate(mainPinCurrentX, mainPinCurrentY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Событие нажатия Enter по главной метке
  window.pin.mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.key.ENTER_KEYCODE) {
      activatePage();
    }
  });

  // Удаление карточки по нажатию ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      deleteCard();
    }
  };

  // Удаление карточки по клику на крестик
  var onPopupCloseButtonClick = function () {
    deleteCard();
  };

  // Вставка карточки на страницу
  var renderCard = function (index) {
    var announcementCard = window.card.createCard(window.data.announcements[index]);
    deleteCard();
    window.pin.map.insertBefore(announcementCard, mapFilters);
    var popupButtonClose = announcementCard.querySelector('.popup__close');
    popupButtonClose.addEventListener('click', onPopupCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция удаления карточки из разметки
  var deleteCard = function () {
    var cardPopup = window.pin.map.querySelector('.popup');
    if (cardPopup) {
      var popupButtonClose = cardPopup.querySelector('.popup__close');
      popupButtonClose.removeEventListener('click', onPopupCloseButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
      cardPopup.remove();
    }
  };

  // Событие клика по одной из доступных меток объявлений
  window.pin.mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target.closest('button');
    if (targetElement && targetElement.dataset.pinIndex !== undefined) {
      renderCard(targetElement.dataset.pinIndex);
    }
  });
})();
