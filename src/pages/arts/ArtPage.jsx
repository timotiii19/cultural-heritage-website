import { Link } from 'react-router-dom';

const artForms = [
  { index: '01', title: 'A form to be named', kind: 'ART FORM / REGION', description: 'Introduce a selected artwork, craft, or creative practice. Add the name used by its makers and the place it comes from.', style: 'weaving', motif: '〰' },
  { index: '02', title: 'Meet the maker', kind: 'ARTIST / COMMUNITY', description: 'Share who makes this work, how they learned, and what they would like others to understand about it.', style: 'maker', motif: '✳' },
  { index: '03', title: 'Materials & meaning', kind: 'PROCESS / SYMBOLISM', description: 'Describe the materials, techniques, and meanings in the words of the artists and community members themselves.', style: 'materials', motif: '◉' },
];

export default function ArtsPage() {
  return (
    <main id="main-content" className="inner-page">
      <section className="editorial-hero art-hero">
        <div className="editorial-hero-copy">
          <span className="eyebrow"><i /> A COLLECTION TEMPLATE · SAMPLE CONTENT</span>
          <h1>Made by hand.<br /><em>Made to be remembered.</em></h1>
          <p>Give Filipino visual arts a thoughtful place to live. This starter gallery is intentionally open—make it yours with selected works, community voices, and carefully credited images.</p>
          <div className="template-pill"><span /> No art forms selected yet · Replace each sample with your own</div>
          <a className="button-primary art-hero-cta" href="#collection">Explore the collection <span aria-hidden="true">↘</span></a>
        </div>
        <div className="editorial-art art-collage" aria-hidden="true">
          <span className="collage-sun" /><span className="collage-shape shape-one" /><span className="collage-shape shape-two" /><span className="collage-shape shape-three" /><span className="collage-thread" />
          <span className="collage-label">MADE OF<br />MANY STORIES <i>✳</i></span>
          <span className="collage-index">FIG. 01 — THE MAKING</span>
        </div>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">✳</span><p><strong>Starter content, not cultural claims.</strong> Names, descriptions, and image spaces are placeholders. Add verified details and source credits for the specific communities and creators you feature.</p><span className="sample-banner-tag">EDIT ME</span></section>

      <section className="sample-collection" id="collection">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><i /> THE GALLERY FRAMEWORK</span><h2>Start with a detail.<br /><em>Then tell its story.</em></h2></div>
          <p>Each tile suggests a content type. Replace it with an artwork, a process, or a maker’s own perspective.</p>
        </div>
        <div className="sample-grid">
          {artForms.map((item) => (
            <article className={`sample-card ${item.style}`} key={item.index}>
              <div className="sample-artwork" aria-hidden="true"><span>{item.motif}</span><i /><i /><i /></div>
              <div className="sample-card-copy"><div className="sample-card-meta"><span>{item.kind}</span><span>{item.index}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="replace-label">SAMPLE ENTRY · ADD YOUR SOURCE</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="media-template">
        <div className="media-template-copy"><span className="eyebrow"><i /> BRING THE PROCESS TO LIFE</span><h2>Let the making<br /><em>be seen.</em></h2><p>Short clips can show movement, technique, and texture in ways a still image cannot. Add a community-approved video, creator credit, captions, and a transcript.</p><span className="media-source-label">VIDEO SLOT · ADD A CLIP URL & CREDIT</span></div>
        <div className="motion-preview art-motion" aria-label="Animated sample visual placeholder for an art process"><span className="motion-preview-orbit" /><span className="motion-preview-center">✳</span><span className="motion-caption">YOUR PROCESS, IN MOTION</span><span className="motion-dots">● ● ●</span></div>
      </section>

      <section className="page-end-cta"><div><span className="eyebrow"><i /> KEEP BUILDING</span><h2>Culture lives in the details.</h2><p>Make space for the practices that mean something to you.</p></div><Link className="button-primary" to="/traditions">Explore traditions <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}
