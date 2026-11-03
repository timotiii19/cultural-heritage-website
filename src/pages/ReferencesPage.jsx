import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { artForms } from './arts/artData';
import { superstitionStories, superstitionVisualReferences } from './traditions/superstition/superstitionData';
import { christmasStories } from './traditions/christmas-festivities/traditionData';
import socialEtiquette from './traditions/social-etiquette/traditionData';
import './arts/arts.css';

const superstitionReferences = [...new Map(superstitionStories.flatMap((story) => story.sources).map((source) => [source.url, source])).values()];
const christmasReferences = christmasStories.flatMap((story) => story.sources);
const christmasPhotos = christmasStories.flatMap((story) => story.photos);
const socialEtiquetteReferences = [...socialEtiquette.sources, ...socialEtiquette.entries.flatMap((entry) => entry.sources)];
const socialEtiquettePhotos = socialEtiquette.entries.filter((entry) => entry.photo).length + Number(Boolean(socialEtiquette.heroPhoto));
const totalResearch = artForms.reduce((total, art) => total + art.sources.length, 0) + superstitionReferences.length + christmasReferences.length + socialEtiquetteReferences.length;
const totalImages = artForms.reduce((total, art) => total + art.photos.length, 0) + superstitionVisualReferences.length + christmasPhotos.length + socialEtiquettePhotos;
const filters = ['All sources', 'Research', 'Images'];

