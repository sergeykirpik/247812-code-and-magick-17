'use strict';

(function () {
  var AnimationController = window.animation.AnimationController;

  var MSG_TIMEOUT = 4000;
  var FADE_DURATION = 800;

  var showMessage = function (text, alertClass) {
    var el = document.createElement('div');
    el.className = 'alert ' + alertClass;
    el.textContent = text;
    el.style.opacity = 0.0;

    document.body.appendChild(el);

    var fadeOut = new AnimationController(FADE_DURATION);
    fadeOut.onUpdate = function (time) {
      el.style.opacity = 1.0 - time;
    };
    fadeOut.onComplete = function () {
      el.remove();
    };

    var fadeIn = new AnimationController(FADE_DURATION);
    fadeIn.onUpdate = function (time) {
      el.style.opacity = time;
    };
    fadeIn.onComplete = function () {
      setTimeout(function () {
        fadeOut.start();
      }, MSG_TIMEOUT);
    };
    fadeIn.start();
  };

  window.msg = {
    success: function (text) {
      showMessage(text, 'alert-success');
    },
    error: function (text) {
      showMessage(text, 'alert-error');
    }
  };
})();
