import { Link, Navigate, useParams } from 'react-router-dom';
import { traditionCategories } from './traditionData';
import SuperstitionPage from './superstition/SuperstitionPage';
import ChristmasPage from './christmas-festivities/ChristmasPage';

export default function TraditionCategoryPage() {
  const { categoryId } = useParams();
  const category = traditionCategories.find((item) => item.id === categoryId);

  if (!category) return <Navigate to="/traditions" replace />;
  if (categoryId === 'superstition') return <SuperstitionPage />;
  if (categoryId === 'christmas-festivities') return <ChristmasPage />;
  if (categoryId === 'social-etiquette') return <SocialEtiquetteCategory category={category} />;

  return (
    <main id="main-content" className="inner-page">
      <section className="tradition-detail-hero">
        <div>
          <Link className="inline-link" to="/traditions"><span aria-hidden="true">←</span> All traditions</Link>
          <span className="eyebrow tradition-detail-kicker"><i /> TRADITION SUBCATEGORY</span>
          <h1>{category.title}</h1>
          <p>{categoryId === 'social-etiquette' ? 'Explore researched notes on respectful speech, greetings for elders, and community cooperation.' : 'Choose a topic to open its content template. The cultural information is intentionally blank until research is completed.'}</p>
          <div className="template-pill"><span /> {categoryId === 'social-etiquette' ? '3 researched topics · Sources included' : 'Template only · Research needed'}</div>
        </div>
        {category.heroPhoto ? (
          <figure className="social-etiquette-category-photo">
            <img src={category.heroPhoto.src} alt={category.heroPhoto.alt} />
            <figcaption><span>{category.heroPhoto.caption}</span><a href={category.heroPhoto.source} target="_blank" rel="noreferrer">{category.heroPhoto.credit} ↗</a></figcaption>
          </figure>
        ) : <div className={`tradition-detail-art ${category.id}`} aria-hidden="true"><span>{category.motif}</span><small>{category.title}</small></div>}
      </section>

      {categoryId !== 'social-etiquette' && <section className="sample-banner"><span className="sample-banner-icon">♡</span><p><strong>Research first.</strong> These topic pages are placeholders only. Add verified information, sources, and community perspectives after research.</p><span className="sample-banner-tag">NO SAMPLE CLAIMS</span></section>}

      <section className="tradition-more-stories">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><i /> {categoryId === 'social-etiquette' ? 'CULTURAL PRACTICES' : 'TOPIC TEMPLATES'}</span><h2>{categoryId === 'social-etiquette' ? <>Explore the<br /><em>practices.</em></> : <>Choose a topic.<br /><em>Build its story.</em></>}</h2></div>
          <p>{categoryId === 'social-etiquette' ? 'Each topic page includes a researched overview and links to its references.' : 'Each card opens an individual page with the same blank research template.'}</p>
        </div>
        <div className="tradition-more-grid">
          {category.entries.map((entry, index) => (
            <Link className="tradition-more-card" key={entry.id} to={`/traditions/${category.id}/${entry.id}`}>
              <span className="tradition-entry-meta">TOPIC / 0{index + 1}</span>
              {categoryId === 'social-etiquette' && entry.photo && <img className="social-etiquette-card-photo" src={entry.photo.src} alt={entry.photo.alt} loading="lazy" />}
              <strong>{entry.title}</strong>
              <span>{categoryId === 'social-etiquette' ? entry.subtitle : 'Content and sources to be added after research.'}</span>
              <i aria-hidden="true">{categoryId === 'social-etiquette' ? 'Read the research' : 'Open template ↗'}</i>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function SocialEtiquetteCategory({ category }) {
  const practiceNotes = ['WORDS / 01', 'GREETING / 02', 'COMMUNITY / 03'];

  return (
    <main id="main-content" className="inner-page social-etiquette-page">
      <section className="social-etiquette-hero">
        <div className="social-etiquette-hero-copy">
          <Link className="inline-link" to="/traditions"><span aria-hidden="true">←</span> All traditions</Link>
          <span className="eyebrow"><i /> FILIPINO SOCIAL ETIQUETTE & VALUES</span>
          <h1>Respect lives<br />in the <em>everyday.</em></h1>
          <p>Small words, a gentle greeting, and a hand offered to a neighbor. Explore three practices that express care for elders, family, and community.</p>
          <a className="social-etiquette-hero-link" href="#social-practices">Explore the practices <span aria-hidden="true">↓</span></a>
          <div className="social-etiquette-hero-index" aria-label="Featured practices">
            {category.entries.map((entry, index) => <span key={entry.id}><b>0{index + 1}</b>{entry.title}</span>)}
          </div>
        </div>
        <figure className="social-etiquette-cover">
          <img src={category.heroPhoto.src} alt={category.heroPhoto.alt} />
          <span className="social-etiquette-cover-seal" aria-hidden="true">KAPWA<br /><i>♡</i></span>
          <figcaption><span>{category.heroPhoto.caption}</span><a href={category.heroPhoto.source} target="_blank" rel="noreferrer">{category.heroPhoto.credit} ↗</a></figcaption>
        </figure>
        <div className="social-etiquette-hero-foot"><span>01 — CARE IN WORDS</span><span>02 — RESPECT ACROSS GENERATIONS</span><span>03 — HELPING AS A COMMUNITY</span></div>
      </section>

      <section className="social-etiquette-practices" id="social-practices">
        <div className="social-etiquette-section-head">
          <div><span className="eyebrow"><i /> THREE PRACTICES · SHARED VALUES</span><h2>Different gestures.<br /><em>A common thread.</em></h2></div>
          <p>Choose a practice to explore its meaning, everyday expressions, and the values it can carry.</p>
        </div>
        <div className="social-etiquette-practice-grid">
          {category.entries.map((entry, index) => (
            <Link className="social-etiquette-practice-card" data-practice={entry.id} key={entry.id} to={`/traditions/${category.id}/${entry.id}`}>
              <div className="social-etiquette-practice-image"><img src={entry.photo.src} alt={entry.photo.alt} loading="lazy" /><span>{practiceNotes[index]}</span><strong aria-hidden="true">0{index + 1}</strong><i aria-hidden="true">↗</i></div>
              <div className="social-etiquette-practice-copy"><div className="social-etiquette-card-meta"><span>{entry.subtitle}</span><small>{entry.sources.length} references</small></div><h3>{entry.title}</h3><p>{entry.overview}</p><b>Read the research <i aria-hidden="true">→</i></b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="social-etiquette-values">
        <div className="social-etiquette-values-heading"><span className="eyebrow"><i /> THE THREAD BETWEEN THEM</span><h2>Respect, care,<br /><em>and shared effort.</em></h2><p>These practices can make relationships visible: attention in speech, welcome across generations, and cooperation when someone needs help.</p></div>
        <div className="social-etiquette-values-list">
          <article><span>01</span><div><h3>Consideration</h3><p>Words and tone can signal respect in a particular relationship and language.</p></div></article>
          <article><span>02</span><div><h3>Intergenerational care</h3><p>Greetings can carry affection, respect, and recognition between younger and older family members.</p></div></article>
          <article><span>03</span><div><h3>Community cooperation</h3><p>Bayanihan brings people together around a task or a neighbor’s need.</p></div></article>
        </div>
      </section>

      <aside className="social-etiquette-context-note"><span aria-hidden="true">✳</span><p><strong>Culture lives in context.</strong> Practices vary among families, regions, and language communities. Follow the people you are with and treat these examples as invitations to learn, not rules for every Filipino.</p><Link className="button-text" to="/references#social-etiquette">Explore the references <span aria-hidden="true">↗</span></Link></aside>
    </main>
  );
}
