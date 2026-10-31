import { useEffect, useRef, useState } from 'react';
import sinulogImage from '../../assets/Sinulog-2026.jpg';

const highlights = [
  { label: 'The dance', icon: '💃', title: 'A rhythm that moves like water', body: 'The name Sinulog comes from the Cebuano word sulog, meaning “water current.” Dancers sway in a forward-and-back rhythm that echoes the flow of a river.' },
  { label: 'The devotion', icon: '🕯️', title: 'A celebration of faith', body: 'At the heart of Sinulog is devotion to the Santo Niño, the Child Jesus. Novena prayers and religious processions bring worshippers together throughout the festival.' },
  { label: 'The parade', icon: '🥁', title: 'Cebu comes alive', body: 'Colorful costumes, drumbeats, and community dance groups fill the streets, turning Cebu City into a joyful showcase of local identity and creativity.' },
];

const albumCaptions = [
  'Lumad Basakanon dancers on Mango Avenue. · Juan Carlo de Vela',
  'Kasambagan at Cebu City Sports Center. · Juan Carlo de Vela',
  'Lumad Basakanon street dance. · Juan Carlo de Vela',
  'Tribu Malipayon outside SunStar Cebu. · Logane Echavez',
  'Bacolod MassKara dancers on Mango Avenue. · Juan Carlo de Vela',
  'Kasambagan performs at the Sports Center. · Juan Carlo de Vela',
  'MassKara dancers bring color to Sinulog. · Juan Carlo de Vela',
  'MassKara dancers along Mango Avenue. · Juan Carlo de Vela',
  'MassKara performers in the Sinulog parade. · Juan Carlo de Vela',
];

const additionalAlbumPhotos = Object.entries(
  import.meta.glob('../../assets/sinulog-album/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, src], index) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    const caption = albumCaptions[index] ?? `Sinulog Festival celebration in Cebu (${filename}).`;
    return { src, alt: caption, caption };
  });

const albumPhotos = [
  { src: sinulogImage, alt: 'Sinulog Festival dancers celebrating beneath falling confetti in Cebu', caption: 'Faith, color, and celebration.' },
  ...additionalAlbumPhotos,
];

