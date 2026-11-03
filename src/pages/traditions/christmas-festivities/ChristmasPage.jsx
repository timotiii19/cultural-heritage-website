import { Link } from 'react-router-dom';
import { christmasIntro, christmasStories } from './traditionData';
import '../superstition/superstition.css';
import './christmas.css';

export default function ChristmasPage() {
  return (
    <main id="main-content" className="superstition-page christmas-page">
      <div className="superstition-shell">
        <section className="superstition-hero">
          <div className="superstition-hero-copy">
            <Link className="superstition-back" to="/traditions"><span aria-hidden="true">←</span> All traditions</Link>
            <span className="superstition-eyebrow"><i /> TRADITIONS / CHRISTMAS FESTIVITIES</span>
            <h1>Faith, family,<br /><em>and the table.</em></h1>
            <p>{christmasIntro}</p>
            <a className="superstition-hero-link" href="#christmas-cards">Explore the traditions <span aria-hidden="true">↓</span></a>
            <div className="superstition-hero-index"><strong>03</strong><span>traditions of faith,<br />family & food</span></div>
          </div>
          <div className="superstition-hero-art christmas-hero-art" aria-hidden="true">
            <span className="superstition-orbit orbit-outer" /><span className="superstition-orbit orbit-inner" />
            <span className="superstition-hero-mark">✳</span>
            <span className="superstition-hero-caption">FROM DAWN MASS<br />TO MIDNIGHT TABLE</span>
            <span className="superstition-hero-figure">CHRISTMAS / 01—03</span>
            <span className="superstition-dust dust-one" /><span className="superstition-dust dust-two" /><span className="superstition-dust dust-three" /><span className="superstition-dust dust-four" />
          </div>
        </section>

        <section className="superstition-index superstition-collection" id="christmas-cards" aria-labelledby="christmas-cards-heading">
          <div className="superstition-card-heading">
            <span className="superstition-eyebrow"><i /> THE COLLECTION · 01—03</span>
            <h2 id="christmas-cards-heading">Choose a tradition.<br /><em>Open its story.</em></h2>
            <p>Each page covers its origin, meaning, relevance, and sources.</p>
          </div>
          <div className="superstition-card-grid">
            {christmasStories.map((story) => (
              <Link className="superstition-story-card" key={story.id} to={`/traditions/christmas-festivities/${story.id}`}>
                <span className="superstition-card-image christmas-card-art">
                  <b aria-hidden="true">{story.motif}</b>
                  <span>{story.number} / CHRISTMAS TRADITION</span>
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
          <span className="superstition-eyebrow"><i /> LOOK FURTHER</span>
          <h2>Good stories<br /><em>leave a trail.</em></h2>
          <p>Every tradition here lists the sources behind it in the Pamana reference library.</p>
          <Link to={`/references#christmas-${christmasStories[0].id}`}>Explore the references <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
    </main>
  );
}
