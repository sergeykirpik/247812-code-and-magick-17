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

  var KEY_ENTER = 13;
  var KEY_ESC = 27;

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
  
  var closeSetupDialog = function () {
    setupDialog.classList.add('hidden');
  };

  var openDialogEscKeyDownHandler = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      document.removeEventListener('keydown', openDialogEscKeyDownHandler);
      closeSetupDialog();
    }
  };

  var setupUserName = setupDialog.querySelector('.setup-user-name');
  setupUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ESC) {
      evt.stopPropagation();
    }
  });

  var openSetupDialog = function () {
    renderSimilarWizards(generateMockData(4));
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', openDialogEscKeyDownHandler);
  };

  var setupOpenBtn = document.querySelector('.setup-open');
  setupOpenBtn.addEventListener('click', function (evt) {
    openSetupDialog();
  });

  var setupOpenIcon = setupOpenBtn.querySelector('.setup-open-icon');
  setupOpenIcon.setAttribute('tabindex', '0');
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      openSetupDialog();
    }
  });

  var setupCloseBtn = setupDialog.querySelector('.setup-close');
  setupCloseBtn.addEventListener('click', function (evt) {
    closeSetupDialog();
  });

  setupCloseBtn.setAttribute('tabindex', '0');
  setupCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode == KEY_ENTER) {
      closeSetupDialog();
    }
  });

  

})();
