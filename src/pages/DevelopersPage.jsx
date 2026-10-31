import juanMiguelPhoto from '../assets/juan-miguel.jpg';
import arabellaPhoto from '../assets/arabella.jpg';

const developers = [
  { name: 'Arabella Valerio', photo: arabellaPhoto },
  { name: 'JC Roeven Peji' },
  { name: 'Timothy Talagtag' },
  { name: 'Juan Miguel Campomanes', photo: juanMiguelPhoto },
];

export default function DevelopersPage() {
  return (
      <main className="container developers-page">
        <section className="page-intro">
          <span className="eyebrow">The people behind Pamana</span>
          <h1>Meet the developers</h1>
          <p>Four classmates brought this Filipino cultural heritage project to life, sharing stories through arts, traditions, and festivals.</p>
        </section>
        <section className="developers-grid" aria-label="Pamana developers">
          {developers.map((developer, index) => (
            <article className="developer-card" key={developer.name}>
              {developer.photo ? (
                <img className={`developer-photo-slot developer-photo-${index + 1}`} src={developer.photo} alt={`Portrait of ${developer.name}`} />
              ) : (
                <div className={`developer-photo-slot developer-photo-${index + 1}`} aria-label={`Photo space for ${developer.name}`}>
                  <span className="developer-photo-icon" aria-hidden="true">▧</span>
                  <span>Add photo</span>
                </div>
              )}
              <div className="developer-profile-copy">
                <strong>{developer.name}</strong>
                <span className="developer-role">Project developer</span>
                <p>Add a short description of {developer.name}’s work on the project.</p>
              </div>
            </article>
          ))}
        </section>
      </main>
  );
}
