'use strict';

(function () {

  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COLOR = 'white';
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var SHADOW_OFFSET = 10;
  var PADDING_LEFT = 30;
  var PADDING_TOP = 25;
  var PADDING_BOTTOM = 15;

  var TEXT_X = CLOUD_X + PADDING_LEFT;
  var TEXT_Y = CLOUD_Y + PADDING_TOP;
  var TEXT_COLOR = 'black';
  var TEXT_FONT_SIZE = 16;
  var TEXT_FONT = TEXT_FONT_SIZE + 'px PT Mono';
  var TEXT_LINE_GAP = 1.5 * TEXT_FONT_SIZE;

  var HIST_HEIGHT = 150;
  var HIST_COLUMN_WIDTH = 40;
  var HIST_COLUMN_GAP = 50;

  var HIST_Y = CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM;

  var HIST_NAME_LINE_HEIGHT = 20;
  var HIST_TIME_LINE_HEIGHT = 10;

  var HIST_MAIN_COLUMN_COLOR = 'red';
  var HIST_COLUMN_COLOR = 'hsl(240, rndSaturation%, 45%)';


  var drawCloud = function (ctx, color, offset) {
    ctx.fillStyle = color;
    ctx.fillRect(CLOUD_X + offset, CLOUD_Y + offset, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getHistX = function (qty) {
    var width = (HIST_COLUMN_WIDTH + HIST_COLUMN_GAP) * qty - HIST_COLUMN_GAP;
    return CLOUD_X + CLOUD_WIDTH / 2 - width / 2;
  };

  var getColumnFillStyle = function (name) {
    if (name === 'Вы') {
      return HIST_MAIN_COLUMN_COLOR;
    }

    var rndSaturation = Math.floor(Math.random() * 100);
    return HIST_COLUMN_COLOR.replace('rndSaturation', rndSaturation);
  };

  var getMax = function (arr) {
    var max = 0;
    arr.forEach(function (el) {
      if (el > max) {
        max = el;
      }
    });
    return max;
  };

  window.renderStatistics = function (ctx, names, times) {

    drawCloud(ctx, SHADOW_COLOR, SHADOW_OFFSET);
    drawCloud(ctx, CLOUD_COLOR, 0);

    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseLine = 'top';
    ctx.font = TEXT_FONT;
    ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
    ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + TEXT_LINE_GAP);

    var timeMax = getMax(times);
    names.forEach(function (namesEl, index) {

      var timesEl = times[index];

      var nameX = getHistX(names.length) + (HIST_COLUMN_WIDTH + HIST_COLUMN_GAP) * index;
      var nameY = HIST_Y;
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(namesEl, nameX, nameY);

      var rectHeight = HIST_HEIGHT * (timesEl / timeMax);

      var rectX = nameX;
      var rectY = nameY - rectHeight - HIST_NAME_LINE_HEIGHT;
      ctx.fillStyle = getColumnFillStyle(namesEl);
      ctx.fillRect(rectX, rectY, HIST_COLUMN_WIDTH, rectHeight);

      var timeX = nameX;
      var timeY = rectY - HIST_TIME_LINE_HEIGHT;
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(Math.round(timesEl), timeX, timeY);

    });
  };

})();

