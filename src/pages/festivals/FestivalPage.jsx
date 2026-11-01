import { useState } from 'react';
import { Link } from 'react-router-dom';
import sinulogImage from '../../assets/Sinulog-2026.jpg';

const storyBeats = [
  { number: '01', title: 'The place', text: 'Name the community, location, and the people who make this gathering what it is.' },
  { number: '02', title: 'The feeling', text: 'Describe the sounds, colors, movement, and moments visitors should notice.' },
  { number: '03', title: 'The meaning', text: 'Share why the celebration matters, in the words of the people who carry it forward.' },
];

const markImageLoaded = (event) => {
  event.currentTarget.parentElement?.classList.remove('is-loading');
  event.currentTarget.parentElement?.classList.add('is-loaded');
};

export default function FestivalsPage() {
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [videoDraft, setVideoDraft] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoError, setVideoError] = useState('');

  const previewVideo = (event) => {
    event.preventDefault();
    const url = videoDraft.trim();
    if (!/^https?:\/\//i.test(url)) {
      setVideoError('Enter an http or https link to a direct MP4 or WebM clip.');
      return;
    }
    setVideoError('');
    setPreviewPlaying(false);
    setVideoUrl(url);
  };

  return (
    <main id="main-content" className="inner-page">
      <section className="festival-template-hero">
        <div className="festival-template-copy"><span className="eyebrow"><i /> A COLLECTION TEMPLATE · SAMPLE CONTENT</span><span className="festival-template-tag">FESTIVAL PROFILE / 01</span><h1>Bring the celebration<br /><em>into the frame.</em></h1><p>A starting point for the gathering you choose to feature. Add local voices, a little atmosphere, and the details that make this celebration belong to its community.</p><div className="template-pill"><span /> No festival selected yet · This profile is a replaceable sample</div></div>
        <figure className="festival-template-photo is-loading"><img src={sinulogImage} alt="Sample festival photograph from a Sinulog celebration in Cebu" onLoad={markImageLoaded} onError={markImageLoaded} /><figcaption><span>PHOTO PLACEHOLDER</span><strong>Swap in a community-approved image, caption, and photographer credit.</strong><small>Sample image: Sinulog celebration · <a href="https://cebudailynews.inquirer.net/686481/sinulog-2026-officially-opens" target="_blank" rel="noreferrer">Cebu Daily News, 2026 ↗</a></small></figcaption><span className="festival-photo-stamp" aria-hidden="true">FESTIVAL<br />STORY <i>✳</i></span></figure>
      </section>

      <section className="sample-banner"><span className="sample-banner-icon">♫</span><p><strong>A celebration is more than a spectacle.</strong> Credit photographers and performers, ask permission before recording, and include the community’s context—not just the crowd’s colors.</p><span className="sample-banner-tag">SAMPLE PROFILE</span></section>

      <section className="festival-details">
        <div className="festival-detail-copy"><span className="eyebrow"><i /> SHAPE YOUR FESTIVAL STORY</span><h2>Start with what<br /><em>makes it meaningful.</em></h2><p>Replace these prompts with confirmed details from organizers and community members. Keep dates, access information, and cultural context current and properly sourced.</p><Link className="inline-link" to="/#team">See the project team <span aria-hidden="true">→</span></Link></div>
        <div className="festival-fact-grid">
          <div className="festival-fact"><span>WHERE</span><strong>Add place / community</strong><small>Confirm the preferred place name</small></div>
          <div className="festival-fact"><span>WHEN</span><strong>Add date / season</strong><small>Check the latest schedule</small></div>
          <div className="festival-fact"><span>WHO</span><strong>Name the organizers</strong><small>Ask how they want to be credited</small></div>
          <div className="festival-fact"><span>WHY IT MATTERS</span><strong>Add a community voice</strong><small>Share meaning with permission</small></div>
        </div>
      </section>

      <section className="festival-beats">
        <div className="section-heading compact-heading"><div><span className="eyebrow"><i /> A STORY, IN THREE BEATS</span><h2>Make room for<br /><em>the full picture.</em></h2></div><p>Use a simple structure to help visitors feel the energy and understand the meaning behind a gathering.</p></div>
        <div className="beats-grid">{storyBeats.map((beat) => <article className="beat-card" key={beat.number}><span>{beat.number}</span><h3>{beat.title}</h3><p>{beat.text}</p><i aria-hidden="true">✳</i></article>)}</div>
      </section>

      <section className="festival-media">
        <div className="media-template-copy"><span className="eyebrow"><i /> VIDEO / CLIP SLOT</span><h2>A moment can<br /><em>say it all.</em></h2><p>Preview a direct MP4 or WebM clip, or use the animated sample until your community-approved video is ready. Add captions, a transcript, and creator credit before publishing.</p><span className="media-source-label">ADD VIDEO URL · CAPTIONS · CREATOR CREDIT</span>
          <form className="video-url-form" onSubmit={previewVideo}>
            <label htmlFor="festival-video-url">Direct video URL</label>
            <div className="video-url-row"><input id="festival-video-url" type="url" inputMode="url" value={videoDraft} onChange={(event) => { setVideoDraft(event.target.value); setVideoError(''); }} placeholder="https://example.com/clip.mp4" /><button type="submit">Preview <span aria-hidden="true">→</span></button></div>
            <small>Use a direct .mp4 or .webm link—not a video page.</small>
            {videoError && <span className="video-url-error" role="alert">{videoError}</span>}
          </form>
        </div>
        {videoUrl ? (
          <div className="video-player-wrap">
            <video className="festival-video-player" src={videoUrl} controls playsInline onError={() => setVideoError('This clip could not be loaded. Check the direct video URL and try again.')} aria-label="Festival video preview">Your browser does not support video playback.</video>
            <span className="video-player-caption">VIDEO PREVIEW · ADD CAPTIONS & CREATOR CREDIT BEFORE PUBLISHING</span>
          </div>
        ) : (
          <div className={`motion-preview festival-motion${previewPlaying ? ' preview-playing' : ''}`}>
            <span className="motion-preview-orbit" /><span className="preview-sun" /><span className="preview-dancer dancer-one">✦</span><span className="preview-dancer dancer-two">✦</span><span className="preview-dancer dancer-three">✦</span><span className="motion-caption">SAMPLE MOTION PREVIEW · NOT A VIDEO</span>
            <button type="button" className="preview-play" aria-label={previewPlaying ? 'Pause animated preview' : 'Play animated preview'} aria-pressed={previewPlaying} onClick={() => setPreviewPlaying((playing) => !playing)}>{previewPlaying ? 'Ⅱ' : '▶'}</button>
          </div>
        )}
      </section>

      <section className="page-end-cta"><div><span className="eyebrow"><i /> MAKE IT YOURS</span><h2>Your story starts with a place.</h2><p>Choose the art, traditions, and festivals you want to bring forward.</p></div><Link className="button-primary" to="/arts">Back to the collection <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}
