const CENTER = 100;

function starPoints(outer, inner) {
  return Array.from({ length: 10 }, (_, index) => {
    const radius = index % 2 ? inner : outer;
    const angle = (index * Math.PI) / 5 - Math.PI / 2;
    return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)];
  });
}

const facets = starPoints(84, 35);
const lampAngles = Array.from({ length: 20 }, (_, index) => (index * Math.PI) / 10);
const bulbs = Array.from({ length: 25 }, (_, index) => [index * 50, 8 + 24 * Math.abs(Math.sin((index * Math.PI) / 4))]);
const wire = `M${bulbs.map(([x, y]) => `${x} ${y}`).join(' L')}`;

export function Parol({ className = '' }) {
  return (
    <svg className={`christmas-parol-shape ${className}`} viewBox="0 0 200 290" aria-hidden="true">
      <circle className="parol-ring" cx={CENTER} cy={CENTER} r="93" />
      {lampAngles.map((angle) => <circle className="parol-lamp" key={angle} cx={CENTER + 93 * Math.cos(angle)} cy={CENTER + 93 * Math.sin(angle)} r="4.5" />)}
      {facets.map(([x, y], index) => {
        const [nextX, nextY] = facets[(index + 1) % facets.length];
        return <polygon className={index % 2 ? 'parol-facet-alt' : 'parol-facet'} key={`${x}-${y}`} points={`${CENTER},${CENTER} ${x},${y} ${nextX},${nextY}`} />;
      })}
      <circle className="parol-heart" cx={CENTER} cy={CENTER} r="15" />
      <path className="parol-tail" d="M50 169 C42 203 62 222 48 262 M150 169 C158 203 138 222 152 262" />
      <path className="parol-fringe" d="M48 262 l-8 20 M48 262 l0 24 M48 262 l8 20 M152 262 l-8 20 M152 262 l0 24 M152 262 l8 20" />
    </svg>
  );
}

export function ChristmasLights() {
  return (
    <svg className="christmas-lights" viewBox="0 0 1200 52" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d={wire} />
      {bulbs.map(([x, y], index) => <circle className={`christmas-bulb bulb-${index % 4}`} key={x} cx={x} cy={y + 7} r="6" />)}
    </svg>
  );
}

export function ParolScene({ tone, caption, figure, image }) {
  return (
    <div className={`superstition-hero-art christmas-hero-art tone-${tone}`} aria-hidden="true">
      {image && <img src={image} alt="" fetchPriority="high" />}
      <span className="christmas-parol christmas-parol-small parol-left tone-green"><Parol /></span>
      <span className="christmas-parol christmas-parol-main"><Parol /></span>
      <span className="christmas-parol christmas-parol-small parol-right tone-red"><Parol /></span>
      <span className="superstition-hero-caption">{caption}</span>
      <span className="superstition-hero-figure">{figure}</span>
    </div>
  );
}
