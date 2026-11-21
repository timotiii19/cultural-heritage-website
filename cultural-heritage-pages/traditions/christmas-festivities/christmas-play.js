/* Small interactive scenes for the Christmas story pages.
   - Simbang Gabi: light one parol per dawn, December 16 to 24.
   - Noche Buena: set the table while the clock moves toward midnight.
   - Delicacies: choose a moment of the season to see what is served.
   Every scene works with the keyboard and screen readers (real buttons, aria-live messages). */
(function () {
  /* ---------- Simbang Gabi: the nine dawns ---------- */
  var dawn = document.querySelector('[data-dawn]');
  if (dawn) {
    var stars = [].slice.call(dawn.querySelectorAll('[data-dawn-star]'));
    var nextBtn = dawn.querySelector('[data-dawn-next]');
    var resetBtn = dawn.querySelector('[data-dawn-reset]');
    var scene = dawn.querySelector('[data-dawn-scene]');
    var msg = dawn.querySelector('[data-dawn-message]');
    var nextLabel = dawn.querySelector('[data-dawn-label]');
    var lit = 0;
    var DAWN_TEXT = {
      0: 'Nine dawn Masses lead up to Christmas. Press Attend Mass to begin on December 16.',
      1: 'Day 1 · December 16. The nine days begin with a dawn Mass.',
      9: 'Day 9 · December 24. All nine dawns are complete, and the Noche Buena feast follows on Christmas Eve.'
    };
    function renderDawn() {
      stars.forEach(function (li, i) { li.classList.toggle('is-lit', i < lit); });
      scene.style.setProperty('--p', (lit / 9).toFixed(3));
      var text = DAWN_TEXT[lit] || ('Day ' + lit + ' · December ' + (15 + lit) + '. Another dawn Mass, held before the day’s activities begin.');
      msg.textContent = text;
      var done = lit >= 9;
      nextBtn.disabled = done;
      nextLabel.textContent = done ? 'All nine days complete' : 'Day ' + (lit + 1) + ' · December ' + (16 + lit);
      resetBtn.hidden = lit === 0;
    }
    nextBtn.addEventListener('click', function () { if (lit < 9) { lit++; renderDawn(); } });
    resetBtn.addEventListener('click', function () { lit = 0; renderDawn(); nextBtn.focus(); });
    renderDawn();
  }

  /* ---------- Noche Buena: set the table ---------- */
  var table = document.querySelector('[data-table]');
  if (table) {
    var dishes = [
      { n: 'Hamon', t: 'A glazed cured ham, one of the centerpiece dishes of Noche Buena.' },
      { n: 'Queso de Bola', t: 'A round Edam cheese in red wax, often served with hamon and bread.' },
      { n: 'Leche Flan', t: 'A creamy caramel custard to finish the feast.' }
    ];
    var plates = [].slice.call(table.querySelectorAll('[data-plate]'));
    var addBtn = table.querySelector('[data-table-add]');
    var tReset = table.querySelector('[data-table-reset]');
    var tLabel = table.querySelector('[data-table-label]');
    var tMsg = table.querySelector('[data-table-message]');
    var tScene = table.querySelector('[data-table-scene]');
    var hand = table.querySelector('[data-clock-hand]');
    var placed = 0;
    function renderTable() {
      plates.forEach(function (p, i) { p.classList.toggle('is-set', i < placed); });
      var angle = 300 + placed * 20; // 10 o'clock toward 12 o'clock
      hand.setAttribute('transform', 'rotate(' + angle + ' 50 50)');
      tScene.classList.toggle('is-midnight', placed >= 3);
      if (placed === 0) tMsg.textContent = 'It is still Christmas Eve. Add the first dish to the table.';
      else if (placed < 3) tMsg.textContent = dishes[placed - 1].n + ' is on the table. ' + dishes[placed - 1].t;
      else tMsg.textContent = 'Midnight: Christmas Day begins, and the family gathers to eat. ' + dishes[2].t;
      addBtn.disabled = placed >= 3;
      tLabel.textContent = placed >= 3 ? 'The table is set' : 'Next: ' + dishes[placed].n;
      tReset.hidden = placed === 0;
    }
    addBtn.addEventListener('click', function () { if (placed < 3) { placed++; renderTable(); } });
    tReset.addEventListener('click', function () { placed = 0; renderTable(); addBtn.focus(); });
    renderTable();
  }

  /* ---------- Delicacies: what is served when ---------- */
  var serve = document.querySelector('[data-serve]');
  if (serve) {
    var moments = {
      mass: 'After dawn Mass during Simbang Gabi, people enjoy bibingka and puto bumbong.',
      noche: 'At Noche Buena, hamon, queso de bola, and leche flan take their place on the table.'
    };
    var buttons = [].slice.call(serve.querySelectorAll('[data-serve-moment]'));
    var dishesEl = [].slice.call(serve.querySelectorAll('[data-serve-dish]'));
    var sMsg = serve.querySelector('[data-serve-message]');
    function showMoment(key) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-serve-moment') === key)); });
      var order = 0;
      dishesEl.forEach(function (d) {
        var match = d.getAttribute('data-serve-dish').split(' ').indexOf(key) !== -1;
        d.hidden = !match;
        d.classList.remove('is-served');
        if (match) {
          d.style.setProperty('--i', order++);
          void d.offsetWidth; // restart the pop-in animation
          d.classList.add('is-served');
        }
      });
      sMsg.textContent = moments[key];
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { showMoment(b.getAttribute('data-serve-moment')); }); });
    showMoment('mass');
  }
})();
