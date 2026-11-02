import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PreviousArtPage, { PhotoViewer } from './PreviousArtPage';
import { artCategories, artForms } from './artData';
import './arts-refined.css';

function RefinedArtPage() {
  const [category, setCategory] = useState('All forms');
  const [selection, setSelection] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const heading = useRef(null);
  const closePhoto = useCallback(() => setSelection(null), []);
  const activeIndex = Math.max(0, artForms.findIndex((art) => art.id === searchParams.get('art')));
  const active = artForms[activeIndex];
  const visibleArt = category === 'All forms' ? artForms : artForms.filter((art) => art.category === category);
  const previous = artForms[activeIndex - 1];
  const next = artForms[activeIndex + 1];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const targetId = location.hash.slice(1) || (searchParams.has('art') ? 'art-details' : '');
      const target = targetId && document.getElementById(targetId);
      if (target) {
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.motion-off');
        target.scrollIntoView({ behavior: still ? 'instant' : 'smooth', block: 'start' });
        if (targetId === 'art-details') heading.current?.focus({ preventScroll: true });
      } else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.search, searchParams]);

  const chooseArt = (art) => navigate(`/arts?art=${art.id}#art-details`);
  const openPhoto = (index) => setSelection({ artId: active.id, index });

  return (
    <main id="main-content" className="arts-refined-page">
      <section className="art-refined-intro" aria-labelledby="arts-title" data-reveal-skip>
        <div><span className="eyebrow"><i /> ARTS & MAKERS</span><h1 id="arts-title">Everyday art.<br /><em>Enduring stories.</em></h1></div>
        <p>Discover the craft behind the clothes we wear, the homes we build, and the streets we travel. Five Filipino forms, each with a story to tell.</p>
      </section>

      <section className="art-refined-collection" id="arts-collection" aria-labelledby="collection-title" data-reveal-skip>
        <div className="art-refined-collection-heading"><div><h2 id="collection-title">Choose an art form</h2><p>Select a form to explore its story and photographs.</p></div><div className="art-refined-filters" role="group" aria-label="Filter art forms">
          {artCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div></div>
        <p className="arts-sr-only" role="status">{visibleArt.length} art forms shown. Currently reading {active.title}.</p>
        <div className="art-refined-choices">
          {visibleArt.map((art) => <button className={`art-choice art-choice-${art.id}`} key={art.id} type="button" aria-pressed={art.id === active.id} aria-controls="art-details" aria-label={`Read about ${art.title}`} onClick={() => chooseArt(art)}>
            <span className="art-choice-image"><img src={art.photos[0].src} alt="" loading="lazy" /></span>
            <span className="art-choice-copy"><small>{art.category}</small><strong>{art.title}</strong><span>{art.id === active.id ? 'Currently reading' : 'Read story'}<i aria-hidden="true">{art.id === active.id ? '✓' : '↗'}</i></span></span>
          </button>)}
        </div>
      </section>

      <section className="art-refined-reader" id="art-details" aria-labelledby="art-detail-title" data-reveal-skip>
        <div className="art-refined-reader-bar"><span className="arts-micro">THE COLLECTION / {active.category}</span><a href="#arts-collection">↑ Choose another art form</a></div>
        <article className="art-refined-story" key={active.id}>
          <header className="art-refined-story-heading">
            <span className="art-refined-category">{active.category}</span>
            <h2 id="art-detail-title" ref={heading} tabIndex={-1}>{active.title}</h2>
            <p className="art-refined-introduction">{active.introduction}</p>
          </header>
          <div className="art-refined-media">
            <figure><button className="art-refined-main-photo" type="button" onClick={() => openPhoto(0)} aria-label={`Enlarge main photo of ${active.title}`}><img src={active.photos[0].src} alt={active.photos[0].alt} /><span aria-hidden="true">↗</span></button><figcaption>{active.photos[0].caption}</figcaption></figure>
            <div className="art-refined-more-photos"><span>MORE VIEWS</span><small>Select any photo to enlarge</small></div>
            <div className="art-refined-thumbnails">{active.photos.slice(1).map((photo, index) => <button type="button" key={photo.src} onClick={() => openPhoto(index + 1)} aria-label={`Enlarge ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span aria-hidden="true">↗</span></button>)}</div>
            <p className="art-refined-look-note">{active.lookFor}</p>
          </div>
          <div className="art-refined-copy">
            <dl className="art-refined-facts"><div><dt>Origin</dt><dd>{active.origin}</dd></div><div><dt>Period</dt><dd>{active.era}</dd></div><div><dt>Materials & form</dt><dd>{active.material}</dd></div><div><dt>Where it lives on</dt><dd>{active.occasion}</dd></div></dl>
            <div className="art-refined-text"><section aria-labelledby={`origins-${active.id}`}><h3 id={`origins-${active.id}`}>Origins & evolution</h3><p>{active.story}</p></section><section aria-labelledby={`craft-${active.id}`}><h3 id={`craft-${active.id}`}>Craft & details</h3><p>{active.craft}</p></section><section aria-labelledby={`meaning-${active.id}`}><h3 id={`meaning-${active.id}`}>Why it matters</h3><p>{active.meaning}</p></section></div>
          </div>
        </article>
        <nav className="art-refined-pagination" aria-label="Browse art stories"><button type="button" disabled={!previous} onClick={() => chooseArt(previous)}><span aria-hidden="true">←</span><span><small>PREVIOUS</small><strong>{previous?.title ?? 'First art form'}</strong></span></button><span className="arts-micro">{activeIndex + 1} of {artForms.length} art forms</span><button type="button" disabled={!next} onClick={() => chooseArt(next)}><span><small>NEXT</small><strong>{next?.title ?? 'Collection complete'}</strong></span><span aria-hidden="true">→</span></button></nav>
      </section>
      {selection && <PhotoViewer selection={selection} onClose={closePhoto} onChange={setSelection} />}
    </main>
  );
}

export default function ArtsPage() {
  const [design, setDesign] = useState(() => window.localStorage.getItem('pamana-arts-design') === 'previous' ? 'previous' : 'refined');
  const navigate = useNavigate();
  const changeDesign = (nextDesign) => {
    window.localStorage.setItem('pamana-arts-design', nextDesign);
    setDesign(nextDesign);
    navigate('/arts', { replace: true });
  };

  return (
    <>
      <aside className="arts-design-options" aria-label="Arts design options"><div><strong>Choose your Arts layout</strong><span>Switch back anytime. Your choice is saved.</span></div><div className="arts-design-switch" role="group" aria-label="Compare Arts designs"><button type="button" aria-pressed={design === 'refined'} onClick={() => changeDesign('refined')}>New design</button><button type="button" aria-pressed={design === 'previous'} onClick={() => changeDesign('previous')}>Previous design</button></div><span className="arts-sr-only" role="status">{design === 'refined' ? 'New' : 'Previous'} design active.</span></aside>
      {design === 'previous' ? <PreviousArtPage /> : <RefinedArtPage />}
    </>
  );
}
