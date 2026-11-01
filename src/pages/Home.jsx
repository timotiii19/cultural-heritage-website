import { useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import sinulogImage from '../assets/Sinulog-2026.jpg';
import arabellaPhoto from '../assets/arabella.jpg';
import juanMiguelPhoto from '../assets/juan-miguel.jpg';

const developers = [
  { name: 'Arabella Valerio', initials: 'AV', photo: arabellaPhoto, index: '01', color: 'rose' },
  { name: 'JC Roeven Peji', initials: 'JP', index: '02', color: 'sage' },
  { name: 'Timothy Talagtag', initials: 'TT', index: '03', color: 'gold' },
  { name: 'Juan Miguel Campomanes', initials: 'JM', photo: juanMiguelPhoto, index: '04', color: 'blue' },
];

const collections = [
  {
    number: '01',
    title: 'Arts & makers',
    label: 'THE THINGS WE MAKE',
    description: 'A canvas for art forms, materials, patterns, and the people behind them.',
    to: '/arts',
    className: 'art',
    symbol: '✳',
  },
  {
    number: '02',
    title: 'Living traditions',
    label: 'THE WAYS WE REMEMBER',
    description: 'Make room for rituals, everyday knowledge, and stories passed hand to hand.',
    to: '/traditions',
    className: 'tradition',
    symbol: '❋',
  },
  {
    number: '03',
    title: 'Festivals & gatherings',
    label: 'THE MOMENTS WE SHARE',
    description: 'Capture the sounds, color, movement, and meaning of a community celebration.',
    to: '/festivals',
    className: 'festival',
    symbol: '✺',
  },
];

const markImageLoaded = (event) => {
  event.currentTarget.parentElement?.classList.remove('is-loading');
  event.currentTarget.parentElement?.classList.add('is-loaded');
};

export default function Home() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const location = useLocation();
  const activeDeveloper = developers.find((developer) => developer.index === selectedDeveloper);

  const showNeighbor = (direction) => {
    if (!activeDeveloper) {
      setSelectedDeveloper(direction > 0 ? developers[0].index : developers[developers.length - 1].index);
      return;
    }

    const index = developers.findIndex((developer) => developer.index === activeDeveloper.index);
    const next = (index + direction + developers.length) % developers.length;
    setSelectedDeveloper(developers[next].index);
  };

  const tiltHeroImage = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--pointer-rotate-x', `${y * -5}deg`);
    event.currentTarget.style.setProperty('--pointer-rotate-y', `${x * 5}deg`);
  };

  const resetHeroImage = (event) => {
    event.currentTarget.style.removeProperty('--pointer-rotate-x');
    event.currentTarget.style.removeProperty('--pointer-rotate-y');
  };

  useLayoutEffect(() => {
    if (window.location.hash !== '#team') return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('team')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow"><i /> A living canvas for Filipino heritage</span>
          <h1>Culture is not<br />behind us. It is <em>us.</em></h1>
          <p>Every craft, custom, and celebration carries a story. Pamana is a space to discover them, share them, and keep them moving forward.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#explore">Explore the collection <span aria-hidden="true">↘</span></a>
            <a className="button-text" href="#team">Meet the people behind it <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-footnote"><span className="pulse-dot" /> A student-made heritage project, ready for your stories</div>
        </div>
        <div className="hero-visual is-loading" onPointerMove={tiltHeroImage} onPointerLeave={resetHeroImage}>
          <img src={sinulogImage} alt="Colorful performers at a Sinulog celebration, shown as sample festival imagery" onLoad={markImageLoaded} onError={markImageLoaded} />
          <div className="hero-image-shade" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-image-caption"><span className="caption-mark">✳</span><span><strong>Stories in motion</strong><small>Sample image · <a href="https://cebudailynews.inquirer.net/686481/sinulog-2026-officially-opens" target="_blank" rel="noreferrer">Cebu Daily News, 2026 ↗</a></small></span></div>
          <span className="hero-side-note">A PLACE FOR EVERY GENERATION</span>
          <div className="hero-sticker" aria-hidden="true"><span>MADE TO</span><strong>BE<br />SHARED</strong><i>✳</i></div>
        </div>
        <div className="hero-scroll-cue"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="intro-band" aria-label="About Pamana">
        <p>“Pamana” means <em>inheritance</em> — but heritage is never just something we receive. It is something we choose to carry.</p>
        <span className="intro-band-mark" aria-hidden="true">✳</span>
      </section>

      <section className="collection-section" id="explore">
        <div className="section-heading">
          <div><span className="eyebrow"><i /> YOUR COLLECTION STARTS HERE</span><h2>Three ways into<br /><em>the story.</em></h2></div>
          <p>These are starter templates, not a finished list. Shape each one around the art, traditions, and festivals you choose to celebrate.</p>
        </div>
        <div className="collection-grid">
          {collections.map((item) => (
            <Link className={`collection-card ${item.className}`} to={item.to} key={item.number}>
              <span className="collection-card-top"><span>{item.number} / {item.label}</span><span className="card-arrow" aria-hidden="true">↗</span></span>
              <span className="collection-art" aria-hidden="true"><i>{item.symbol}</i><span /><span /></span>
              <span className="collection-card-bottom"><strong>{item.title}</strong><span>{item.description}</span><b>Explore template <i aria-hidden="true">↗</i></b></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <div className="note-stamp" aria-hidden="true">YOUR<br />STORY<br /><span>HERE</span></div>
        <div className="home-note-copy"><span className="eyebrow"><i /> A COLLECTION IN THE MAKING</span><h2>Nothing is set in stone.<br /><em>That is the point.</em></h2><p>Swap the sample text, add your own images and clips, and choose a color palette that feels like your community. Your collection begins with what matters to you.</p></div>
        <Link className="button-light" to="/arts">Start shaping your collection <span aria-hidden="true">→</span></Link>
      </section>

      <div className="heritage-marquee" aria-label="Made of many stories, carried by many hands">
        <div className="heritage-marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => <span className="heritage-marquee-copy" key={copy}>MADE OF MANY STORIES <i>✳</i> CARRIED BY MANY HANDS <i>✳</i> ALWAYS BECOMING <i>✳</i>&nbsp;</span>)}
        </div>
      </div>

      <section className="team-showcase" id="team" aria-labelledby="team-title">
        <div className="team-showcase-orbit team-orbit-a" aria-hidden="true" />
        <div className="team-showcase-orbit team-orbit-b" aria-hidden="true" />
        <div className="team-showcase-head">
          <div>
            <span className="eyebrow"><i /> THE PEOPLE BEHIND THE PIXELS</span>
            <h2 id="team-title">The hands behind<br /><em>the shared canvas.</em></h2>
          </div>
          <p>Four students brought Pamana to life. Choose a portrait to meet one of the people shaping this project.</p>
        </div>
        <div className="team-browser-view">
          <article className={`team-feature-panel${activeDeveloper ? ` ${activeDeveloper.color} has-selection` : ''}`} aria-live="polite" key={activeDeveloper?.index ?? 'team-intro'}>
            <div className="team-feature-topline">
              <span>{activeDeveloper ? `PROFILE / ${activeDeveloper.index}` : 'THE MAKERS / 2026'}</span>
              {activeDeveloper && <button type="button" onClick={() => setSelectedDeveloper(null)}>ALL DEVELOPERS <i aria-hidden="true">×</i></button>}
            </div>
            <div className={`team-feature-image${activeDeveloper?.photo ? ' is-loading' : ''}`}>
              {activeDeveloper?.photo ? (
                <img src={activeDeveloper.photo} alt={`Portrait of ${activeDeveloper.name}`} onLoad={markImageLoaded} onError={markImageLoaded} />
              ) : (
                <div className="team-feature-art" aria-label="Pamana team profile introduction">
                  <span className="team-feature-sun" /><span className="team-feature-orbit feature-orbit-one" /><span className="team-feature-orbit feature-orbit-two" />
                  <span className="team-feature-word">MADE<br />TOGETHER</span><span className="team-feature-seal">PAMANA <i>✳</i></span>
                </div>
              )}
              {activeDeveloper && <span className="team-feature-image-caption">A FACE BEHIND THE STORY <i>✳</i></span>}
            </div>
            <div className="team-feature-copy">
              {activeDeveloper ? (
                <>
                  <span className="team-profile-role">PROJECT ROLE / READY TO PERSONALIZE</span>
                  <h3>{activeDeveloper.name}</h3>
                  <p className="team-profile-bio">“Add a personal introduction in {activeDeveloper.name.split(' ')[0]}’s own words. Share what they contributed to Pamana, what they care about, and what Filipino heritage means to them.”</p>
                  <div className="team-feature-meta"><span>ON THIS PROJECT</span><strong>Add their design, research, writing, or development role</strong></div>
                  <div className="team-feature-socials" aria-label={`${activeDeveloper.name} social link placeholders`}>
                    <span><b>IG</b><small>Instagram link</small><i>↗</i></span>
                    <span><b>FB</b><small>Facebook link</small><i>↗</i></span>
                    <span><b>GH</b><small>GitHub link</small><i>↗</i></span>
                    <span><b>IN</b><small>LinkedIn link</small><i>↗</i></span>
                  </div>
                </>
              ) : (
                <>
                  <span className="team-profile-role">A STUDENT-MADE CULTURAL HERITAGE PROJECT</span>
                  <h3>Meet the people who made Pamana.</h3>
                  <p className="team-profile-bio">Four students, one shared canvas. Choose a portrait to see a personal introduction, project role, and links—ready for each developer to make their own.</p>
                  <div className="team-feature-meta"><span>THE CREW</span><strong>4 makers · 1 living collection · stories still unfolding</strong></div>
                </>
              )}
            </div>
          </article>

          <div className="team-directory">
            <div className="team-directory-heading">
              <div><span className="team-directory-kicker">THE PEOPLE BEHIND THE PIXELS</span><h3>Meet the makers<span>.</span></h3><p>Select a developer to open their profile.</p></div>
              <div className="team-directory-controls">
                <button type="button" onClick={() => showNeighbor(-1)} aria-label="Previous developer">↑</button>
                <button type="button" onClick={() => showNeighbor(1)} aria-label="Next developer">↓</button>
              </div>
            </div>
            <div className="team-picker-grid" role="group" aria-label="Choose a developer profile">
              {developers.map((developer) => (
                <button
                  type="button"
                  className={`team-picker-card ${developer.color}${selectedDeveloper === developer.index ? ' selected' : ''}`}
                  key={developer.index}
                  aria-pressed={selectedDeveloper === developer.index}
                  onClick={() => setSelectedDeveloper(developer.index)}
                >
                  <span className={`team-picker-photo${developer.photo ? ' is-loading' : ''}`}>
                    {developer.photo ? <img src={developer.photo} alt="" onLoad={markImageLoaded} onError={markImageLoaded} /> : <span>{developer.initials}</span>}
                    <i aria-hidden="true">{selectedDeveloper === developer.index ? '✳' : '↗'}</i>
                  </span>
                  <span className="team-picker-name"><small>{developer.index} / PAMANA</small><strong>{developer.name}</strong><em>Project developer</em></span>
                </button>
              ))}
            </div>
            <div className="team-directory-foot"><span>FOUR MAKERS · ONE LIVING PROJECT</span><i>✳</i></div>
          </div>
        </div>
        <div className="team-showcase-foot"><span>FOUR PEOPLE · ONE LIVING PROJECT</span><span>PROFILE BIOS & LINKS ARE EDITABLE PLACEHOLDERS <i>✳</i></span></div>
      </section>
    </main>
  );
}
