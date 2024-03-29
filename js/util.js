'use strict';

(function (exports) {

  exports.makeDraggable = function (el, dragHandle) {
    var startX;
    var startY;
    var dragging = false;
    function dragHandlePreventDefault(evt) {
      evt.preventDefault();
    }
    function mouseDownHandler(evt) {
      evt.preventDefault();
      startX = evt.clientX;
      startY = evt.clientY;
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      dragHandle.addEventListener('click', dragHandlePreventDefault);
    }
    function mouseMoveHandler(evt) {
      evt.preventDefault();
      el.style.position = 'absolute';
      el.style.left = el.offsetLeft + (evt.clientX - startX) + 'px';
      el.style.top = el.offsetTop + (evt.clientY - startY) + 'px';
      startX = evt.clientX;
      startY = evt.clientY;
      dragging = true;
    }
    function mouseUpHandler(evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      if (!dragging) {
        dragHandle.removeEventListener('click', dragHandlePreventDefault);
      }
      dragging = false;
    }

    dragHandle.addEventListener('mousedown', mouseDownHandler);
  };

  exports.createArraySwitcher = function (arr) {
    var index = 0;
    return function () {
      if (++index >= arr.length) {
        index = 0;
      }
      return arr[index];
    };
  };

  exports.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  exports.getRandomElement = function (arr) {
    return arr[exports.getRandomInt(0, arr.length - 1)];
  };


  window.util = exports;

})({});
