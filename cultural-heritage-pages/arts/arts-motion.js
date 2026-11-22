/* Arts page: gentle hero parallax. Skipped when motion is reduced or switched off. */
(() => {
  const hero = document.querySelector('.arts-hero-art');
  if (!hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const main = hero.querySelector('.arts-restored-main-photo img');
  const inset = hero.querySelector('.arts-restored-inset-photo');
  if (reduced || !main || !inset) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    if (document.documentElement.classList.contains('motion-off') || document.body.classList.contains('motion-off')) {
      main.style.transform = ''; inset.style.translate = ''; return;
    }
    const y = Math.min(window.scrollY, 700);
    main.style.transform = `scale(1.06) translateY(${y * 0.04}px)`;
    inset.style.translate = `0 ${y * -0.06}px`;
  };
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
})();

/* Recolour the geometric SVG tiles to follow the active "Make it yours" palette.
   The tiles are authored in the heritage colours; each hex is swapped for the palette's role colour. */
(() => {
  const shell = document.querySelector('.site-shell.arts-gallery');
  if (!shell) return;
  const base = '/cultural-heritage-pages/arts/images/';
  const tiles = {
    '--tribal-band': 'tribal-band.svg',
    '--tribal-zigzag': 'tribal-zigzag.svg',
    '--tribal-lozenge': 'tribal-lozenge.svg',
    '--tribal-ornament': 'tribal-ornament.svg',
    '--tribal-corner-bl': 'tribal-corner-bl.svg',
    '--tribal-corner-br': 'tribal-corner-br.svg',
  };
  const roles = { '#171411': '--t-black', '#A84624': '--t-terra', '#79351F': '--t-rust', '#F7F2E8': '--t-ivory' };
  const sources = {};

  const load = Promise.all(Object.entries(tiles).map(([name, file]) =>
    fetch(base + file).then((r) => (r.ok ? r.text() : Promise.reject())).then((svg) => { sources[name] = svg; })
  )).catch(() => {}); // CSS keeps the static heritage-coloured files if anything fails

  const apply = () => {
    const styles = getComputedStyle(shell);
    const colours = Object.fromEntries(Object.entries(roles).map(([hex, token]) => [hex, styles.getPropertyValue(token).trim()]));
    if (Object.values(colours).some((c) => !c)) return;
    for (const [name, svg] of Object.entries(sources)) {
      let out = svg;
      for (const [hex, colour] of Object.entries(colours)) out = out.split(hex).join(colour);
      shell.style.setProperty(name, `url("data:image/svg+xml,${encodeURIComponent(out)}")`);
    }
  };

  load.then(() => {
    apply();
    new MutationObserver(apply).observe(shell, { attributes: true, attributeFilter: ['data-palette'] });
  });
})();
