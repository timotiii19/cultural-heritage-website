import { Link, Navigate, useParams } from 'react-router-dom';
import { traditionCategories } from './traditionData';
import { superstitionStories } from './superstition/superstitionData';
import SuperstitionStoryPage from './superstition/SuperstitionStoryPage';

const templateSections = [
  { title: 'Overview', description: 'Add a researched introduction to this topic.' },
  { title: 'Details & context', description: 'Add verified details and context after research.' },
  { title: 'Community perspective', description: 'Add a community-approved perspective with permission.' },
  { title: 'Sources & credits', description: 'List sources, contributors, and image credits.' },
];

export default function TraditionDetailPage() {
  const { categoryId, entryId } = useParams();
  const category = traditionCategories.find((item) => item.id === categoryId);
  const entry = category?.entries.find((item) => item.id === entryId);
  const superstitionStory = categoryId === 'superstition'
    ? superstitionStories.find((story) => story.id === entryId)
    : undefined;

  if (!category || !entry) return <Navigate to="/traditions" replace />;
  if (superstitionStory) return <SuperstitionStoryPage story={superstitionStory} />;

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
