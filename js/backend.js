'use strict';

(function () {
  var GET_SIMILAR_WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_FORM_DATA_URL = 'https://js.dump.academy/code-and-magick';
  var DEFAULT_XHR_TIMEOUT = 3000;

  function noop() {}

  function Loader(method, url) {
    var loader = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = DEFAULT_XHR_TIMEOUT;
    xhr.open(method, url);
    this.onSuccess = noop;
    this.onError = noop;
    this.onTimeout = null;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var data = null;
        try {
          data = JSON.parse(xhr.responseText);
        } catch (err) {
          loader.onError('Плохой формат ответа сервера: ' + err);
        }
        loader.onSuccess(data);
      } else {
        loader.onError('Ошибка с кодом ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      loader.onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      if (loader.onTimeout) {
        loader.onTimeout();
      } else {
        loader.onError('Таймаут соединения');
      }
    });
    this.xhr = xhr;
  }
  Loader.prototype.send = function (body) {
    this.xhr.send(body);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var loader = new Loader('GET', GET_SIMILAR_WIZARDS_URL);
      loader.onSuccess = onLoad || noop;
      loader.onError = onError || noop;
      loader.onTimeout = function () {
        window.msg.warning('Таймаут соединения: работаем в демо-режиме');
        onLoad(window.mockdata);
      };
      loader.send();
    },
    save: function (formData, onLoad, onError) {
      var loader = new Loader('POST', SAVE_FORM_DATA_URL);
      loader.onSuccess = onLoad || noop;
      loader.onError = onError || noop;
      loader.send(formData);
    }
  };
})();
