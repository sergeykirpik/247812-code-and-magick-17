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

  var util = window.util;

  var generateFullName = function () {
    var firstName = util.getRandomElement(FIRST_NAMES);
    var secondName = util.getRandomElement(SECOND_NAMES);
    return firstName + ' ' + secondName;
  };

  var generateMockData = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      wizards[i] = {
        name: generateFullName(),
        coatColor: util.getRandomElement(COAT_COLORS),
        eyesColor: util.getRandomElement(EYES_COLORS),
      };
    }
    return wizards;
  };

  window['getData'] = generateMockData;
})();
