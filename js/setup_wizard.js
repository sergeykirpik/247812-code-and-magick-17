'use strict';

(function () {

  var util = window.util;

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  function noop() {}

  function SetupWizard(wizardEl) {
    var thisWizard = this;


    this.onValueChanged = noop;
    this.setCoatColor(COAT_COLORS[0]);
    this.setEyesColor(EYES_COLORS[0]);
    this.setFireballColor(FIREBALL_COLORS[0]);

    var wizardCoat = wizardEl.querySelector('.wizard-coat');
    wizardCoat.nextColor = util.createArraySwitcher(COAT_COLORS);
    wizardCoat.addEventListener('click', function () {
      var newColor = wizardCoat.nextColor();
      wizardCoat.style.fill = newColor;
      thisWizard.setCoatColor(newColor);
    });

    var wizardEyes = wizardEl.querySelector('.wizard-eyes');
    wizardEyes.nextColor = util.createArraySwitcher(EYES_COLORS);
    wizardEyes.addEventListener('click', function () {
      var newColor = wizardEyes.nextColor();
      wizardEyes.style.fill = newColor;
      thisWizard.setEyesColor(newColor);
    });

    var fireballWrap = wizardEl.querySelector('.setup-fireball-wrap');
    fireballWrap.nextColor = util.createArraySwitcher(FIREBALL_COLORS);
    fireballWrap.addEventListener('click', function () {
      var newColor = fireballWrap.nextColor();
      fireballWrap.style.backgroundColor = newColor;
      thisWizard.setFireballColor(newColor);
    });

  }

  SetupWizard.prototype = {
    setCoatColor: function (val) {
      this.colorCoat = val;
      this.onValueChanged('coat-color', val);
    },
    setEyesColor: function (val) {
      this.colorEyes = val;
      this.onValueChanged('eyes-color', val);
    },
    setFireballColor: function (val) {
      this.colorFireball = val;
      this.onValueChanged('fireball-color', val);
    }
  };

  window.SetupWizard = SetupWizard;
})();
