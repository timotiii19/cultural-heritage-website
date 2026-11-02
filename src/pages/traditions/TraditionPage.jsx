import { Link } from 'react-router-dom';
import { traditionCategories } from './traditionData';

export default function TraditionsPage() {
  return (
    <main id="main-content" className="inner-page">
      <section className="editorial-hero tradition-hero">
        <div className="editorial-hero-copy">
          <span className="eyebrow"><i /> FILIPINO TRADITIONS · STORIES & PRACTICES</span>
          <h1>Small rituals.<br /><em>Enduring connections.</em></h1>
          <p>Explore traditions through the people who carry them. Superstition opens a researched story collection; other subcategories are being prepared.</p>
          <div className="template-pill"><span /> Three subcategories · One researched collection</div>
          <a className="button-primary tradition-hero-cta" href="#collection">Explore tradition stories <span aria-hidden="true">↘</span></a>
        </div>
        <div className="editorial-art tradition-collage" aria-hidden="true">
          <span className="tradition-sun" /><span className="tradition-line line-one" /><span className="tradition-line line-two" /><span className="tradition-house"><i /><i /><i /></span><span className="tradition-leaf leaf-one">❋</span><span className="tradition-leaf leaf-two">✳</span>
          <span className="collage-label">HELD IN<br />GOOD HANDS <i>✳</i></span>
          <span className="collage-index">FIG. 02 — KEEPING IT ALIVE</span>
        </div>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">♡</span><p><strong>Listen before you publish.</strong> Traditions are not props or one-size-fits-all. Ask permission, name your sources, respect private knowledge, and let community members guide what is shared.</p><span className="sample-banner-tag">COMMUNITY FIRST</span></section>

      <section className="sample-collection traditions-collection" id="collection">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><i /> THREE WAYS INTO A STORY</span><h2>Choose a subcategory.<br /><em>Open its story page.</em></h2></div>
          <p>Open a dedicated collection: Superstition shares researched stories, while other categories are ready for community-led research.</p>
        </div>
        <div className="tradition-category-grid">
          {traditionCategories.map((category, index) => {
            return (
              <Link
                className={`tradition-category-card ${category.id}`}
                key={category.id}
                to={`/traditions/${category.id}`}
              >
                <span className="tradition-category-number">0{index + 1} / TRADITION</span>
                <span className="tradition-category-motif" aria-hidden="true">{category.motif}</span>
                <h3>{category.title}</h3>
                <p>{category.id === 'superstition' ? 'Explore three Filipino folk beliefs through their rituals, meanings, family stories, and source notes.' : 'Three topic cards with a blank content template. Research and add information before publishing.'}</p>
                <span className="tradition-category-feature">TOPICS <strong>{category.id === 'superstition' ? '3 researched stories' : '3 topic templates'}</strong></span>
                <span className="tradition-category-action">{category.id === 'superstition' ? 'Explore the stories' : 'Open subcategory'} <i aria-hidden="true">↗</i></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="page-end-cta"><div><span className="eyebrow"><i /> KEEP BUILDING</span><h2>Stories connect us.</h2><p>Bring together the art, people, and practices that make a place feel like home.</p></div><Link className="button-primary" to="/festivals">Explore festivals <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}
