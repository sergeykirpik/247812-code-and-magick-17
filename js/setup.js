'use strict';

(function () {

  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  var SECOND_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

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

  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  function createArraySwitcher(arr) {
    var index = 0;
    return function () {
      if (++index >= arr.length) {
        index = 0;
      }
      return arr[index];
    };
  }

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  var generateMockData = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      wizards[i] = {
        name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
        coatColor: getRandomElement(COAT_COLORS),
        eyesColor: getRandomElement(EYES_COLORS),
      };
    }
    return wizards;
  };

  var renderWizardElement = function (wizard, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizardElement(wizard, wizardTemplate));
    });

    var setupSimilarListEl = document.querySelector('.setup-similar-list');
    setupSimilarListEl.innerHTML = '';
    setupSimilarListEl.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var setupDialog = document.querySelector('.setup');
  setupDialog.form = setupDialog.querySelector('.setup-wizard-form');

  setupDialog.open = function () {
    renderSimilarWizards(generateMockData(4));
    setupDialog.style.left = '';
    setupDialog.style.top = '';
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupDialog.escKeyDownHandler);
    document.addEventListener('keydown', setupDialog.enterKeyDownHandler, true);
    setupDialog.userName.focus();
  };

  setupDialog.close = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupDialog.escKeyDownHandler);
    document.removeEventListener('keydown', setupDialog.enterKeyDownHandler);
    setupDialog.form.reset();
  };

  setupDialog.escKeyDownHandler = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      setupDialog.close();
    }
  };

  setupDialog.enterKeyDownHandler = function (evt) {
    if (evt.keyCode === KEY_ENTER && !evt.target.classList.contains('setup-submit')) {
      evt.preventDefault();
    }
  };

  setupDialog.userName = setupDialog.querySelector('.setup-user-name');
  setupDialog.userName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ESC) {
      evt.stopPropagation();
    }
  });
  setupDialog.userName.addEventListener('invalid', function () {
    var userName = setupDialog.userName;
    if (userName.validity.tooShort) {
      userName.setCustomValidity('Имя персонажа не может содержать менее 2 символов.');

    } else if (userName.validity.valueMissing) {
      userName.setCustomValidity('Имя персонажа должно быть заполнено.');

    } else if (userName.validity.tooLong) {
      userName.setCustomValidity('Максимальная длина имени персонажа — 25 символов.');

    } else {
      setupDialog.userName.setCustomValidity('');

    }
  });

  setupDialog.closeBtn = setupDialog.querySelector('.setup-close');
  setupDialog.closeBtn.addEventListener('click', function () {
    setupDialog.close();
  });

  setupDialog.closeBtn.setAttribute('tabindex', '0');
  setupDialog.closeBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      setupDialog.close();
    }
  });

  var setupOpenBtn = document.querySelector('.setup-open');
  setupOpenBtn.addEventListener('click', function () {
    setupDialog.open();
  });

  var setupOpenIcon = setupOpenBtn.querySelector('.setup-open-icon');
  setupOpenIcon.setAttribute('tabindex', '0');
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      setupDialog.open();
    }
  });

  var wizardCoat = setupDialog.querySelector('.setup-wizard .wizard-coat');
  wizardCoat.nextColor = createArraySwitcher(COAT_COLORS);
  wizardCoat.addEventListener('click', function () {
    var newColor = wizardCoat.nextColor();
    wizardCoat.style.fill = newColor;
    setupDialog.form['coat-color'].value = newColor;
  });

  var wizardEyes = setupDialog.querySelector('.setup-wizard .wizard-eyes');
  wizardEyes.nextColor = createArraySwitcher(EYES_COLORS);
  wizardEyes.addEventListener('click', function () {
    var newColor = wizardEyes.nextColor();
    wizardEyes.style.fill = newColor;
    setupDialog.form['eyes-color'].value = newColor;
  });

  var fireballWrap = setupDialog.querySelector('.setup-fireball-wrap');
  fireballWrap.nextColor = createArraySwitcher(FIREBALL_COLORS);
  fireballWrap.addEventListener('click', function () {
    var newColor = fireballWrap.nextColor();
    fireballWrap.style.backgroundColor = newColor;
    setupDialog.form['fireball-color'].value = newColor;
  });

})();
