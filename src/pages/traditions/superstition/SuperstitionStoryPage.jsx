import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import './superstition.css';

function StoryImage({ story, className = '' }) {
  return (
    <div className={`superstition-image-list ${className}`}>
      {story.photos.map((photo) => (
        <figure className="superstition-image" key={photo.src}>
          <a href={photo.source} target="_blank" rel="noreferrer" aria-label={`Open image source for ${story.title}`}>
            <img className={photo.orientation === 'portrait' ? 'is-portrait' : ''} src={photo.src} alt={photo.alt} loading="lazy" />
          </a>
          <figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer">Image source ↗</a></figcaption>
        </figure>
      ))}
    </div>
  );
}

function StoryVideo({ video }) {
  return (
    <section className="superstition-video" aria-label={video.title}>
      <div className="superstition-video-heading">
        <span className="superstition-eyebrow"><i /> WATCH THE STORY</span>
        <a href={video.url} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
      </div>
      <div className="superstition-video-frame">
        <iframe
          src={video.embedUrl}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function OroCount() {
  return (
    <div className="superstition-count" aria-label="Example stair count: oro, plata, mata, oro, plata">
      {['oro', 'plata', 'mata', 'oro', 'plata'].map((word, index) => (
        <div className={`superstition-step step-${word}`} key={`${word}-${index}`}>
          <span>0{index + 1}</span><strong>{word}</strong>
        </div>
      ))}
      <p>Five steps end on <strong>plata</strong>, a fortunate count. A sixth would land on <strong>mata</strong>.</p>
    </div>
  );
}

function SukobPaths() {
  return (
    <div className="superstition-paths" aria-label="Two family timelines that may overlap">
      <div><span>FAMILY LINE A</span><strong>Wedding</strong><i>Same calendar year</i></div>
      <span className="path-cross" aria-hidden="true">×</span>
      <div><span>FAMILY LINE B</span><strong>Wedding or mourning</strong><i>The moment said to overlap</i></div>
    </div>
  );
}

export default function SuperstitionStoryPage({ story }) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main id="main-content" className="superstition-page">
      <div className="superstition-shell">
        <section className="superstition-hero superstition-entry-hero">
          <div className="superstition-hero-copy">
            <Link className="superstition-back" to="/traditions/superstition"><span aria-hidden="true">←</span> All superstitions</Link>
            <span className="superstition-eyebrow"><i /> FOLK BELIEF · THE PHILIPPINES / {story.number}</span>
            <h1>{story.title}<br /><em>{story.subtitle}</em></h1>
            <p>{story.summary}</p>
            <a className="superstition-hero-link" href={`#${story.id}`}>Enter the story <span aria-hidden="true">↓</span></a>
            <div className="superstition-hero-index"><strong>{story.number}</strong><span>one story from the<br />living folklore collection</span></div>
          </div>
          <div className="superstition-hero-art">
            <img src={story.image} alt="" fetchPriority="high" />
            <div className="superstition-hero-shade" />
            <span className="superstition-orbit orbit-outer" /><span className="superstition-orbit orbit-inner" />
            <span className="superstition-hero-mark" aria-hidden="true">✳</span>
            <span className="superstition-hero-caption">BETWEEN HERE<br />AND WHAT FOLLOWS</span>
            <span className="superstition-hero-figure">FIELD NOTE / {story.number}</span>
            <span className="superstition-dust dust-one" /><span className="superstition-dust dust-two" /><span className="superstition-dust dust-three" /><span className="superstition-dust dust-four" />
          </div>
        </section>

        {[story].map((story) => (
          <article className={`superstition-story story-${story.id}`} id={story.id} key={story.id}>
            <header className="superstition-story-head">
              <span className="superstition-story-number">{story.number} <i>—</i> THE BELIEF</span>
              <h2>{story.title}</h2>
              <p>{story.subtitle}</p>
            </header>
            <div className="superstition-story-grid">
              <div className="superstition-story-main">
                <p className="superstition-lead">{story.summary}</p>
                <div className="superstition-facts">
                  {story.facts.map((fact) => (
                    <div className="superstition-fact" key={fact.label}><span>{fact.label}</span><p>{fact.value}</p></div>
                  ))}
                </div>
                <section className="superstition-detail-block">
                  <span className="superstition-eyebrow"><i /> THE PRACTICE</span>
                  <p>{story.ritual}</p>
                </section>
                {story.id === 'sukob' && <SukobPaths />}
                {story.id === 'oro-plata-mata' && <OroCount />}
                <div className="superstition-meaning">
                  <span>THE MEANING</span><p>{story.meaning}</p>
                </div>
                <section className="superstition-detail-block superstition-context">
                  <span className="superstition-eyebrow"><i /> CONTEXT & CARE</span>
                  <p>{story.context}</p>
                </section>
                <div className="superstition-present">
                  <span className="superstition-eyebrow"><i /> WHY IT STILL MATTERS</span>
                  <ul>{story.present.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
              <aside className="superstition-story-aside">
                <StoryVideo video={story.video} />
                <StoryImage story={story} />
                <div className="superstition-quote">
                  <span>✳</span>
                  <p>{story.id === 'pagpag' ? 'A pause between the wake and the threshold of home.' : story.id === 'sukob' ? 'Two family milestones. One year that some would rather keep apart.' : 'A staircase is counted one step at a time; the ending is the omen.'}</p>
                  <small>PAMANA FIELD NOTE / {story.number}</small>
                </div>
                <a className="superstition-source-link" href={story.sources[0].url} target="_blank" rel="noreferrer"><span>START WITH THE SOURCE</span><strong>{story.sources[0].citation}</strong><i aria-hidden="true">↗</i></a>
              </aside>
            </div>
            <footer className="superstition-story-foot"><span>READ THE REFERENCES</span>            <Link to="/references#superstition-sources">Open the source ledger <i aria-hidden="true">↗</i></Link></footer>
          </article>
        ))}

        <section className="superstition-close">
          <span className="superstition-eyebrow"><i /> A NOTE ON BELIEF</span>
          <h2>Listen closely.<br /><em>Leave room for many truths.</em></h2>
          <p>These accounts describe traditions as people share and practice them; they are not proof of supernatural claims. Read the sources, honor differences within communities, and let people speak for their own experience.</p>
          <div className="superstition-story-navigation">
            <Link to="/references#superstition-sources">Explore the references <span aria-hidden="true">↗</span></Link>
            <Link to="/traditions/superstition">Back to all three stories <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
