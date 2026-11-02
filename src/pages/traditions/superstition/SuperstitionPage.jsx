import { Link } from 'react-router-dom';
import { superstitionStories } from './superstitionData';
import './superstition.css';

export default function SuperstitionPage() {
  return (
    <main id="main-content" className="superstition-page">
      <div className="superstition-shell">
        <section className="superstition-hero">
          <div className="superstition-hero-copy">
            <Link className="superstition-back" to="/traditions"><span aria-hidden="true">←</span> All traditions</Link>
            <span className="superstition-eyebrow"><i /> TRADITIONS / SUPERSTITION</span>
            <h1>Beliefs that<br /><em>linger in the dark.</em></h1>
            <p>Three Filipino folk beliefs, each with a story of its own. Choose a card to explore its ritual, family memories, meaning, and sources.</p>
            <a className="superstition-hero-link" href="#belief-cards">Explore the beliefs <span aria-hidden="true">↓</span></a>
            <div className="superstition-hero-index"><strong>03</strong><span>stories held between<br />memory, family & fate</span></div>
          </div>
          <div className="superstition-hero-art">
            <img src={superstitionStories[0].image} alt="" fetchPriority="high" />
            <div className="superstition-hero-shade" />
            <span className="superstition-orbit orbit-outer" /><span className="superstition-orbit orbit-inner" />
            <span className="superstition-hero-mark" aria-hidden="true">✳</span>
            <span className="superstition-hero-caption">BETWEEN HERE<br />AND WHAT FOLLOWS</span>
            <span className="superstition-hero-figure">FIELD NOTES / 01—03</span>
            <span className="superstition-dust dust-one" /><span className="superstition-dust dust-two" /><span className="superstition-dust dust-three" /><span className="superstition-dust dust-four" />
          </div>
        </section>

        <section className="superstition-index superstition-collection" id="belief-cards" aria-labelledby="belief-cards-heading">
          <div className="superstition-card-heading">
            <span className="superstition-eyebrow"><i /> THE COLLECTION · 01—03</span>
            <h2 id="belief-cards-heading">Choose a belief.<br /><em>Open its story.</em></h2>
            <p>Every story is a doorway; take them one at a time.</p>
          </div>
          <div className="superstition-card-grid">
            {superstitionStories.map((story) => (
              <Link className="superstition-story-card" key={story.id} to={`/traditions/superstition/${story.id}`}>
                <span className="superstition-card-image">
                  <img src={story.image} alt={story.imageAlt} loading="lazy" />
                  <span>{story.number} / FOLK BELIEF</span>
                  <i aria-hidden="true">↗</i>
                </span>
                <span className="superstition-card-copy">
                  <strong>{story.title}</strong>
                  <span>{story.subtitle}</span>
                  <i>Open story <b aria-hidden="true">→</b></i>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="superstition-close">
          <span className="superstition-eyebrow"><i /> A NOTE ON BELIEF</span>
          <h2>Listen closely.<br /><em>Leave room for many truths.</em></h2>
          <p>These accounts describe traditions as people share and practice them; they are not proof of supernatural claims. Read the sources, honor differences within communities, and let people speak for their own experience.</p>
          <Link to="/references#superstition-sources">Explore the references <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
    </main>
  );
}
