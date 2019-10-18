'use strict';

// Модуль работы с картой
(function () {
  var mapFilters = document.querySelector('.map__filters-container'); // Блок фильтрации объявлений
  var mapFiltersForm = mapFilters.querySelector('.map__filters'); // Форма фильтраци объявлений
  var filterFormSelects = mapFiltersForm.querySelectorAll('select'); // Селекторы формы фильтрации объявлений
  var announcementFormFieldsets = document.querySelectorAll('fieldset'); // Блоки границ у формы подачи объявлений
  var isPageActive = false;
  var mainPinCurrentX = window.pin.mainMapPin.offsetLeft; // Текущее положение главной метки по X
  var mainPinCurrentY = window.pin.mainMapPin.offsetTop; // Текущее положение главной метки по Y

  var MAIN_PIN_SHARD_END_HEIGHT = 22; // Высота острого конца метки

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
    window.map.isPageActive = true;
    window.backend.load(window.pin.onLoadSuccessHandler, window.pin.onLoadErrorHandler);
    window.pin.map.classList.remove('map--faded');
    window.pin.announcementForm.classList.remove('ad-form--disabled');
    enableInputTags(filterFormSelects, announcementFormFieldsets);
    getPinSharpEndCoordinate();
  };

  // Функция возвращения страницы в исходное состояние
  var getInitialPage = function () {
    var pins = window.pin.mapPins.querySelectorAll('[data-pin-index]'); // Все метки, имеющие атрибут data-pin-index

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }

    window.map.isPageActive = false;
    deleteCard();
    window.pin.map.classList.add('map--faded');
    window.pin.announcementForm.reset();
    window.pin.announcementForm.classList.add('ad-form--disabled');
    disableInputTags(filterFormSelects, announcementFormFieldsets);
    window.pin.mainMapPin.style.left = mainPinCurrentX + 'px';
    window.pin.mainMapPin.style.top = mainPinCurrentY + 'px';
    window.pin.getPinCenterCoordinate();
  };

  // Функция записи в поле "Адрес" коордитнат острого конца главной метки
  var getPinSharpEndCoordinate = function () {
    window.pin.addressInput.value = Math.round(window.map.mainPinCurrentX + window.pin.MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.map.mainPinCurrentY + window.pin.MAIN_PIN_HEIGHT + MAIN_PIN_SHARD_END_HEIGHT);
  };

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
    var announcementCard = window.card.createCard(window.pin.pinsArr[index]);
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

  window.map = {
    isPageActive: isPageActive,
    activatePage: activatePage,
    getInitialPage: getInitialPage,
    getPinSharpEndCoordinate: getPinSharpEndCoordinate,
    mainPinCurrentX: mainPinCurrentX,
    mainPinCurrentY: mainPinCurrentY,
    MAIN_PIN_SHARD_END_HEIGHT: MAIN_PIN_SHARD_END_HEIGHT,
    deleteCard: deleteCard
  };
})();
