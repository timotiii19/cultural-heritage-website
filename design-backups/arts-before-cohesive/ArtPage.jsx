import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { artCategories, artForms } from './artData';
import './arts.css';

const chapters = [
  { era: 'PRE-COLONIAL ROOTS', title: 'Made for life here.', text: 'Early dress and the bahay kubo grew from local needs, materials, and ways of living.', ids: ['barong', 'barot-saya', 'bahay-kubo'] },
  { era: 'THE COLONIAL PERIOD', title: 'Forms in conversation.', text: 'Dress evolved through cultural encounters; the kalesa entered Philippine streets in the 1700s.', ids: ['barot-saya', 'kalesa'] },
  { era: 'AFTER WORLD WAR II', title: 'Resourcefulness in motion.', text: 'Surplus military jeeps became public transport. A practical solution grew into a cultural icon.', ids: ['jeepney'] },
  { era: 'CARRIED INTO TODAY', title: 'Heritage keeps moving.', text: 'Contemporary clothing, homes, and vehicles carry old ideas into new chapters.', ids: ['barong', 'bahay-kubo', 'jeepney'] },
];

function PhotoViewer({ selection, onClose, onChange }) {
  const dialog = useRef(null);
  const opener = useRef(document.activeElement);
  const art = artForms.find((item) => item.id === selection.artId);
  const photo = art.photos[selection.index];
  const move = (step) => onChange({ ...selection, index: (selection.index + step + art.photos.length) % art.photos.length });

  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialog} className="arts-lightbox" aria-labelledby="photo-viewer-title"
      onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      }}>
      <div className="arts-lightbox-content">
        <div className="arts-lightbox-top"><span id="photo-viewer-title">{art.title} / THE PHOTO ALBUM</span><button type="button" onClick={onClose} aria-label="Close photo viewer">×</button></div>
        <div className="arts-lightbox-stage">
          <button className="arts-photo-arrow" type="button" onClick={() => move(-1)} aria-label="Previous photo">←</button>
          <img src={photo.src} alt={photo.alt} />
          <button className="arts-photo-arrow" type="button" onClick={() => move(1)} aria-label="Next photo">→</button>
        </div>
        <div className="arts-lightbox-caption" aria-live="polite"><div><span className="arts-micro">PHOTO {photo.number} / 03</span><p>{photo.caption}</p></div></div>
        <p className="arts-lightbox-hint">Use ← → to browse · Esc to close</p>
      </div>
    </dialog>
  );
}

