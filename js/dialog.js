'use strict';

(function () {

  var util = window.util;

  var dialog = document.querySelector('.setup');
  var dragHandle = dialog.querySelector('.upload');
  util.makeDraggable(dialog, dragHandle);

  var shopItem = document.querySelector('.setup-artifacts-cell img');
  util.makeDraggable(shopItem, shopItem);

})();
