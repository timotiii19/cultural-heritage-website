import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { artForms } from './arts/artData';
import './arts/arts.css';

const totalResearch = artForms.reduce((total, art) => total + art.sources.length, 0);
const totalImages = artForms.reduce((total, art) => total + art.photos.length, 0);
const filters = ['All sources', 'Research', 'Images'];

export default function ReferencesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All sources');
  const location = useLocation();
  const search = query.trim().toLocaleLowerCase();
  const groups = artForms.map((art) => {
    const matches = (text) => `${art.title} ${art.category} ${text}`.toLocaleLowerCase().includes(search);
    return { ...art,
      research: filter === 'Images' ? [] : art.sources.filter((source) => matches(`${source.citation} ${source.url}`)),
      images: filter === 'Research' ? [] : art.photos.filter((photo) => matches(`${photo.caption} ${photo.source} image photo ${photo.number}`)),
    };
  }).filter((art) => art.research.length || art.images.length);
  const resultCount = groups.reduce((total, art) => total + art.research.length + art.images.length, 0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <main id="main-content" className="arts-references-page">
      <section className="arts-reference-hero">
        <Link className="button-text" to="/arts"><span aria-hidden="true">←</span> Back to the arts collection</Link>
        <div className="arts-reference-heading"><div><span className="eyebrow"><i /> THE PAMANA REFERENCE LIBRARY</span><h1>Behind every story,<br /><em>a place to look further.</em></h1><p>The research and image links behind our arts collection, gathered in one place. Explore the sources for each form and follow the details that interest you.</p></div><div className="arts-reference-seal"><span>THE ARTS COLLECTION</span><strong>{totalResearch + totalImages}</strong><span>SOURCES & IMAGE LINKS</span></div></div>
        <div className="arts-reference-ledger"><span><b>01</b> ARTS & MAKERS</span><span>{totalResearch} research references</span><span>{totalImages} image sources</span><span>5 Filipino forms</span></div>
      </section>

      <section className="arts-reference-library" aria-label="Arts sources and image credits" data-reveal-skip>
        <div className="arts-reference-tools"><label className="arts-reference-search"><span aria-hidden="true">⌕</span><span className="arts-sr-only">Search references by subject, author, title, or website</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a subject, author, or source…" /></label><div className="arts-filters" role="group" aria-label="Filter reference type">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="arts-reference-subnav"><nav aria-label="Jump to an art subject">{groups.map((art) => <a href={`#${art.id}`} key={art.id}>{art.title} <span aria-hidden="true">↘</span></a>)}</nav><span className="arts-micro" role="status">{resultCount} SOURCE{resultCount === 1 ? '' : 'S'} ON VIEW</span></div>
        {groups.length ? groups.map((art) => <section className="arts-reference-group" id={art.id} key={art.id} aria-labelledby={`reference-${art.id}`}>
          <div className="arts-reference-subject"><div className="arts-reference-thumbnail"><img src={art.photos[0].src} alt={art.photos[0].alt} loading="lazy" /></div><span className="arts-micro">{art.category}</span><h2 id={`reference-${art.id}`}>{art.title}</h2><p>{art.shortTitle}</p><Link className="button-text" to="/arts#arts-collection">Visit the collection <span aria-hidden="true">↗</span></Link></div>
          <div className="arts-reference-entries">
            {art.research.length > 0 && <div><h3 className="arts-reference-list-heading"><span>THE RESEARCH</span><small>{art.research.length} reference{art.research.length === 1 ? '' : 's'}</small></h3><ol className="arts-citation-list">{art.research.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.citation}</span><i aria-hidden="true">↗</i><small>{new URL(source.url).hostname.replace(/^www\./, '')}</small></a></li>)}</ol></div>}
            {art.images.length > 0 && <div className="arts-image-credit-section"><h3 className="arts-reference-list-heading"><span>THE PHOTO ALBUM</span><small>{art.images.length} image source{art.images.length === 1 ? '' : 's'}</small></h3><div className="arts-image-credit-grid">{art.images.map((photo) => <a key={photo.src} href={photo.source} target="_blank" rel="noreferrer"><img src={photo.src} alt={photo.alt} loading="lazy" /><span><b>PHOTO {photo.number} <i aria-hidden="true">↗</i></b><small>{new URL(photo.source).hostname === 'pin.it' ? 'Pinterest source link' : new URL(photo.source).hostname}</small></span></a>)}</div></div>}
          </div>
        </section>) : <div className="arts-reference-empty"><span aria-hidden="true">✳</span><h2>No sources found.</h2><p>Try a subject such as “Jeepney,” an author, or a website name.</p><button className="button-primary" type="button" onClick={() => { setQuery(''); setFilter('All sources'); }}>Clear search & filters</button></div>}
      </section>

      <section className="arts-reference-endnote"><span aria-hidden="true">✳</span><div><h2>Good stories leave a trail.</h2><p>References and image links transcribed from <cite>RVA CHOICES W_INFO</cite>. Image-source links are listed as supplied; Pinterest links lead to the provided pins. “n.d.” indicates that no publication date was specified in the document.</p></div><Link className="button-text" to="/arts">Return to the gallery <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
