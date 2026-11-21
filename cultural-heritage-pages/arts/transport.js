// Autoplay is local to the two transport stories. Offscreen scenes save their place.
document.querySelectorAll('[data-transport]').forEach((scene) => {
  const mode = scene.dataset.mode;
  const toggle = scene.querySelector('[data-ride-toggle]');
  const para = scene.querySelector('[data-ride-para]');
  const status = scene.querySelector('[data-ride-status]');
  const person = scene.querySelector('.street-passenger');
  const rig = scene.querySelector(mode === 'kalesa' ? '.kalesa-rig' : '.jeepney-rig');
  const backdrop = scene.querySelector('.street-backdrop');
  const ground = scene.querySelector('.street-ground');
  const wheels = [...scene.querySelectorAll('.street-wheel')];
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shell = scene.closest('.site-shell');
  const drawing = scene.querySelector('svg');
  const smallScreen = window.matchMedia('(max-width: 600px)');
  const frameDrawing = () => {
    drawing.setAttribute('viewBox', smallScreen.matches ? '180 0 520 340' : '0 0 900 340');
  };
  smallScreen.addEventListener('change', frameDrawing);
  frameDrawing();
  let state = mode === 'kalesa' ? 'riding' : 'boarding';
  let age = 0;
  let distance = 0;
  let movingTime = 0;
  let paused = false;
  let visible = !('IntersectionObserver' in window);
  let frame = 0;
  let lastTime = 0;
  const reduced = () => preference.matches || shell.classList.contains('motion-off');
  const smooth = p => p * p * (3 - 2 * p);
  const placePerson = (x, y = 278, scale = 1, opacity = 1) => {
    person.setAttribute('transform', `translate(${x} ${y}) scale(${scale})`);
    person.style.opacity = String(opacity);
  };
  const update = () => {
    scene.dataset.state = state;
    scene.classList.toggle('is-moving', state === 'riding' || state === 'stopping');
    scene.classList.toggle('is-paused', paused || reduced());
    toggle.hidden = reduced();
    toggle.textContent = paused ? 'Resume animation' : 'Stop animation';
    toggle.setAttribute('aria-pressed', String(paused));
    if (para) para.disabled = paused || state !== 'riding';
    const messages = {
      boarding: 'Sakay na! The passenger walks over and boards the jeepney.',
      riding: mode === 'kalesa'
        ? 'The horse trots through the old streets. Stop the animation whenever you like.'
        : 'The passenger is aboard. Press Para po! when it’s time to get off.',
      stopping: 'Para po! The jeepney slows down and pulls over.',
      exiting: 'The passenger steps down and walks away. Salamat po!',
      dwell: 'A new journey is about to begin. The next passenger will board automatically.',
    };
    status.textContent = paused ? 'The animation is stopped. Resume whenever you’re ready.' : messages[state];
    if (reduced()) status.textContent = mode === 'kalesa'
      ? 'A horse-drawn kalesa, illustrated with the craft of its carriage and wheels.'
      : state === 'riding' ? 'The passenger is aboard. Press Para po! to let them off.' : 'Salamat po! The passenger has arrived.';
  };
  const render = () => {
    backdrop.setAttribute('transform', `translate(${-distance % 900} 0)`);
    ground.setAttribute('transform', `translate(${-(distance * 2.8) % 64} 0)`);
    wheels.forEach(wheel => { wheel.style.transform = `rotate(${distance * (mode === 'kalesa' ? 5.6 : 7)}deg)`; });
    if (mode === 'kalesa') {
      const drift = Math.sin(movingTime / 2900) * 14;
      rig.setAttribute('transform', `translate(${245 + drift} ${Math.sin(movingTime / 180) * .55})`);
      return;
    }
    rig.setAttribute('transform', `translate(270 ${state === 'riding' ? Math.sin(movingTime / 170) * .7 : 0})`);
    if (state === 'boarding') {
      const p = Math.min(age / 2100, 1), step = Math.max(0, (p - .7) / .3);
      placePerson(228 + 59 * smooth(p), 278 - 29 * step, 1 - .18 * step, 1 - step);
    } else if (state === 'riding' || state === 'stopping') {
      placePerson(287, 249, .82, 0);
    } else if (state === 'exiting') {
      const p = Math.min(age / 2200, 1), step = Math.min(p / .28, 1);
      placePerson(287 - 61 * smooth(p), 249 + 29 * step, .82 + .18 * step, step);
    } else placePerson(226);
  };
  const transition = next => {
    state = next;
    age = 0;
    if (reduced()) {
      if (state === 'boarding') state = 'riding';
      if (state === 'stopping' || state === 'exiting') state = 'dwell';
    }
    update();
    render();
  };
  const canPlay = () => visible && !document.hidden && !paused && !reduced();
  const tick = time => {
    frame = 0;
    if (!canPlay()) {
      lastTime = 0;
      // Synchronize the controls even when a browser defers its media-change event.
      if (reduced()) onPreferenceChange();
      return;
    }
    const dt = lastTime ? Math.min(time - lastTime, 80) : 0;
    lastTime = time;
    age += dt;
    const speed = state === 'riding' ? 1 : state === 'stopping' ? Math.max(0, 1 - age / 1200) : 0;
    distance += dt * .034 * speed;
    movingTime += dt * speed;
    if (state === 'boarding' && age >= 2100) transition('riding');
    else if (state === 'stopping' && age >= 1200) transition('exiting');
    else if (state === 'exiting' && age >= 2200) transition('dwell');
    else if (state === 'dwell' && age >= 2400) transition('boarding');
    render();
    frame = requestAnimationFrame(tick);
  };
  const syncPlayback = () => {
    scene.classList.toggle('is-offscreen', !visible || document.hidden);
    if (!canPlay()) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else if (!frame) frame = requestAnimationFrame(tick);
  };
  toggle.addEventListener('click', () => {
    paused = !paused;
    update();
    syncPlayback();
  });
  para?.addEventListener('click', () => {
    if (paused || state !== 'riding') return;
    transition('stopping');
    syncPlayback();
  });
  const onPreferenceChange = () => {
    if (reduced() && ['boarding', 'stopping', 'exiting'].includes(state)) transition(state);
    else update();
    syncPlayback();
  };
  preference.addEventListener('change', onPreferenceChange);
  let oldMotion = shell.classList.contains('motion-off');
  new MutationObserver(() => {
    const motion = shell.classList.contains('motion-off');
    if (motion === oldMotion) return;
    oldMotion = motion;
    onPreferenceChange();
  }).observe(shell, { attributes: true, attributeFilter: ['class'] });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: .05 }).observe(scene);
  }
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pagehide', () => { if (frame) cancelAnimationFrame(frame); frame = 0; lastTime = 0; });
  window.addEventListener('pageshow', syncPlayback);
  transition(state);
  syncPlayback();
});
