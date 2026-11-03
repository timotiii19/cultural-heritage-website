import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import juanMiguelPhoto from '../assets/juan-miguel.jpg';

export default function SiteLayout() {
  const location = useLocation();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return undefined;

    const positionIndicator = () => {
      const activeLink = nav.querySelector('[aria-current="page"]');
      if (!activeLink) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      indicator.style.left = `${linkRect.left - navRect.left}px`;
      indicator.style.top = `${linkRect.top - navRect.top}px`;
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.opacity = '1';
    };

    positionIndicator();
    const observer = new ResizeObserver(positionIndicator);
    observer.observe(nav);
    window.addEventListener('resize', positionIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', positionIndicator);
    };
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Pamana home">
          <span className="brand-mark" aria-hidden="true"><img className="brand-logo-image" src={juanMiguelPhoto} alt="" /></span>
          <span>Pamana</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation" ref={navRef}>
          <span className="nav-indicator" aria-hidden="true" ref={indicatorRef} />
          <NavLink to="/" end>Discover</NavLink>
          <NavLink to="/arts">Visual arts</NavLink>
          <NavLink to="/traditions">Traditions</NavLink>
          <NavLink to="/festivals">Festivals</NavLink>
        </nav>
      </header>
      <div className="page-transition" key={location.pathname}><Outlet /></div>
      <footer className="footer">In fulfillment of our Summative Assessment 2 in Reading Visual Arts</footer>
    </div>
  );
}
