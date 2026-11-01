import { Link, Navigate, useParams } from 'react-router-dom';
import { traditionCategories } from './traditionData';

export default function TraditionCategoryPage() {
  const { categoryId } = useParams();
  const category = traditionCategories.find((item) => item.id === categoryId);

  if (!category) return <Navigate to="/traditions" replace />;

  return (
    <main id="main-content" className="inner-page">
      <section className="tradition-detail-hero">
        <div>
          <Link className="inline-link" to="/traditions"><span aria-hidden="true">←</span> All traditions</Link>
          <span className="eyebrow tradition-detail-kicker"><i /> TRADITION SUBCATEGORY</span>
          <h1>{category.title}</h1>
          <p>Choose a topic to open its content template. The cultural information is intentionally blank until research is completed.</p>
          <div className="template-pill"><span /> Template only · Research needed</div>
        </div>
        <div className={`tradition-detail-art ${category.id}`} aria-hidden="true"><span>{category.motif}</span><small>{category.title}</small></div>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">♡</span><p><strong>Research first.</strong> These topic pages are placeholders only. Add verified information, sources, and community perspectives after research.</p><span className="sample-banner-tag">NO SAMPLE CLAIMS</span></section>

      <section className="tradition-more-stories">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><i /> TOPIC TEMPLATES</span><h2>Choose a topic.<br /><em>Build its story.</em></h2></div>
          <p>Each card opens an individual page with the same blank research template.</p>
        </div>
        <div className="tradition-more-grid">
          {category.entries.map((entry, index) => (
            <Link className="tradition-more-card" key={entry.id} to={`/traditions/${category.id}/${entry.id}`}>
              <span className="tradition-entry-meta">TOPIC / 0{index + 1}</span>
              <strong>{entry.title}</strong>
              <span>Content and sources to be added after research.</span>
              <i aria-hidden="true">Open template ↗</i>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
