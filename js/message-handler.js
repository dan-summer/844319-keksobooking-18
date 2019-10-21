'use strict';

// Модуль обработки сообщений
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Шаблон ошибки создания объявления
  var errorElement = errorTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');

  var successTemplate = document.querySelector('#success').content.querySelector('.success'); // Шаблон сообщения об успешной отправки формы
  var successElement = successTemplate.cloneNode(true);

  // Функция обратного вызова обработчика события неуспешной загрузки данных c сервера
  var onLoadErrorHandler = function (errorMessage) {
    errorElement.querySelector('.error__message').textContent = errorMessage;

    window.pin.main.appendChild(errorElement);

    errorElement.addEventListener('click', onErrorMessageClick);
    errorButton.addEventListener('click', onTryAgainButtonClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  // Функция скрытия сообщения об ишибке загрузки данных по клику
  var onErrorMessageClick = function () {
    removeMessage(errorElement);
    document.removeEventListener('click', onErrorMessageClick);
  };

  // Функция скрытия сообщения об ошибке загрузки данных по нажатию ESC
  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      removeMessage(errorElement);
    }
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  // Функция обработки события нажатия на кнопку "Попробовать снова"
  var onTryAgainButtonClick = function (evt) {
    evt.stopPropagation();
    window.backend.load(window.pin.onLoadSuccessHandler, window.messageHandler.onLoadErrorHandler);
    errorElement.remove();
    errorButton.removeEventListener('click', onTryAgainButtonClick);
  };

  // Функция удаления из разметки сообщения загрузки данных
  var removeMessage = function (htmlElement) {
    if (htmlElement) {
      htmlElement.remove();
    }
  };

  // Функция обратного вызова обработчика события успешной загрузки данных на сервер
  var onSaveSuccessHandler = function () {
    window.map.getInitialPage();
    window.pin.main.appendChild(successElement);
    successElement.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  // Функция скрытия сообщения успешной отправки формы по клику
  var onSuccessMessageClick = function () {
    removeMessage(successElement);
    document.removeEventListener('click', onSuccessMessageClick);
  };

  // Функция скрытия сообщения успешной отправки формы по нажатию ESC
  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      removeMessage(successElement);
    }
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  window.messageHandler = {
    onLoadErrorHandler: onLoadErrorHandler,
    onSaveSuccessHandler: onSaveSuccessHandler
  };
})();
