'use strict';

(function () {

  var msg = window.msg;
  var backend = window.backend;

  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  var renderWizardElement = function (wizard, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

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

  setupDialog.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    backend.save(
        new FormData(evt.target),
        function () {
          setupDialog.close();
          msg.success('Данные сохранены');
        },
        function (err) {
          msg.error('Не удалось сохранить данные. ' + err);
        }
    );
  });

  setupDialog.open = function () {
    backend.load(
        function (data) {
          setupDialog.wizardsData = data;
          setupDialog.updateSimilarWizards();
        },
        function (err) {
          msg.error('Ошибка загрузки данных: ' + err);
        }
    );

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

  setupDialog.player = new window.SetupWizard(setupDialog.querySelector('.setup-player'));
  setupDialog.player.onValueChanged = function (key, value) {
    setupDialog.form[key].value = value;
    setupDialog.updateSimilarWizards();
  };

  var getWizardRank = function (wizard) {
    var player = setupDialog.player;
    var rank = 0;
    if (wizard.colorCoat === player.colorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === player.colorEyes) {
      rank += 1;
    }
    return rank;
  };

  setupDialog.updateSimilarWizards = function () {
    if (setupDialog._timeout) {
      clearTimeout(setupDialog._timeout);
    }
    setupDialog._timeout = setTimeout(function () {
      setupDialog._updateSimilarWizards();
    }, 500);
  };

  setupDialog._updateSimilarWizards = function () {
    var similarWizards = setupDialog.wizardsData;
    if (!similarWizards) {
      return;
    }
    similarWizards.sort(function (a, b) {
      var rankDiff = getWizardRank(b) - getWizardRank(a);
      if (rankDiff !== 0) {
        return rankDiff;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    renderSimilarWizards(similarWizards.slice(0, 4));
  };
})();
