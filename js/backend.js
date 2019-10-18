'use strict';

// Модуль работы с сервером данных
(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data'; // адрес загрузки данных с сервера
  var SAVE_URL = 'https://js.dump.academy/keksobooking1'; // адрес загрузки данных на сервер
  var XHR_TIMEOUT = 10000; // Таймаут запроса = 10 сек
  var SUCCESS_REQUEST_STATUS = 200; // Статус успешного запроса

  // Функция загрузки данных с сервера
  var load = function (onLoad, onError) {
    var xhr = xhrSetup('GET', LOAD_URL, onLoad, onError);
    xhr.send();
  };

  // Функция отправки данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = xhrSetup('POST', SAVE_URL, onLoad, onError);
    xhr.send(data);
  };

  // Функция - паттерн DRY
  var xhrSetup = function (method, url, onLoad, onError) {
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
    xhr.open(method, url);

    return xhr;
  };

  window.backend = {
    load: load,
    save: save
  };
})();
