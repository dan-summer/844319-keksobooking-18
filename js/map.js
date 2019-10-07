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
    window.map.classList.remove('map--faded');
    window.announcementForm.classList.remove('ad-form--disabled');
    window.renderPins();
    window.getPinSharpEndCoordinate();
  };

  // Событие mousedown на главной метке
  window.mainMapPin.addEventListener('mousedown', function () {
    activatePage();
    enableInputTags(filterFormSelects, announcementFormFieldsets);
  });

  // Событие нажатия Enter по главной метке
  window.mainMapPin.addEventListener('keydown', function (evt) {
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
    var announcementCard = window.createCard(window.announcements[index]);
    deleteCard();
    window.map.insertBefore(announcementCard, mapFilters);
    var popupButtonClose = announcementCard.querySelector('.popup__close');
    popupButtonClose.addEventListener('click', onPopupCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция удаления карточки из разметки
  var deleteCard = function () {
    var cardPopup = window.map.querySelector('.popup');
    if (cardPopup) {
      var popupButtonClose = cardPopup.querySelector('.popup__close');
      popupButtonClose.removeEventListener('click', onPopupCloseButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
      cardPopup.remove();
    }
  };

  // Событие клика по одной из доступных меток объявлений
  window.mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target.closest('button');
    if (targetElement && targetElement.dataset.pinIndex !== undefined) {
      renderCard(targetElement.dataset.pinIndex);
    }
  });
})();
