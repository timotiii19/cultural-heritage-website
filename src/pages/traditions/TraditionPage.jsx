import { Link } from 'react-router-dom';

const storyPrompts = [
  { index: '01', title: 'The gathering', prompt: 'What brings people together? When does it happen, and who takes part?', motif: '⌂', tone: 'gathering' },
  { index: '02', title: 'The knowledge', prompt: 'Who taught this practice? What is learned by watching, listening, and joining in?', motif: '❋', tone: 'knowledge' },
  { index: '03', title: 'The next generation', prompt: 'How is the practice changing? What do younger community members want to carry forward?', motif: '↗', tone: 'future' },
];

export default function TraditionsPage() {
  return (
    <main id="main-content" className="inner-page">
      <section className="editorial-hero tradition-hero">
        <div className="editorial-hero-copy">
          <span className="eyebrow"><i /> A COLLECTION TEMPLATE · SAMPLE CONTENT</span>
          <h1>Small rituals.<br /><em>Enduring connections.</em></h1>
          <p>Traditions live in people, relationships, and the ways we gather. Use this framework to listen first, then share what a community wants remembered.</p>
          <div className="template-pill"><span /> No traditions selected yet · Begin with a conversation</div>
        </div>
        <div className="editorial-art tradition-collage" aria-hidden="true">
          <span className="tradition-sun" /><span className="tradition-line line-one" /><span className="tradition-line line-two" /><span className="tradition-house"><i /><i /><i /></span><span className="tradition-leaf leaf-one">❋</span><span className="tradition-leaf leaf-two">✳</span>
          <span className="collage-label">HELD IN<br />GOOD HANDS <i>✳</i></span>
          <span className="collage-index">FIG. 02 — KEEPING IT ALIVE</span>
        </div>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">♡</span><p><strong>Listen before you publish.</strong> Traditions are not props or one-size-fits-all. Ask permission, name your sources, respect private knowledge, and let community members guide what is shared.</p><span className="sample-banner-tag">COMMUNITY FIRST</span></section>

      <section className="sample-collection traditions-collection">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><i /> A GENTLE STORY FRAMEWORK</span><h2>Every tradition has<br /><em>more than one voice.</em></h2></div>
          <p>These are prompts—not examples of real customs. Use them to shape a story with the people who carry it.</p>
        </div>
        <div className="prompt-grid">
          {storyPrompts.map((item) => (
            <article className={`prompt-card ${item.tone}`} key={item.index}>
              <span className="prompt-number">{item.index}</span><span className="prompt-motif" aria-hidden="true">{item.motif}</span>
              <span className="prompt-kicker">STORY PROMPT</span><h3>{item.title}</h3><p>{item.prompt}</p>
              <span className="prompt-footer">A PLACE FOR YOUR COMMUNITY'S VOICE <i>↗</i></span>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-template"><span className="quote-mark">“</span><div><span className="eyebrow"><i /> COMMUNITY VOICE · TEMPLATE</span><blockquote>“Add a short reflection in the speaker’s own words. Keep their meaning intact, and confirm how they want to be identified.”</blockquote><span className="quote-credit">NAME / COMMUNITY · USED WITH PERMISSION</span></div></section>

      <section className="page-end-cta"><div><span className="eyebrow"><i /> KEEP BUILDING</span><h2>Stories connect us.</h2><p>Bring together the art, people, and practices that make a place feel like home.</p></div><Link className="button-primary" to="/festivals">Explore festivals <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}
