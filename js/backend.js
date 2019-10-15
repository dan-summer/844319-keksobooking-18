'use strict';

// Модуль работы с сервером данных
(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data'; // адрес загрузки данных с сервера
  var XHR_TIMEOUT = 10000; // Таймаут запроса = 10 сек
  var SUCCESS_REQUEST_STATUS = 200; // Статус успешного запроса

  // Функция загрузки данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_REQUEST_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = XHR_TIMEOUT;

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
