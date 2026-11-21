/* Small interactive scenes for the Christmas story pages.
   - Simbang Gabi: light one parol per dawn, December 16 to 24.
   - Noche Buena: set the table while the clock moves toward midnight.
   - Delicacies: choose a moment of the season to see what is served.
   Every scene works with the keyboard and screen readers (real buttons, aria-live messages). */
(function () {
  /* ---------- Simbang Gabi: the nine dawns (plays by itself) ---------- */
  var dawn = document.querySelector('[data-dawn]');
  if (dawn) {
    var stars = [].slice.call(dawn.querySelectorAll('[data-dawn-star]'));
    var nextBtn = dawn.querySelector('[data-dawn-next]');
    var resetBtn = dawn.querySelector('[data-dawn-reset]');
    var toggleBtn = dawn.querySelector('[data-dawn-toggle]');
    var toggleLabel = dawn.querySelector('[data-dawn-toggle-label]');
    var scene = dawn.querySelector('[data-dawn-scene]');
    var msg = dawn.querySelector('[data-dawn-message]');
    var nextLabel = dawn.querySelector('[data-dawn-label]');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lit = 0, hold = 0, timer = 0, inView = false, wantPlay = !reduce;
    var DAWN_TEXT = {
      0: 'Nine dawn Masses lead up to Christmas. The first is on December 16.',
      1: 'Day 1 \u00b7 December 16. The nine days begin with a dawn Mass.',
      9: 'Day 9 \u00b7 December 24. All nine dawns are complete, and the Noche Buena feast follows on Christmas Eve.'
    };
    var bell = dawn.querySelector('[data-bell]'), prevLit = 0;
    function ring() {
      if (!bell) return;
      bell.classList.remove('is-ring');
      void bell.getBoundingClientRect(); // restart the swing
      bell.classList.add('is-ring');
    }
    function renderDawn() {
      stars.forEach(function (li, i) { li.classList.toggle('is-lit', i < lit); });
      if (lit > prevLit) ring();
      prevLit = lit;
      scene.style.setProperty('--p', (lit / 9).toFixed(3));
      msg.textContent = DAWN_TEXT[lit] || ('Day ' + lit + ' \u00b7 December ' + (15 + lit) + '. Another dawn Mass, held before the day\u2019s activities begin.');
      var done = lit >= 9;
      nextBtn.disabled = done;
      nextLabel.textContent = done ? 'All nine days complete' : 'Day ' + (lit + 1) + ' \u00b7 December ' + (16 + lit);
      resetBtn.hidden = lit === 0;
    }
    function running() { return wantPlay && inView && !document.hidden; }
    function sync() {
      toggleLabel.textContent = wantPlay ? 'Pause' : 'Play';
      toggleBtn.setAttribute('aria-label', wantPlay ? 'Pause the animation' : 'Play the animation');
      msg.setAttribute('aria-live', wantPlay ? 'off' : 'polite');
      clearInterval(timer); timer = 0;
      if (running()) timer = setInterval(tick, 1500);
    }
    function tick() {
      if (lit < 9) { lit++; hold = 0; }
      else if (hold < 2) { hold++; }
      else { lit = 0; hold = 0; }
      renderDawn();
    }
    nextBtn.addEventListener('click', function () { wantPlay = false; if (lit < 9) { lit++; renderDawn(); } sync(); });
    resetBtn.addEventListener('click', function () { lit = 0; hold = 0; renderDawn(); sync(); nextBtn.focus(); });
    toggleBtn.addEventListener('click', function () { wantPlay = !wantPlay; if (wantPlay && lit >= 9) { lit = 0; hold = 0; renderDawn(); } sync(); });
    document.addEventListener('visibilitychange', sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(dawn);
    } else { inView = true; }
    renderDawn(); sync();
  }

  /* ---------- Noche Buena: set the table (plays by itself) ---------- */
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
    var tToggle = table.querySelector('[data-table-toggle]');
    var tToggleLabel = table.querySelector('[data-table-toggle-label]');
    var tLabel = table.querySelector('[data-table-label]');
    var tMsg = table.querySelector('[data-table-message]');
    var tScene = table.querySelector('[data-table-scene]');
    var hand = table.querySelector('[data-clock-hand]');
    var pivot = hand.getAttribute('data-pivot');
    var tReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var placed = 0, tHold = 0, tTimer = 0, tInView = false, tWant = !tReduce;
    function renderTable() {
      plates.forEach(function (p, i) { p.classList.toggle('is-set', i < placed); });
      hand.setAttribute('transform', 'rotate(' + (300 + placed * 20) + ' ' + pivot + ')'); // 10 o'clock toward midnight
      tScene.classList.toggle('is-midnight', placed >= 3);
      if (placed === 0) tMsg.textContent = 'It is still Christmas Eve. The family is gathering.';
      else if (placed < 3) tMsg.textContent = dishes[placed - 1].n + ' is on the table. ' + dishes[placed - 1].t;
      else tMsg.textContent = 'Midnight: Christmas Day begins, and the family gathers to eat. ' + dishes[2].t;
      addBtn.disabled = placed >= 3;
      tLabel.textContent = placed >= 3 ? 'The table is set' : 'Next: ' + dishes[placed].n;
      tReset.hidden = placed === 0;
    }
    function tRunning() { return tWant && tInView && !document.hidden; }
    function tSync() {
      tToggleLabel.textContent = tWant ? 'Pause' : 'Play';
      tToggle.setAttribute('aria-label', tWant ? 'Pause the animation' : 'Play the animation');
      tMsg.setAttribute('aria-live', tWant ? 'off' : 'polite');
      clearInterval(tTimer); tTimer = 0;
      if (tRunning()) tTimer = setInterval(tTick, 1800);
    }
    function tTick() {
      if (placed < 3) { placed++; tHold = 0; }
      else if (tHold < 3) { tHold++; }
      else { placed = 0; tHold = 0; }
      renderTable();
    }
    addBtn.addEventListener('click', function () { tWant = false; if (placed < 3) { placed++; renderTable(); } tSync(); });
    tReset.addEventListener('click', function () { placed = 0; tHold = 0; renderTable(); tSync(); addBtn.focus(); });
    tToggle.addEventListener('click', function () { tWant = !tWant; if (tWant && placed >= 3) { placed = 0; tHold = 0; renderTable(); } tSync(); });
    document.addEventListener('visibilitychange', tSync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { tInView = entries[0].isIntersecting; tSync(); }, { threshold: 0.35 }).observe(table);
    } else { tInView = true; }
    renderTable(); tSync();
  }

  /* ---------- Delicacies: cook bibingka, cook puto bumbong, then the Noche Buena table (plays by itself) ---------- */
  var serve = document.querySelector('[data-serve]');
  if (serve) {
    var STEPS = {
      mass: [
        { t: 'The clay pot is ready', m: 'The clay pot sits on the brazier, ready for the first bibingka of the morning.' },
        { t: '1 \u00b7 Line the pot', m: 'Step 1: line the pot with a banana leaf.' },
        { t: '2 \u00b7 Pour the batter', m: 'Step 2: pour in the rice-flour batter, called galapong.' },
        { t: '3 \u00b7 Add the toppings', m: 'Step 3: top it with salted egg and cheese.' },
        { t: '4 \u00b7 Add the baga', m: 'Step 4: cover the pot and add baga, glowing hot coals, on the lid, with more coals underneath.' },
        { t: '5 \u00b7 Let it bake', m: 'Step 5: let it bake slowly until the top turns golden.' },
        { t: 'Bibingka is ready!', m: 'Bibingka is ready! Butter, sugar, and grated coconut finish it, and it is enjoyed after dawn Mass.' }
      ],
      pbb: [
        { t: 'The steamer is ready', m: 'The bamboo tubes stand on the steamer, ready for puto bumbong.' },
        { t: '1 \u00b7 Fill the tubes', m: 'Step 1: fill the bamboo tubes with purple sticky rice.' },
        { t: '2 \u00b7 Steam it', m: 'Step 2: steam the tubes over the fire until the rice is cooked.' },
        { t: '3 \u00b7 Push it out', m: 'Step 3: push the steamed puto bumbong out of the tubes onto a banana leaf.' },
        { t: '4 \u00b7 Spread butter', m: 'Step 4: spread butter over the hot puto bumbong.' },
        { t: '5 \u00b7 Coconut and sugar', m: 'Step 5: top it with grated coconut and brown sugar.' },
        { t: 'Puto bumbong is ready!', m: 'Puto bumbong is ready! Purple, buttery, and sweet, it is enjoyed after dawn Mass.' }
      ]
    };
    var ORDER = ['mass', 'pbb', 'noche'];
    var NOCHE = 'At Noche Buena, hamon, queso de bola, and leche flan take their place on the table.';
    var sScene = serve.querySelector('[data-serve-scene]');
    var sButtons = [].slice.call(serve.querySelectorAll('[data-serve-moment]'));
    var sDishes = [].slice.call(serve.querySelectorAll('[data-serve-dish]'));
    var cookEls = [].slice.call(serve.querySelectorAll('[data-steps]'));
    var dots = [].slice.call(serve.querySelectorAll('[data-cook-dot]'));
    var dotsWrap = serve.querySelector('.christmas-cook-steps');
    var titles = [].slice.call(serve.querySelectorAll('[data-cook-title]'));
    var cookNext = serve.querySelector('[data-cook-next]');
    var cookNextLabel = serve.querySelector('[data-cook-next-label]');
    var sToggle = serve.querySelector('[data-serve-toggle]');
    var sToggleLabel = serve.querySelector('[data-serve-toggle-label]');
    var sMsg = serve.querySelector('[data-serve-message]');
    var sReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var moment = 'mass', step = 0, sHold = 0, sTimer = 0, sInView = false, sWant = !sReduce;
    var meta = cookEls.map(function (e) {
      var r = e.getAttribute('data-steps').split('-');
      var layer = e.closest('[data-cook]');
      return { from: +r[0], to: +r[1], layer: layer ? layer.getAttribute('data-cook') : '' };
    });
    function render() {
      var cooking = moment !== 'noche';
      ORDER.forEach(function (k) { sScene.classList.toggle('is-' + k, k === moment); });
      sButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-serve-moment') === moment)); });
      cookEls.forEach(function (e, i) { e.classList.toggle('is-on', moment === meta[i].layer && step >= meta[i].from && step <= meta[i].to); });
      sDishes.forEach(function (d) { d.classList.toggle('is-served', !cooking && d.getAttribute('data-serve-dish') === 'noche'); });
      dotsWrap.hidden = !cooking;
      cookNext.hidden = !cooking;
      dots.forEach(function (d, i) { d.classList.toggle('is-done', cooking && step >= i + 1); });
      if (cooking) {
        var list = STEPS[moment];
        titles.forEach(function (t) { t.textContent = list[step].t; });
        sMsg.textContent = list[step].m;
        cookNextLabel.textContent = step >= 6 ? 'Cook again' : (step + 1) + ' \u00b7 ' + list[step + 1].t.replace(/^\d \u00b7 /, '');
      } else {
        sMsg.textContent = NOCHE;
      }
    }
    function running() { return sWant && sInView && !document.hidden; }
    function sync() {
      sToggleLabel.textContent = sWant ? 'Pause' : 'Play';
      sToggle.setAttribute('aria-label', sWant ? 'Pause the animation' : 'Play the animation');
      sMsg.setAttribute('aria-live', sWant ? 'off' : 'polite');
      clearInterval(sTimer); sTimer = 0;
      if (running()) sTimer = setInterval(tick, 1800);
    }
    function nextMoment() { moment = ORDER[(ORDER.indexOf(moment) + 1) % ORDER.length]; step = 0; sHold = 0; }
    function tick() {
      if (moment === 'noche') {
        if (sHold < 3) sHold++; else nextMoment();
      } else if (step < 6) { step++; sHold = 0; }
      else if (sHold < 2) { sHold++; }
      else { nextMoment(); }
      render();
    }
    sButtons.forEach(function (b) {
      b.addEventListener('click', function () { sWant = false; moment = b.getAttribute('data-serve-moment'); step = 0; sHold = 0; render(); sync(); });
    });
    cookNext.addEventListener('click', function () { sWant = false; step = step >= 6 ? 0 : step + 1; render(); sync(); });
    sToggle.addEventListener('click', function () { sWant = !sWant; sync(); });
    document.addEventListener('visibilitychange', sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { sInView = entries[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(serve);
    } else { sInView = true; }
    render(); sync();
  }
})();
