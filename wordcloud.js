/* ============================================================
   DUFL — Word Cloud Visualization
   Chinese & English audience sentiment word clouds
   ============================================================ */

(function () {
  'use strict';

  /* ------ Chinese Word Cloud Data ------ */
  var cnWords = [
    { text: '阿嬷', weight: 98 },
    { text: '想家了', weight: 92 },
    { text: '奶奶', weight: 88 },
    { text: '哭了', weight: 85 },
    { text: '潮汕', weight: 80 },
    { text: '感动', weight: 78 },
    { text: '真实', weight: 75 },
    { text: '家乡', weight: 72 },
    { text: '温暖', weight: 70 },
    { text: '童年', weight: 67 },
    { text: '回忆', weight: 65 },
    { text: '侨批', weight: 62 },
    { text: '母亲', weight: 60 },
    { text: '厨房', weight: 57 },
    { text: '团圆', weight: 55 },
    { text: '传统', weight: 52 },
    { text: '味道', weight: 50 },
    { text: '故事', weight: 48 },
    { text: '亲情', weight: 46 },
    { text: '时光', weight: 44 },
    { text: '岁月', weight: 42 },
    { text: '舍不得', weight: 40 },
    { text: '细腻', weight: 38 },
    { text: '细腻', weight: 38 },
    { text: '治愈', weight: 36 },
    { text: '年代', weight: 34 },
    { text: '守候', weight: 32 },
    { text: '外婆', weight: 30 },
    { text: '故乡', weight: 28 },
    { text: '记忆', weight: 26 },
    { text: '陪伴', weight: 24 },
    { text: '朴素', weight: 22 },
    { text: '泪目', weight: 20 },
    { text: '方言', weight: 18 },
    { text: '深情', weight: 16 },
    { text: '日常', weight: 14 },
    { text: '传承', weight: 12 },
    { text: '珍贵', weight: 10 },
  ];

  /* ------ English Word Cloud Data ------ */
  var enWords = [
    { text: 'A-ma', weight: 95 },
    { text: 'Grandma', weight: 90 },
    { text: 'family', weight: 87 },
    { text: 'real China', weight: 84 },
    { text: 'warm', weight: 80 },
    { text: 'heartfelt', weight: 77 },
    { text: 'authentic', weight: 74 },
    { text: 'hometown', weight: 70 },
    { text: 'nostalgia', weight: 67 },
    { text: 'love', weight: 65 },
    { text: 'culture', weight: 62 },
    { text: 'tradition', weight: 58 },
    { text: 'culinary', weight: 55 },
    { text: 'immigrant', weight: 52 },
    { text: 'memory', weight: 50 },
    { text: 'subtle', weight: 47 },
    { text: 'poetic', weight: 44 },
    { text: 'touching', weight: 42 },
    { text: 'beautiful', weight: 39 },
    { text: 'emotional', weight: 36 },
    { text: 'rural', weight: 33 },
    { text: 'storytelling', weight: 30 },
    { text: 'diaspora', weight: 27 },
    { text: 'mother', weight: 25 },
    { text: 'intimate', weight: 22 },
    { text: 'local', weight: 20 },
    { text: 'dialect', weight: 18 },
    { text: 'overseas', weight: 15 },
    { text: 'Cannes', weight: 12 },
    { text: 'universal', weight: 10 },
  ];

  /* ------ Color Palettes ------ */
  var cnColors = [
    '#d4380d', '#cf1322', '#e8461a', '#c41d1f',
    '#d46b08', '#e8731a', '#ad4e00', '#d48806',
    '#389e0d', '#237804', '#1d39c4', '#003eb3',
    '#7b2d8b', '#531dab', '#8c1c6b', '#9c106b',
  ];

  var enColors = [
    '#0071e3', '#1d6fa5', '#2874a6', '#0d5e9e',
    '#e8731a', '#d46b08', '#ad4e00', '#c45a1a',
    '#389e0d', '#237804', '#1d8c3f', '#1a7a30',
    '#7b2d8b', '#6b21a8', '#5b1a9b', '#4a1080',
  ];

  /* ------ Render a word cloud to a canvas ------ */
  function renderWordCloud(canvas, words, colors) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;

    // Scale weight to font size
    var maxWeight = words[0].weight;
    var minWeight = words[words.length - 1].weight;

    function getSize(weight) {
      return Math.round(12 + (weight - minWeight) / (maxWeight - minWeight) * 36);
    }

    // Shuffle for visual randomness while keeping weight-sorted
    var shuffled = words.slice().sort(function () { return Math.random() - 0.5; });

    // Sort by weight descending so big words are placed first
    shuffled.sort(function (a, b) { return b.weight - a.weight; });

    var placed = [];

    function overlaps(x, y, w, h) {
      var margin = 6;
      for (var i = 0; i < placed.length; i++) {
        var p = placed[i];
        if (
          x - margin < p.x + p.w &&
          x + w + margin > p.x &&
          y - margin < p.y + p.h &&
          y + h + margin > p.y
        ) {
          return true;
        }
      }
      return false;
    }

    ctx.clearRect(0, 0, W, H);

    // Use a spiral placement
    shuffled.forEach(function (word) {
      var size = getSize(word.weight);
      ctx.font = 'bold ' + size + 'px "Noto Serif SC", "Inter", sans-serif';
      var metrics = ctx.measureText(word.text);
      var tw = metrics.width;
      var th = size;

      var cx = W / 2;
      var cy = H / 2;
      var placed_ok = false;
      var maxR = Math.max(W, H);

      // Spiral outward from center
      for (var r = 0; r < maxR; r += 3) {
        for (var angle = 0; angle < 360; angle += 8) {
          var rad = (angle * Math.PI) / 180;
          var x = cx + r * Math.cos(rad) - tw / 2;
          var y = cy + r * Math.sin(rad) + th / 3;

          // Keep in bounds
          if (x < 4 || y < 4 || x + tw > W - 4 || y + th > H - 4) continue;

          if (!overlaps(x, y, tw, th)) {
            placed.push({ x: x, y: y, w: tw, h: th });
            var colorIdx = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIdx];
            ctx.globalAlpha = 0.85;
            ctx.fillText(word.text, x, y + th * 0.7);
            ctx.globalAlpha = 1;
            placed_ok = true;
            break;
          }
        }
        if (placed_ok) break;
      }
    });
  }

  /* ------ Initialize ------ */
  function init() {
    var cnContainer = document.getElementById('wordcloudCN');
    var enContainer = document.getElementById('wordcloudEN');

    if (cnContainer) {
      var canvas = document.createElement('canvas');
      var dpr = window.devicePixelRatio || 1;
      var rect = cnContainer.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 380 * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '380px';
      canvas.getContext('2d').scale(dpr, dpr);
      // Adjust for the scale
      canvas.width = rect.width;
      canvas.height = 380;
      cnContainer.innerHTML = '';
      cnContainer.appendChild(canvas);
      renderWordCloud(canvas, cnWords, cnColors);
    }

    if (enContainer) {
      var canvas2 = document.createElement('canvas');
      var rect2 = enContainer.getBoundingClientRect();
      canvas2.width = rect2.width;
      canvas2.height = 380;
      canvas2.style.width = '100%';
      canvas2.style.height = '380px';
      enContainer.innerHTML = '';
      enContainer.appendChild(canvas2);
      renderWordCloud(canvas2, enWords, enColors);
    }
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-render on resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 300);
  });

})();