export default function ReferencesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All sources');
  const location = useLocation();
  const search = query.trim().toLocaleLowerCase();
  const groups = [...artForms, ...(socialEtiquette.heroPhoto ? [{
    id: 'social-etiquette',
    title: socialEtiquette.title,
    category: 'Traditions · Social Etiquette & Values',
    shortTitle: 'Shared customs, etiquette, and values',
    photos: [{ ...socialEtiquette.heroPhoto, number: '01', source: socialEtiquette.heroPhoto.source }],
    sources: socialEtiquette.sources,
    storyPath: '/traditions/social-etiquette',
    motif: socialEtiquette.motif,
  }] : []), ...socialEtiquette.entries.map((entry) => ({
    id: `social-${entry.id}`,
    title: entry.title,
    category: 'Traditions · Social Etiquette & Values',
    shortTitle: entry.subtitle,
    photos: entry.photo ? [{ ...entry.photo, number: '01', source: entry.photo.source }] : [],
    sources: entry.sources,
    storyPath: `/traditions/social-etiquette/${entry.id}`,
    motif: socialEtiquette.motif,
  })), ...superstitionStories.map((story) => ({
    id: story.id === 'pagpag' ? 'superstition-sources' : `superstition-${story.id}`,
    title: story.title,
    category: 'Traditions · Superstition',
    shortTitle: story.subtitle,
    photos: superstitionVisualReferences.filter((photo) => photo.storyId === story.id)
      .map((photo, index) => ({ ...photo, number: String(index + 1).padStart(2, '0') })),
    sources: [...story.sources, { citation: story.video.title, url: story.video.url }],
    storyPath: `/traditions/superstition/${story.id}`,
  })), ...christmasStories.map((story) => ({
    id: `christmas-${story.id}`,
    title: story.title,
    category: 'Traditions · Christmas Festivities',
    shortTitle: story.subtitle,
    photos: story.photos.map((photo, index) => ({ ...photo, number: String(index + 1).padStart(2, '0') })),
    sources: story.sources,
    storyPath: `/traditions/christmas-festivities/${story.id}`,
    motif: story.motif,
  }))].map((group) => {
    const matches = (text) => `${group.title} ${group.category} ${text}`.toLocaleLowerCase().includes(search);
    return {
      ...group,
      research: filter === 'Images' ? [] : group.sources.filter((source) => matches(`${source.citation} ${source.url ?? ''}`)),
      images: filter === 'Research' ? [] : group.photos.filter((photo) => matches(`${photo.caption} ${photo.source} image photo ${photo.number}`)),
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
        <Link className="button-text" to="/"><span aria-hidden="true">←</span> Back to Pamana</Link>
        <div className="arts-reference-heading"><div><span className="eyebrow"><i /> THE PAMANA REFERENCE LIBRARY</span><h1>Behind every story,<br /><em>a place to look further.</em></h1><p>Research and image links behind the arts and traditions collections, gathered in one place. Explore the sources for each subject and follow the details that interest you.</p></div><div className="arts-reference-seal"><span>ARTS + TRADITIONS</span><strong>{totalResearch + totalImages}</strong><span>SOURCES & IMAGE LINKS</span></div></div>
        <div className="arts-reference-ledger"><span><b>01</b> ARTS & TRADITIONS</span><span>{totalResearch} research references</span><span>{totalImages} image sources</span><span>5 art forms · 3 traditions</span></div>
      </section>

      <section className="arts-reference-library" aria-label="Arts sources and image credits" data-reveal-skip>
        <div className="arts-reference-tools"><label className="arts-reference-search"><span aria-hidden="true">⌕</span><span className="arts-sr-only">Search references by subject, author, title, or website</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a subject, author, or source…" /></label><div className="arts-filters" role="group" aria-label="Filter reference type">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="arts-reference-subnav"><nav aria-label="Jump to a reference subject">{groups.map((art) => <a href={`#${art.id}`} key={art.id}>{art.title} <span aria-hidden="true">↘</span></a>)}</nav><span className="arts-micro" role="status">{resultCount} SOURCE{resultCount === 1 ? '' : 'S'} ON VIEW</span></div>
        {groups.length ? groups.map((art) => <section className="arts-reference-group" id={art.id} key={art.id} aria-labelledby={`reference-${art.id}`}>
          <div className="arts-reference-subject"><div className="arts-reference-thumbnail">{art.photos[0] ? <img className={art.photos[0].orientation === 'portrait' ? 'is-portrait' : ''} src={art.photos[0].src} alt={art.photos[0].alt} loading="lazy" /> : <span className="arts-reference-motif" aria-hidden="true">{art.motif}</span>}</div><span className="arts-micro">{art.category}</span><h2 id={`reference-${art.id}`}>{art.title}</h2><p>{art.shortTitle}</p><Link className="button-text" to={art.storyPath ?? '/arts#arts-collection'}>{art.storyPath ? 'Visit the story' : 'Visit the collection'} <span aria-hidden="true">↗</span></Link></div>
          <div className="arts-reference-entries">
            {art.research.length > 0 && <div><h3 className="arts-reference-list-heading"><span>THE RESEARCH</span><small>{art.research.length} reference{art.research.length === 1 ? '' : 's'}</small></h3><ol className="arts-citation-list">{art.research.map((source) => <li key={source.citation}>{source.url ? <a href={source.url} target="_blank" rel="noreferrer"><span>{source.citation}</span><i aria-hidden="true">↗</i><small>{new URL(source.url).hostname.replace(/^www\./, '')}</small></a> : <p className="arts-citation-unlinked">{source.citation}</p>}</li>)}</ol></div>}
            {art.images.length > 0 && <div className="arts-image-credit-section"><h3 className="arts-reference-list-heading"><span>THE PHOTO ALBUM</span><small>{art.images.length} image source{art.images.length === 1 ? '' : 's'}</small></h3><div className="arts-image-credit-grid">{art.images.map((photo) => <a key={photo.src} href={photo.source} target="_blank" rel="noreferrer"><img className={photo.orientation === 'portrait' ? 'is-portrait' : ''} src={photo.src} alt={photo.alt} loading="lazy" /><span><b>PHOTO {photo.number} <i aria-hidden="true">↗</i></b><small>{new URL(photo.source).hostname === 'pin.it' ? 'Pinterest source link' : new URL(photo.source).hostname}</small></span></a>)}</div></div>}
          </div>
        </section>) : <div className="arts-reference-empty"><span aria-hidden="true">✳</span><h2>No sources found.</h2><p>Try a subject such as “Jeepney,” an author, or a website name.</p><button className="button-primary" type="button" onClick={() => { setQuery(''); setFilter('All sources'); }}>Clear search & filters</button></div>}
      </section>

      <section className="arts-reference-endnote"><span aria-hidden="true">✳</span><div><h2>Good stories leave a trail.</h2><p>Arts and tradition references are grouped by subject. Follow a source link to read the original research and cultural education materials.</p></div><Link className="button-text" to="/arts">Return to the gallery <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
