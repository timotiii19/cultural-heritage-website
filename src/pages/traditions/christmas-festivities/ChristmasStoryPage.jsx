import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import '../superstition/superstition.css';
import './christmas.css';
import { ChristmasLights, Parol, ParolScene } from './ChristmasDecor';

function StoryImages({ story }) {
  return (
    <div className="superstition-image-list">
      {story.photos.map((photo) => (
        <figure className="superstition-image" key={photo.src}>
          <a href={photo.source} target="_blank" rel="noreferrer" aria-label={`Open image source for ${story.title}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </a>
          <figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer">Image source ↗</a></figcaption>
        </figure>
      ))}
    </div>
  );
}

function StorySource({ source }) {
  if (!source.url) return <div className="superstition-source-link"><span>SOURCE</span><strong>{source.citation}</strong></div>;

  return <a className="superstition-source-link" href={source.url} target="_blank" rel="noreferrer"><span>SOURCE</span><strong>{source.citation}</strong><i aria-hidden="true">↗</i></a>;
}

export default function ChristmasStoryPage({ story }) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main id="main-content" className="superstition-page christmas-page">
      <ChristmasLights />
      <div className="superstition-shell">
        <section className="superstition-hero superstition-entry-hero">
          <div className="superstition-hero-copy">
            <Link className="superstition-back" to="/traditions/christmas-festivities"><span aria-hidden="true">←</span> All Christmas traditions</Link>
            <span className="superstition-eyebrow"><i /> CHRISTMAS IN THE PHILIPPINES / {story.number}</span>
            <h1>{story.title}<br /><em>{story.subtitle}</em></h1>
            <p>{story.summary}</p>
            <a className="superstition-hero-link" href={`#${story.id}`}>Enter the story <span aria-hidden="true">↓</span></a>
            <div className="superstition-hero-index"><strong>{story.number}</strong><span>one of three<br />Christmas traditions</span></div>
          </div>
          <ParolScene tone={story.tone} image={story.photos[0]?.src} caption={<>FROM DAWN MASS<br />TO MIDNIGHT TABLE</>} figure={`CHRISTMAS / ${story.number}`} />
        </section>

        <article className="superstition-story" id={story.id}>
          <header className="superstition-story-head">
            <span className="superstition-story-number">{story.number} <i>—</i> THE TRADITION</span>
            <h2>{story.title}</h2>
            <p>{story.subtitle}</p>
          </header>
          <div className="superstition-story-grid">
            <div className="superstition-story-main">
              <p className="superstition-lead">{story.summary}</p>
              <div className="superstition-facts christmas-facts">
                {story.facts.map((fact) => (
                  <div className="superstition-fact" key={fact.label}><span>{fact.label}</span><p>{fact.value}</p></div>
                ))}
              </div>
              <section className="superstition-detail-block">
                <span className="superstition-eyebrow"><i /> HOW IT STARTED</span>
                <p>{story.origin}</p>
              </section>
              <div className="superstition-meaning">
                <span>MEANING / MESSAGE CONVEYED</span><p>{story.meaning}</p>
              </div>
              <section className="superstition-detail-block superstition-context">
                <span className="superstition-eyebrow"><i /> ESSENCE / IMPORTANCE / RELEVANCE</span>
                <p>{story.relevance}</p>
              </section>
              {story.delicacies && (
                <section className="christmas-delicacies" aria-labelledby="featured-delicacies">
                  <span className="superstition-eyebrow" id="featured-delicacies"><i /> FEATURED DELICACIES</span>
                  <div className="christmas-delicacy-list">
                    {story.delicacies.map((dish, index) => (
                      <article className="christmas-delicacy" key={dish.name}>
                        <span>0{index + 1}</span>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <small>Origin: {dish.origin}</small>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <aside className="superstition-story-aside">
              {story.photos.length > 0 && <StoryImages story={story} />}
              {story.sources.map((source) => <StorySource source={source} key={source.citation} />)}
            </aside>
          </div>
          <footer className="superstition-story-foot"><span>READ THE REFERENCES</span><Link to={`/references#christmas-${story.id}`}>Open the source ledger <i aria-hidden="true">↗</i></Link></footer>
        </article>

        <section className="superstition-close">
          <span className="christmas-parol christmas-close-parol tone-gold" aria-hidden="true"><Parol /></span>
          <span className="superstition-eyebrow"><i /> KEEP EXPLORING</span>
          <h2>One season.<br /><em>Three traditions.</em></h2>
          <div className="superstition-story-navigation">
            <Link to={`/references#christmas-${story.id}`}>Explore the references <span aria-hidden="true">↗</span></Link>
            <Link to="/traditions/christmas-festivities">Back to all three stories <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
