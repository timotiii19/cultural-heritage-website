import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const palettes = [
  { id: 'island', name: 'Island green', colors: ['#146356', '#e85d45', '#f2bf4b', '#f4f3df', '#0d4038'] },
  { id: 'sunset', name: 'Sunset clay', colors: ['#a33324', '#ed542e', '#ffc247', '#fff0dc', '#70221e'] },
  { id: 'ocean', name: 'Ocean blue', colors: ['#075b8d', '#00a6a6', '#ffbd59', '#e7f4fb', '#093a65'] },
  { id: 'orchid', name: 'Orchid dusk', colors: ['#6841a5', '#d83a86', '#e7c2ff', '#f4eafa', '#402466'] },
];

const navigation = [
  { to: '/', label: 'Discover', end: true },
  { to: '/arts', label: 'Arts' },
  { to: '/traditions', label: 'Traditions' },
  { to: '/festivals', label: 'Festivals' },
];

export default function SiteLayout() {
  const location = useLocation();
  const [palette, setPalette] = useState(() => {
    const saved = window.localStorage.getItem('pamana-palette');
    return palettes.some((item) => item.id === saved) ? saved : 'island';
  });
  const [motionEnabled, setMotionEnabled] = useState(() => window.localStorage.getItem('pamana-motion') !== 'off');
  const [paletteOpen, setPaletteOpen] = useState(false);

  const choosePalette = (nextPalette) => {
    setPalette(nextPalette);
    window.localStorage.setItem('pamana-palette', nextPalette);
  };

  const toggleMotion = () => {
    const nextMotion = !motionEnabled;
    setMotionEnabled(nextMotion);
    window.localStorage.setItem('pamana-motion', nextMotion ? 'on' : 'off');
  };

  const activePalette = palettes.find((item) => item.id === palette) ?? palettes[0];

  useEffect(() => {
    if (!motionEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const revealTargets = document.querySelectorAll(
      '.page-transition main > section, .page-transition main > .heritage-marquee, .page-transition .collection-card, .page-transition .sample-card, .page-transition .prompt-card, .page-transition .beat-card, .page-transition .festival-fact, .page-transition .team-feature-panel, .page-transition .team-directory',
    );
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => {
      target.classList.add('scroll-reveal');
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      revealTargets.forEach((target) => target.classList.remove('scroll-reveal', 'is-visible'));
    };
  }, [location.pathname, motionEnabled]);

  const trackPointer = (event) => {
    const { clientX, clientY } = event;
    event.currentTarget.style.setProperty('--pointer-x', `${clientX}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${clientY}px`);
  };

  const clearPointer = (event) => {
    event.currentTarget.style.removeProperty('--pointer-x');
    event.currentTarget.style.removeProperty('--pointer-y');
  };

  return (
    <div
      className={`site-shell${motionEnabled ? '' : ' motion-off'}`}
      data-palette={palette}
      onPointerMove={trackPointer}
      onPointerLeave={clearPointer}
    >
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/" aria-label="Pamana home">
            <span className="brand-mark" aria-hidden="true">P</span>
            <span className="brand-name">pamana<span className="brand-period">.</span><small>FILIPINO HERITAGE, REIMAGINED</small></span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="customize-tools">
            <div className="palette-control">
              <button
                className={`customize-button${paletteOpen ? ' is-open' : ''}`}
                type="button"
                aria-expanded={paletteOpen}
                aria-controls="palette-panel"
                onClick={() => setPaletteOpen((open) => !open)}
              >
                <span className="palette-button-icon" aria-hidden="true">{activePalette.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>
                <span>Make it yours</span>
              </button>
              {paletteOpen && (
                <div className="palette-panel" id="palette-panel">
                  <div className="palette-panel-heading">
                    <div><span className="panel-kicker">YOUR CANVAS</span><strong>Choose a palette</strong></div>
                    <button className="panel-close" type="button" aria-label="Close palette settings" onClick={() => setPaletteOpen(false)}>×</button>
                  </div>
                  <div className="palette-options" role="group" aria-label="Color palettes">
                    {palettes.map((item) => (
                      <button
                        key={item.id}
                        className={`palette-option${palette === item.id ? ' selected' : ''}`}
                        type="button"
                        aria-pressed={palette === item.id}
                        onClick={() => choosePalette(item.id)}
                      >
                        <span className="palette-swatches" aria-hidden="true">{item.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>
                        <span>{item.name}</span>
                        {palette === item.id && <span className="palette-check" aria-hidden="true">✓</span>}
                      </button>
                    ))}
                  </div>
                  <button className="motion-toggle" type="button" aria-pressed={motionEnabled} onClick={toggleMotion}>
                    <span><strong>Motion effects</strong><small>Subtle movement across the experience</small></span>
                    <span className={`toggle-track${motionEnabled ? ' enabled' : ''}`} aria-hidden="true"><i /></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="page-transition" key={location.pathname}>
        <Outlet context={{ palette }} />
      </div>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="footer-brand" to="/">pamana<span>.</span></Link>
          <p>A living canvas for the stories, makers, and moments that shape Filipino heritage.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            {navigation.slice(1).map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
            <Link to="/#team">The team</Link>
          </nav>
          <span className="footer-note">A student-made cultural heritage project · 2026</span>
        </div>
      </footer>
    </div>
  );
}