export default function FestivalsPage() {
  const [active, setActive] = useState(0);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [carouselStep, setCarouselStep] = useState(0);
  const [carouselMax, setCarouselMax] = useState(0);
  const albumWindowRef = useRef(null);
  const carouselDirection = useRef(1);
  const current = highlights[active];
  const currentPhoto = albumPhotos[albumIndex];

  useEffect(() => {
    const measureCarousel = () => {
      const viewport = albumWindowRef.current;
      const firstCard = viewport?.querySelector('.album-card');
      if (!viewport || !firstCard) return;
      const gap = parseFloat(getComputedStyle(viewport.querySelector('.album-track')).columnGap) || 14;
      const step = firstCard.getBoundingClientRect().width + gap;
      const visibleCards = Math.max(1, Math.floor((viewport.clientWidth + gap) / step));
      const max = Math.max(0, albumPhotos.length - visibleCards);
      setCarouselStep(step);
      setCarouselMax(max);
      setCarouselPosition((position) => Math.min(position, max));
    };

    measureCarousel();
    const observer = new ResizeObserver(measureCarousel);
    if (albumWindowRef.current) observer.observe(albumWindowRef.current);
    window.addEventListener('resize', measureCarousel);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureCarousel);
    };
  }, []);

  useEffect(() => {
    if (carouselMax < 1) return undefined;
    const timer = window.setInterval(() => {
      setCarouselPosition((position) => {
        let next = position + carouselDirection.current;
        if (next >= carouselMax) {
          next = carouselMax;
          carouselDirection.current = -1;
        } else if (next <= 0) {
          next = 0;
          carouselDirection.current = 1;
        }
        return next;
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, [carouselMax]);

  const moveCarousel = (direction) => {
    carouselDirection.current = direction;
    setCarouselPosition((position) => Math.min(carouselMax, Math.max(0, position + direction)));
  };

  return (
      <main className="festival-page">
        <section className="festival-hero">
          <div className="container festival-hero-content">
            <span className="hero-tag">CEBU CITY · EVERY JANUARY</span>
            <span className="eyebrow">A festival of faith, rhythm & color</span>
            <h1>Sinulog Festival</h1>
            <p>One beat. One city. A celebration honoring the Santo Niño and the spirit of Cebu.</p>
          </div>
        </section>

        <section className="container festival-content">
          <figure className="sinulog-image-slot">
            <img key={currentPhoto.src} src={currentPhoto.src} alt={currentPhoto.alt} />
            <figcaption className="sinulog-image-caption">
              <span>CEBU CITY · SINULOG FESTIVAL</span>
              <strong>{currentPhoto.caption}</strong>
            </figcaption>
          </figure>
          {albumIndex === 0 && (
            <p className="sinulog-image-source">
              Image source: Piquero, P. (2026, January 9). <a href="https://cebudailynews.inquirer.net/686481/sinulog-2026-officially-opens" target="_blank" rel="noreferrer">“Sinulog 2026 officially opens.”</a> Cebu Daily News.
            </p>
          )}
          <section className="sinulog-album" aria-label="Sinulog photo album">
            <div className="album-heading"><div><span className="eyebrow">Festival album</span><h2>More Sinulog moments</h2></div></div>
            <div className="album-carousel">
              <button className="album-arrow album-arrow-previous" type="button" aria-label="Previous album photos" onClick={() => moveCarousel(-1)} disabled={carouselPosition === 0}>‹</button>
              <div className="album-window" ref={albumWindowRef}>
                <div className="album-track" style={{ transform: `translateX(-${carouselPosition * carouselStep}px)` }}>
                  {albumPhotos.map((photo, index) => (
                    <button className={`album-card${albumIndex === index ? ' selected' : ''}`} type="button" key={photo.src} onClick={() => setAlbumIndex(index)} aria-label={`Show ${photo.alt}`} aria-pressed={albumIndex === index}>
                      <img src={photo.src} alt="" />
                      <span>{photo.caption}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button className="album-arrow album-arrow-next" type="button" aria-label="Next album photos" onClick={() => moveCarousel(1)} disabled={carouselPosition >= carouselMax}>›</button>
            </div>
          </section>
          <p className="album-source">
            Album photo source: SunStar Cebu. (2025, January 19). <a href="https://www.sunstar.com.ph/cebu/in-photos-sinulog-festival-2025-a-vibrant-celebration-of-culture-and-color" target="_blank" rel="noreferrer">“IN PHOTOS: Sinulog Festival 2025, a vibrant celebration of culture and color.”</a> SunStar Publishing Inc.
          </p>
          <div className="festival-intro">
            <div>
              <span className="eyebrow">The story behind the celebration</span>
              <h2>Follow the rhythm of the river.</h2>
              <p>Sinulog is one of the Philippines’ best-known cultural and religious festivals. Held in Cebu City on the third Sunday of January, it honors the Santo Niño. Its signature dance moves forward and back, inspired by the flowing movement of water—and its name comes from <em>sulog</em>, the Cebuano word for current.</p>
            </div>
            <div className="fact-stack" aria-label="Sinulog quick facts">
              <div className="fact"><span className="fact-label">Where</span><strong>Cebu City, Philippines</strong></div>
              <div className="fact"><span className="fact-label">When</span><strong>Third Sunday of January</strong></div>
              <div className="fact"><span className="fact-label">Honors</span><strong>The Santo Niño</strong></div>
              <div className="fact"><span className="fact-label">Say it</span><strong>“Pit Senyor!”</strong></div>
            </div>
          </div>

          <section className="experience" aria-labelledby="experience-title">
            <div className="experience-header">
              <div><span className="eyebrow">Choose a highlight</span><h2 id="experience-title">Feel the festival</h2></div>
              <div className="tabs" role="tablist" aria-label="Sinulog festival highlights">
                {highlights.map((item, index) => <button key={item.label} className="tab" type="button" role="tab" id={`tab-${index}`} aria-selected={active === index} aria-controls="festival-panel" onClick={() => setActive(index)}>{item.label}</button>)}
              </div>
            </div>
            <div className="tab-panel" role="tabpanel" id="festival-panel" aria-labelledby={`tab-${active}`}>
              <span className="tab-icon" aria-hidden="true">{current.icon}</span>
              <div><h3>{current.title}</h3><p>{current.body}</p></div>
            </div>
          </section>

          <aside className="pit-senyor">
            <div><h3>A greeting full of devotion</h3><p>“Pit Senyor!” is a familiar Sinulog cheer—an invocation to the Santo Niño.</p></div>
            <span className="shout" aria-label="Pit Senyor!">Pit Senyor! ✨</span>
          </aside>
          <p className="festival-source">Learn more from the <a href="https://tpb.gov.ph/events/sinulog-festival/" target="_blank" rel="noreferrer">Philippines Tourism Promotions Board</a> and the <a href="https://www.sinulogfoundationinc.com/about-us/" target="_blank" rel="noreferrer">Sinulog Foundation</a>.</p>
        </section>
      </main>
  );
}
