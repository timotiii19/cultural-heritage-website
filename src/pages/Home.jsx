import { Link } from 'react-router-dom';

const collections = [
  { number: '01', title: 'Arts', text: 'Discover the colors, materials, and makers shaping Filipino creativity.', icon: '🎨', color: '#f8e6d9', to: '/arts', prompt: 'See the artistry' },
  { number: '02', title: 'Traditions', text: 'Explore the customs and everyday practices carried across generations.', icon: '🌿', color: '#e4eddf', to: '/traditions', prompt: 'Explore traditions' },
  { number: '03', title: 'Festivals', text: 'Feel the rhythm of community in the Philippines’ vibrant celebrations.', icon: '🥁', color: '#f5e9cf', to: '/festivals', prompt: 'Celebrate with us' },
];

export default function Home() {
  return (
      <main>
        <section className="container welcome-section" id="explore">
          <div className="welcome-heading">
            <span className="eyebrow">Welcome to Pamana</span>
            <h1>What would you like<br className="desktop-break" /> to explore?</h1>
            <p>Choose a part of Filipino culture and start discovering.</p>
          </div>
          <div className="feature-grid">
            {collections.map((item) => (
              <Link className="feature-card" to={item.to} key={item.title}>
                <div className="category-card-top"><span className="category-number">{item.number} / EXPLORE</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                {item.title === 'Festivals' ? (
                  <span className="festival-card-art" aria-hidden="true">
                    <span className="festival-card-sun" />
                    <span className="festival-card-spark spark-a">✦</span>
                    <span className="festival-card-spark spark-b">✧</span>
                    <span className="festival-card-dancer"><span className="festival-card-head" /><span className="festival-card-arm arm-a" /><span className="festival-card-arm arm-b" /><span className="festival-card-dress" /></span>
                  </span>
                ) : item.title === 'Arts' ? (
                  <span className="arts-card-art" aria-hidden="true"><span className="arts-card-canvas"><span className="arts-card-sun" /><span className="arts-card-hill hill-a" /><span className="arts-card-hill hill-b" /></span><span className="arts-card-brush" /></span>
                ) : (
                  <span className="traditions-card-art" aria-hidden="true"><span className="traditions-card-sun" /><span className="traditions-card-hut"><span className="hut-roof" /><span className="hut-body"><span className="hut-window" /><span className="hut-door" /></span><span className="hut-pole pole-a" /><span className="hut-pole pole-b" /></span><span className="traditions-card-leaf leaf-a" /><span className="traditions-card-leaf leaf-b" /></span>
                )}
                <div className="category-card-copy"><h2>{item.title}</h2><p>{item.text}</p><span className="category-prompt">{item.prompt} <span aria-hidden="true">→</span></span></div>
              </Link>
            ))}
          </div>
        </section>
        <section className="container home-note"><div><strong>Start with a celebration.</strong><br /><span>Meet Sinulog, Cebu’s festival of faith, rhythm, and color.</span></div><Link to="/festivals" className="button-secondary">Discover Sinulog <span aria-hidden="true">→</span></Link></section>
      </main>
  );
}
