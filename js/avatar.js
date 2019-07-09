'use strict';

(function () {

  var PIC_TYPES = ['.gif', '.jpg', '.jpeg', '.png', '.ico'];

  var isPicture = function (file) {
    if (!file) {
      return false;
    }
    var fileName = file.name.toLowerCase();
    return PIC_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var filechooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  filechooser.addEventListener('change', function () {
    var file = filechooser.files[0];
    if (isPicture(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
