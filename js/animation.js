'use strict';

(function () {
  var UPDATE_INTERVAL = 100;
  var ONE_SECOND = 1000;

  var AnimationController = function (duration) {
    this.onUpdate = null;
    this.onComplete = null;
    this.duration = duration;
  };

  AnimationController.prototype = {
    start: function () {
      var controller = this;
      var time = 0.0;
      var animationInterval = setInterval(function () {
        if (time > 1.0) {
          clearInterval(animationInterval);
          if (controller.onComplete) {
            controller.onComplete();
          }
        } else {
          time += (UPDATE_INTERVAL / ONE_SECOND) * (ONE_SECOND / controller.duration);
          if (controller.onUpdate) {
            controller.onUpdate(time);
          }
        }
      }, UPDATE_INTERVAL);
    }
  };

  window.animation = {
    AnimationController: AnimationController
  };

})();
