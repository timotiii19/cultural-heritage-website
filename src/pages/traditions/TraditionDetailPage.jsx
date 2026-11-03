import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { traditionCategories } from './traditionData';
import { superstitionStories } from './superstition/superstitionData';
import SuperstitionStoryPage from './superstition/SuperstitionStoryPage';
import { christmasStories } from './christmas-festivities/traditionData';
import ChristmasStoryPage from './christmas-festivities/ChristmasStoryPage';

const templateSections = [
  { title: 'Overview', description: 'Add a researched introduction to this topic.' },
  { title: 'Details & context', description: 'Add verified details and context after research.' },
  { title: 'Community perspective', description: 'Add a community-approved perspective with permission.' },
  { title: 'Sources & credits', description: 'List sources, contributors, and image credits.' },
];

export default function TraditionDetailPage() {
  const { categoryId, entryId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, entryId]);
  const category = traditionCategories.find((item) => item.id === categoryId);
  const entry = category?.entries.find((item) => item.id === entryId);
  const superstitionStory = categoryId === 'superstition'
    ? superstitionStories.find((story) => story.id === entryId)
    : undefined;
  const christmasStory = categoryId === 'christmas-festivities'
    ? christmasStories.find((story) => story.id === entryId)
    : undefined;

  if (!category || !entry) return <Navigate to="/traditions" replace />;
  if (superstitionStory) return <SuperstitionStoryPage story={superstitionStory} />;
  if (christmasStory) return <ChristmasStoryPage story={christmasStory} />;

  if (categoryId === 'social-etiquette' && entry.overview) {
    const practiceIndex = category.entries.findIndex((item) => item.id === entry.id);
    const practiceType = ['SPOKEN COURTESY', 'RESPECTFUL GREETING', 'COMMUNITY COOPERATION'][practiceIndex];
    const previousEntry = category.entries[(practiceIndex - 1 + category.entries.length) % category.entries.length];
    const nextEntry = category.entries[(practiceIndex + 1) % category.entries.length];

    return (
      <main id="main-content" className="inner-page social-etiquette-detail-page" data-practice={entry.id}>
        <section className="social-etiquette-detail-hero">
          <div className="social-etiquette-detail-copy">
            <Link className="inline-link" to={`/traditions/${category.id}`}><span aria-hidden="true">←</span> {category.title}</Link>
            <span className="eyebrow"><i /> FIELD NOTE / 0{practiceIndex + 1} · {practiceType}</span>
            <h1>{entry.title}</h1>
            <p>{entry.subtitle}. Explore its meaning, how people practice it, and the values it can express.</p>
            <a className="social-etiquette-detail-scroll" href="#overview">Enter the story <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="social-etiquette-detail-photo">
            <img src={entry.photo.src} alt={entry.photo.alt} fetchPriority="high" />
            <figcaption><span>{entry.photo.caption}</span><a href={entry.photo.source} target="_blank" rel="noreferrer">{entry.photo.credit} ↗</a></figcaption>
            <span className="social-etiquette-detail-photo-index" aria-hidden="true">0{practiceIndex + 1}<i> / 03</i></span>
          </figure>
        </section>

        <nav className="social-etiquette-detail-index" aria-label="On this page">
          <a href="#overview"><span>01</span> The practice</a>
          <a href="#everyday"><span>02</span> In everyday life</a>
          <a href="#related"><span>03</span> Keep exploring</a>
        </nav>

        <section className="social-etiquette-editorial" id="overview">
          <div className="social-etiquette-editorial-mark"><span>THE PRACTICE</span><strong>0{practiceIndex + 1}</strong><i aria-hidden="true">✳</i></div>
          <div className="social-etiquette-editorial-copy">
            <span className="eyebrow"><i /> MEANING & CONTEXT</span>
            <h2>More than a gesture.<br /><em>A way of relating.</em></h2>
            <p className="social-etiquette-lede">{entry.overview}</p>
            <div className="social-etiquette-detail-notes">{entry.details.map((detail, index) => (
              <article key={detail}><span>NOTE / 0{index + 1}</span><p>{detail}</p></article>
            ))}</div>
          </div>
        </section>

        <section className="social-etiquette-in-practice" id="everyday" aria-labelledby="practice-examples-heading">
          <div className="social-etiquette-practice-heading"><div><span className="eyebrow"><i /> EVERYDAY EXAMPLES</span><h2 id="practice-examples-heading">How it can look</h2></div><span>{entry.practiceItems.length} moments to notice</span></div>
          <div className="social-etiquette-example-grid">{entry.practiceItems.map((item, index) => (
            <article key={item.title}><span className="social-example-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><i className="social-example-mark" aria-hidden="true">✳</i></article>
          ))}</div>
        </section>

        <nav className="social-etiquette-next-topics" id="related" aria-label="Explore other social etiquette practices">
          <span className="eyebrow"><i /> MORE SOCIAL PRACTICES</span>
          <div className="social-etiquette-practice-pagination">
            <Link className="social-etiquette-previous-practice" to={`/traditions/${category.id}/${previousEntry.id}`} aria-label={`Previous practice: ${previousEntry.title}`}>
              <img src={previousEntry.photo.src} alt="" loading="lazy" />
              <span><small>← PREVIOUS</small><strong>{previousEntry.title}</strong></span>
            </Link>
            <Link className="social-etiquette-next-practice" to={`/traditions/${category.id}/${nextEntry.id}`} aria-label={`Next practice: ${nextEntry.title}`}>
              <span><small>NEXT →</small><strong>{nextEntry.title}</strong></span>
              <img src={nextEntry.photo.src} alt="" loading="lazy" />
            </Link>
          </div>
        </nav>
      </main>
    );
  }

  return (
    <main id="main-content" className="inner-page">
      <section className="tradition-detail-hero">
        <div>
          <Link className="inline-link" to={`/traditions/${category.id}`}><span aria-hidden="true">←</span> {category.title}</Link>
          <span className="eyebrow tradition-detail-kicker"><i /> TOPIC TEMPLATE · RESEARCH NEEDED</span>
          <h1>{entry.title}</h1>
          <p>This page is a blank template for future research. No cultural information has been added.</p>
          <div className="template-pill"><span /> Template only · No researched content</div>
        </div>
        <div className={`tradition-detail-art ${category.id}`} aria-hidden="true"><span>{category.motif}</span><small>{category.title}</small></div>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">♡</span><p><strong>Complete after research.</strong> Verify information with reliable sources and relevant community members before publishing. Respect permission, attribution, and sharing boundaries.</p><span className="sample-banner-tag">PLACEHOLDERS ONLY</span></section>

      <section className="tradition-story-template tradition-detail-template">
        <div className="tradition-story-heading">
          <div>
            <span className="eyebrow"><i /> CONTENT TEMPLATE</span>
            <h2>{entry.title}</h2>
            <p>Use these sections to organize researched and properly sourced information.</p>
          </div>
        </div>
        <div className="tradition-template-fields">
          {templateSections.map((section, index) => (
            <article className="tradition-template-field" key={section.title}>
              <span className="tradition-field-number">0{index + 1}</span>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <small>Placeholder · Add after research</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
