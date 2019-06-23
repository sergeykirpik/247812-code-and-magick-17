'use strict';

(function () {

  function makeDraggable(el, dragHandle) {
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
  }

  var dialog = document.querySelector('.setup');
  dialog.classList.remove('hidden');

  var dragHandle = dialog.querySelector('.upload');

  makeDraggable(dialog, dragHandle);

})();
