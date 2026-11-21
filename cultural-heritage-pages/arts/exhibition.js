// Photo album enhancement for the Arts topic pages.
const exhibitionViewer = document.querySelector('.exhibit-viewer');
if (exhibitionViewer && typeof exhibitionViewer.showModal === 'function') {
  const triggers = [...document.querySelectorAll('[data-gallery-open]')];
  const photos = triggers.map((trigger) => trigger.querySelector('img'));
  const viewerImage = exhibitionViewer.querySelector('.exhibit-viewer-image');
  const caption = exhibitionViewer.querySelector('[data-gallery-caption]');
  let photoIndex = 0;
  let opener;
  const showPhoto = (index) => {
    photoIndex = (index + photos.length) % photos.length;
    viewerImage.src = photos[photoIndex].src;
    viewerImage.alt = photos[photoIndex].alt;
    caption.textContent = `${photoIndex + 1} of ${photos.length} · ${photos[photoIndex].alt}`;
  };
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      opener = trigger;
      showPhoto(index);
      exhibitionViewer.showModal();
    });
  });
  exhibitionViewer.querySelector('[data-gallery-close]').addEventListener('click', () => exhibitionViewer.close());
  exhibitionViewer.querySelector('[data-gallery-prev]').addEventListener('click', () => showPhoto(photoIndex - 1));
  exhibitionViewer.querySelector('[data-gallery-next]').addEventListener('click', () => showPhoto(photoIndex + 1));
  exhibitionViewer.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  exhibitionViewer.addEventListener('click', (event) => {
    if (event.target !== exhibitionViewer) return;
    const bounds = exhibitionViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) exhibitionViewer.close();
  });
  exhibitionViewer.addEventListener('close', () => opener?.focus());
}

