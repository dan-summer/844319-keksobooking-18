'use strict';

// Модуль работы с картой
(function () {
  var mapFilters = document.querySelector('.map__filters-container'); // Блок фильтрации объявлений
  var mapFiltersForm = mapFilters.querySelector('.map__filters'); // Форма фильтраци объявлений
  var filterFormSelects = mapFiltersForm.querySelectorAll('select'); // Селекторы формы фильтрации объявлений
  var announcementFormFieldsets = document.querySelectorAll('fieldset'); // Блоки границ у формы подачи объявлений

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
    window.pin.map.classList.remove('map--faded');
    window.pin.announcementForm.classList.remove('ad-form--disabled');
    window.pin.renderPins();
    // window.pin.getPinSharpEndCoordinate(window.pin.MAIN_PIN_LEFT_COORDINATE, window.pin.MAIN_PIN_TOP_COORDINATE);
  };

  // Событие mousedown на главной метке
  // window.pin.mainMapPin.addEventListener('mousedown', function () {
  //   activatePage();
  //   enableInputTags(filterFormSelects, announcementFormFieldsets);
  // });

  window.pin.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();
    enableInputTags(filterFormSelects, announcementFormFieldsets);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var mainPinTop = parseInt(window.pin.mainMapPin.style.top, 10);
      var mainPinLeft = parseInt(window.pin.mainMapPin.style.left, 10);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pin.mainMapPin.style.top = window.pin.mainMapPin.offsetTop - shift.y + 'px';
      window.pin.mainMapPin.style.left = window.pin.mainMapPin.offsetLeft - shift.x + 'px';
      window.pin.getPinSharpEndCoordinate(mainPinLeft, mainPinTop);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var mainPinTop = parseInt(window.pin.mainMapPin.style.top, 10);
      var mainPinLeft = parseInt(window.pin.mainMapPin.style.left, 10);

      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.pin.mainMapPin.style.top = window.pin.mainMapPin.offsetTop - shift.y + 'px';
      window.pin.mainMapPin.style.left = window.pin.mainMapPin.offsetLeft - shift.x + 'px';
      window.pin.getPinSharpEndCoordinate(mainPinLeft, mainPinTop);

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
      enableInputTags(filterFormSelects, announcementFormFieldsets);
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
