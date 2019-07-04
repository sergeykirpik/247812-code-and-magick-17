'use strict';

(function () {
  var AnimationController = window.animation.AnimationController;

  var MSG_STYLE = 'text-align: center; position: absolute; color: white; font-size: 30px; left: 50%; top: 30%; transform: translate(-50%, 0%); z-index: 100; padding: 10px 20px; border: 3px solid white; border-radius: 10px;';
  var MSG_TIMEOUT = 4000;
  var FADE_DURATION = 800;

  var showMessage = function (text, color) {
    var el = document.createElement('div');
    el.style = MSG_STYLE;
    el.style.background = color;
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
      showMessage(text, 'green');
    },
    error: function (text) {
      showMessage(text, 'red');
    }
  };
})();
