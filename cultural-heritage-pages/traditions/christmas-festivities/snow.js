/* Gentle falling snow for the Christmas Festivities pages.
   Decorative only: ignores pointer events, is hidden from assistive tech, pauses when the tab is
   hidden, and is skipped entirely for visitors who prefer reduced motion. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas = document.createElement('canvas');
  canvas.className = 'christmas-snow';
  canvas.setAttribute('aria-hidden', 'true');
  // Inside <main> (an isolated stacking context) so the snow sits above its background but behind its text and cards.
  (document.querySelector('main.christmas-page') || document.body).appendChild(canvas);
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  // Same slow golden snow everywhere; on the light story pages it is a deeper gold with a darker glow so it stays visible.
  var light = !!document.querySelector('.superstition-story');
  var flakes = [], w = 0, h = 0, dpr = 1, raf = 0, t = 0;

  function make(initial) {
    var r = 1 + Math.random() * 2.2;
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : -r * 2,
      r: r,
      v: 0.1 + r * 0.07,
      drift: Math.random() * Math.PI * 2,
      sway: 0.15 + Math.random() * 0.35,
      a: 0.5 + Math.random() * 0.45
    };
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var want = Math.max(30, Math.min(110, Math.round(w * h / 16000)));
    while (flakes.length < want) flakes.push(make(true));
    flakes.length = want;
  }
  function frame() {
    t += 0.01;
    ctx.clearRect(0, 0, w, h);
    ctx.shadowColor = light ? 'rgba(138, 90, 28, 0.75)' : 'rgba(214, 173, 104, 0.8)';
    ctx.shadowBlur = light ? 4 : 8;
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += f.v;
      f.x += Math.sin(t * f.sway + f.drift) * 0.2;
      if (f.y > h + 8 || f.x < -10 || f.x > w + 10) flakes[i] = f = make(false);
      ctx.beginPath();
      ctx.fillStyle = (light ? 'rgba(226, 178, 84,' : 'rgba(240, 204, 128,') + (light ? Math.min(1, f.a + 0.3) : f.a) + ')';
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  resize(); start();
})();