export default function ArtsPage() {
  const [category, setCategory] = useState('All forms');
  const [activeId, setActiveId] = useState(artForms[0].id);
  const [selection, setSelection] = useState(null);
  const storyRef = useRef(null);
  const storyHeading = useRef(null);
  const location = useLocation();
  const closePhoto = useCallback(() => setSelection(null), []);
  const active = artForms.find((art) => art.id === activeId);
  const visibleArt = category === 'All forms' ? artForms : artForms.filter((art) => art.category === category);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  const discoverStory = (artId) => {
    setActiveId(artId);
    requestAnimationFrame(() => {
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.motion-off');
      storyRef.current?.scrollIntoView({ behavior: still ? 'instant' : 'smooth', block: 'start' });
      storyHeading.current?.focus({ preventScroll: true });
    });
  };
  const openPhoto = (artId, index) => setSelection({ artId, index });

  return (
    <main id="main-content" className="arts-page">
      <section className="arts-hero" aria-labelledby="arts-title">
        <div className="arts-hero-copy">
          <span className="eyebrow"><i /> PAMANA COLLECTION NO. 01 / ARTS & MAKERS</span>
          <h1 id="arts-title">Art lives<br />beyond <em>the frame.</em></h1>
          <p>In the clothes we wear. The homes we build. The streets we travel. Discover five Filipino forms that turn everyday life into a work of art.</p>
          <div className="hero-actions"><a className="button-primary" href="#arts-collection">Step into the collection <span aria-hidden="true">↘</span></a></div>
          <div className="arts-hero-index"><span className="arts-index-star" aria-hidden="true">✳</span><div><strong>Five forms. Countless stories.</strong><small>CLOTHING · ARCHITECTURE · FUNCTIONAL ART</small></div></div>
        </div>
        <div className="arts-hero-composition">
          <span className="arts-hero-orbit" aria-hidden="true" />
          <figure className="arts-hero-main"><img src={artForms[0].photos[0].src} alt={artForms[0].photos[0].alt} fetchPriority="high" /><figcaption><span>BARONG TAGALOG</span><strong>Heritage is in the details.</strong></figcaption></figure>
          <figure className="arts-hero-inset"><img src={artForms[2].photos[0].src} alt={artForms[2].photos[0].alt} /><figcaption>A PLACE TO BELONG</figcaption></figure>
          <div className="arts-hero-seal" aria-label="Made, lived, carried forward"><span>MADE. LIVED.</span><b>✳</b><span>CARRIED FORWARD.</span></div>
          <span className="arts-vertical-note" aria-hidden="true">A LIVING EXHIBITION OF FILIPINO CREATIVITY</span>
        </div>
      </section>

      <section className="arts-curator-note" aria-label="About the collection"><span aria-hidden="true">✳</span><p>Not all art hangs on a wall.<br />Some of it <em>carries us home.</em></p><small>A COLLECTION OF THE<br />BEAUTY WE LIVE WITH</small></section>

      <section className="arts-collection" id="arts-collection" aria-labelledby="collection-title" data-reveal-skip>
        <div className="section-heading"><div><span className="eyebrow"><i /> FIND YOUR WAY IN</span><h2 id="collection-title">Made with purpose.<br /><em>Remembered with pride.</em></h2></div><p>From a single embroidered stitch to a whole house raised on bamboo, every form has a story worth looking closer at.</p></div>
        <div className="arts-filter-row"><div className="arts-filters" role="group" aria-label="Filter art forms">{artCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === 'All forms' ? artForms.length : artForms.filter((art) => art.category === item).length}</span></button>)}</div><span className="arts-micro" role="status">{String(visibleArt.length).padStart(2, '0')} / 05 FORMS ON VIEW</span></div>
        <div className={`arts-card-grid${category === 'All forms' ? ' arts-card-grid-all' : ''}`}>
          {visibleArt.map((art) => <article className={`arts-collection-card arts-card-${art.id}`} key={art.id}>
            <button className="arts-card-image" type="button" onClick={() => openPhoto(art.id, 0)} aria-label={`Enlarge main photo of ${art.title}`}><img src={art.photos[0].src} alt={art.photos[0].alt} loading="lazy" /><span className="arts-image-enlarge" aria-hidden="true">↗</span><span className="arts-card-image-label">{art.category}</span></button>
            <div className="arts-card-body"><span className="arts-micro">{art.category} / THE PHILIPPINES</span><h3>{art.title}</h3><p>{art.teaser}</p><button className="arts-story-link" type="button" onClick={() => discoverStory(art.id)}>Discover its story <span aria-hidden="true">↗</span></button></div>
          </article>)}
        </div>
      </section>

      <section className="arts-story-section" id="arts-stories" ref={storyRef} aria-labelledby="story-title">
        <div className="section-heading"><div><span className="eyebrow"><i /> THE STORIES BENEATH THE SURFACE</span><h2 id="story-title" ref={storyHeading} tabIndex={-1}>Take a closer look.<br /><em>There’s more to the making.</em></h2></div><p>Choose a form. Open its album. Follow the journey from a useful object to a lasting expression of identity.</p></div>
        <div className="arts-story-layout">
          <nav className="arts-story-directory" aria-label="Choose an art story"><span className="arts-micro">THE COLLECTION INDEX</span>{artForms.map((art) => <button key={art.id} type="button" aria-pressed={active.id === art.id} aria-controls="arts-active-story" onClick={() => setActiveId(art.id)}><span className="arts-directory-number">{art.number}</span><img src={art.photos[0].src} alt="" loading="lazy" /><span><strong>{art.title}</strong><small>{art.category}</small></span><i aria-hidden="true">↗</i></button>)}<div className="arts-directory-note"><span aria-hidden="true">❋</span><p>Look a little longer.<br />The details tell the story.</p></div></nav>
          <article className="arts-story-panel" id="arts-active-story" aria-label={`${active.title} story`} key={active.id}>
            <div className="arts-story-topline"><span className="arts-micro">FIELD NOTES / {active.number}</span><span className="arts-story-category">{active.category}</span></div>
            <h3>{active.title}</h3><p className="arts-story-deck">{active.shortTitle}</p>
            <div className={`arts-story-album arts-album-${active.id}`}><button className="arts-story-main-photo" type="button" onClick={() => openPhoto(active.id, 0)} aria-label={`Enlarge main photo of ${active.title}`}><img src={active.photos[0].src} alt={active.photos[0].alt} loading="lazy" /><span><b>THE MAIN VIEW</b><i aria-hidden="true">↗</i></span></button><div className="arts-story-supporting">{active.photos.slice(1).map((photo, index) => <button key={photo.src} type="button" onClick={() => openPhoto(active.id, index + 1)} aria-label={`Enlarge photo ${photo.number} of ${active.title}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span><i aria-hidden="true">↗</i></span></button>)}</div></div>
            <p className="arts-looking-note"><span aria-hidden="true">✳</span>{active.lookFor}</p>
            <p className="arts-story-introduction">{active.introduction}</p>
            <dl className="arts-facts"><div><dt>ROOTED IN</dt><dd>{active.origin}</dd></div><div><dt>FIRST CHAPTER</dt><dd>{active.era}</dd></div><div><dt>MADE WITH</dt><dd>{active.material}</dd></div><div><dt>PART OF LIFE</dt><dd>{active.occasion}</dd></div></dl>
            <div className="arts-story-accordions">{[{title: 'Origins & evolution', text: active.story}, {title: 'The craft & the details', text: active.craft}, {title: 'Meaning & living heritage', text: active.meaning}].map((item, index) => <details key={item.title} open={index === 0 ? true : undefined}><summary><span className="arts-micro">0{index + 1}</span>{item.title}<span className="arts-detail-plus" aria-hidden="true">+</span></summary><p>{item.text}</p></details>)}</div>
          </article>
        </div>
      </section>

      <section className="arts-timeline" aria-labelledby="timeline-title"><div className="arts-timeline-heading"><span className="eyebrow"><i /> ALWAYS BECOMING</span><h2 id="timeline-title">Different beginnings.<br /><em>One continuing story.</em></h2><p>These forms did not arrive all at once. They reflect generations of adaptation, encounter, and imagination.</p></div><ol>{chapters.map((chapter, index) => <li key={chapter.era}><span className="arts-timeline-dot" aria-hidden="true">0{index + 1}</span><small>{chapter.era}</small><h3>{chapter.title}</h3><p>{chapter.text}</p><div>{chapter.ids.map((id) => { const art = artForms.find((item) => item.id === id); return <button key={id} type="button" onClick={() => discoverStory(id)}>{art.title} ↗</button>; })}</div></li>)}</ol></section>

      <section className="arts-closing"><div className="arts-closing-mark" aria-hidden="true">✳</div><div><span className="eyebrow"><i /> KEEP EXPLORING</span><h2>Curiosity doesn’t<br /><em>end at the gallery.</em></h2><p>From the things we make to the customs we share, there are more ways to discover Filipino heritage. Keep exploring the stories that bring us together.</p><div className="hero-actions"><Link className="button-light" to="/traditions">Explore living traditions <span aria-hidden="true">↗</span></Link><Link className="arts-closing-link" to="/festivals">Discover festivals →</Link></div></div><span className="arts-closing-index">05 FORMS<br />15 PHOTOGRAPHS<br />MANY WAYS TO LOOK.</span></section>
      {selection && <PhotoViewer selection={selection} onClose={closePhoto} onChange={setSelection} />}
    </main>
  );
}
