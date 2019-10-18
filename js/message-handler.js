'use strict';

// Модуль обработки сообщений
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Шаблон ошибки создания объявления
  var errorElement = errorTemplate.cloneNode(true);

  var successTemplate = document.querySelector('#success').content.querySelector('.success'); // Шаблон сообщения об успешной отправки формы
  var successElement = successTemplate.cloneNode(true);

  // Функция обратного вызова обработчика события неуспешной загрузки данных c сервера
  var onLoadErrorHandler = function (errorMessage) {
    errorElement.querySelector('.error__message').textContent = errorMessage;
    if (errorMessage === '') {
      errorTemplate.querySelector('.error__message').textContent = errorMessage;
    }
    window.pin.main.appendChild(errorElement);
    errorElement.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  //  Функция скрытия сообщения об ишибке загрузки данных по клику
  var onErrorMessageClick = function () {
    removeErrorMessage();
    document.removeEventListener('click', onErrorMessageClick);
  };

  // Функция скрытия сообщения об ошибке загрузки данных по нажатию ESC
  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.key.ESC_KEYCODE) {
      removeErrorMessage();
    }
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  // Функция удаления сообщения об ошибке загрузки данных из разметки
  var removeErrorMessage = function () {
    if (errorElement) {
      errorElement.remove();
    }
  };

  // _________________________________________________________________________________________________________________________________________

  // Функция обратного вызова обработчика события успешной загрузки данных на сервер
  var onSaveSuccessHandler = function (successMassage) {
    window.map.getInitialPage();
    successElement.querySelector('.success__message').textContent = successMassage;
    window.pin.main.appendChild(successTemplate);
    successElement.addEventListener('click', onSuccessMessageClick);
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

  window.messageHandler = {
    onLoadErrorHandler: onLoadErrorHandler,
    onSaveSuccessHandler: onSaveSuccessHandler
  };
})();
