import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const palettes = [
  { id: 'green', name: 'Green', colors: ['#286d55', '#77a989', '#e7bd60', '#f4f5ea', '#173f35'] },
  { id: 'blue', name: 'Blue', colors: ['#326b99', '#6fb6c1', '#e9bd64', '#edf5fa', '#1d4565'] },
  { id: 'red', name: 'Red', colors: ['#b74646', '#df7968', '#e7bc68', '#fbf0eb', '#71373b'] },
  { id: 'orange', name: 'Orange', colors: ['#b75d35', '#e49353', '#f0c967', '#fbf1e5', '#70412f'] },
  { id: 'yellow', name: 'Yellow', colors: ['#927629', '#c4a84e', '#e6bf55', '#f8f5e6', '#594c2c'] },
  { id: 'purple', name: 'Purple', colors: ['#72599d', '#ad8fc2', '#e5c16b', '#f4eff8', '#49385f'] },
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
    return palettes.some((item) => item.id === saved) ? saved : 'green';
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
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!motionEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const revealTargets = document.querySelectorAll(
      '.page-transition main > section:not([data-reveal-skip]), .page-transition main > .heritage-marquee, .page-transition .collection-card, .page-transition .sample-card, .page-transition .tradition-category-card, .page-transition .tradition-more-card, .page-transition .beat-card, .page-transition .festival-fact, .page-transition .team-feature-panel, .page-transition .team-directory, .page-transition .arts-collection-card, .page-transition .arts-reference-group',
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
      <div className="ambient-stage" aria-hidden="true">
        <span className="ambient-orbit ambient-orbit-one"><i /></span>
        <span className="ambient-orbit ambient-orbit-two"><i /></span>
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-orb ambient-orb-three" />
        <span className="ambient-petal ambient-petal-one" />
        <span className="ambient-petal ambient-petal-two" />
        <span className="ambient-petal ambient-petal-three" />
        <span className="ambient-spark ambient-spark-one">✳</span>
        <span className="ambient-spark ambient-spark-two">✦</span>
        <span className="ambient-spark ambient-spark-three">✳</span>
        <span className="ambient-spark ambient-spark-four">✦</span>
        <span className="ambient-thread ambient-thread-one" />
        <span className="ambient-thread ambient-thread-two" />
      </div>
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
                    <span><strong>Motion effects</strong><small>Ambient movement and scroll reveals</small></span>
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
            <Link to="/references">References</Link>
          </nav>
          <span className="footer-note">A student-made cultural heritage project · 2026</span>
        </div>
      </footer>
    </div>
  );
}
