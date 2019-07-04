'use strict';

(function () {
  var GET_SIMILAR_WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_FORM_DATA_URL = 'https://js.dump.academy/code-and-magick';
  var DEFAULT_XHR_TIMEOUT = 5000;

  function Loader(method, url) {
    var loader = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = DEFAULT_XHR_TIMEOUT;
    xhr.open(method, url);
    this.onSuccess = null;
    this.onError = null;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var data = null;
        try {
          data = JSON.parse(xhr.responseText);
        } catch (err) {
          if (loader.onError) {
            loader.onError('Плохой формат ответа сервера: ' + err);
          }
        }
        if (loader.onSuccess) {
          loader.onSuccess(data);
        }
      } else {
        loader.onError('Ошибка с кодом ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      if (loader.onError) {
        loader.onError('Ошибка соединения');
      }
    });

    xhr.addEventListener('timeout', function () {
      if (loader.onError) {
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
      loader.onSuccess = onLoad;
      loader.onError = onError;
      loader.send();
    },
    save: function (formData, onLoad, onError) {
      var loader = new Loader('POST', SAVE_FORM_DATA_URL);
      loader.onSuccess = function (data) {
        onLoad(data);
      };
      loader.onError = function (err) {
        if (onError) {
          onError(err);
        }
      };
      loader.send(formData);
    }
  };
})();
