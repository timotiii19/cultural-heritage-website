const palettes = {
  green: { name: 'Green', colors: ['#286d55', '#77a989', '#e7bd60', '#f4f5ea', '#173f35'] },
  blue: { name: 'Blue', colors: ['#326b99', '#6fb6c1', '#e9bd64', '#edf5fa', '#1d4565'] },
  red: { name: 'Red', colors: ['#b74646', '#df7968', '#e7bc68', '#fbf0eb', '#71373b'] },
  orange: { name: 'Orange', colors: ['#b75d35', '#e49353', '#f0c967', '#fbf1e5', '#70412f'] },
  yellow: { name: 'Yellow', colors: ['#927629', '#c4a84e', '#e6bf55', '#f8f5e6', '#594c2c'] },
  purple: { name: 'Purple', colors: ['#72599d', '#ad8fc2', '#e5c16b', '#f4eff8', '#49385f'] },
  heritage: { name: 'Heritage', colors: ['#A84624', '#79351F', '#E8DCC9', '#F7F2E8', '#171411'] },
};

const shell = document.querySelector('.site-shell');
const paletteControl = document.querySelector('.palette-control');
const paletteButton = document.querySelector('.customize-button');
const motionKey = 'pamana-motion';
const paletteKey = 'pamana-palette';
const traditionAudioTracks = [
  {
    path: '/cultural-heritage-pages/traditions/christmas-festivities/',
    source: '/assets/audio/Christmas.mp3',
    title: 'Christmas',
  },
  {
    path: '/cultural-heritage-pages/traditions/superstition/',
    source: '/assets/audio/Superstition.mp3',
    title: 'Superstition',
  },
  {
    path: '/cultural-heritage-pages/traditions/social-etiquette/',
    source: '/assets/audio/Social%20Etiquette.mp3',
    title: 'Social Etiquette',
  },
];
const traditionAudio = traditionAudioTracks.find(({ path }) => window.location.pathname.startsWith(path));
const backgroundAudioSource = traditionAudio?.source || shell?.dataset.backgroundAudio;

if (backgroundAudioSource) {
  const title = traditionAudio?.title || shell.dataset.backgroundAudioTitle || 'Page';
  const volumeKey = 'pamana-background-audio-volume-v2';
  const playbackKey = 'pamana-background-audio-enabled';
  const positionKey = `pamana-background-audio-position:${backgroundAudioSource}`;
  const savedVolumeValue = localStorage.getItem(volumeKey);
  const savedVolume = savedVolumeValue === null ? Number.NaN : Number(savedVolumeValue);
  const initialVolume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1
    ? savedVolume
    : 0.25;
  const audio = document.createElement('audio');
  audio.src = backgroundAudioSource;
  audio.loop = true;
  audio.preload = 'metadata';
  audio.volume = initialVolume;
  audio.setAttribute('aria-hidden', 'true');
  audio.tabIndex = -1;

  const restorePosition = () => {
    const savedPosition = Number(sessionStorage.getItem(positionKey));
    if (Number.isFinite(savedPosition) && savedPosition > 0 && savedPosition < audio.duration - 0.5) {
      audio.currentTime = savedPosition;
    }
  };
  const savePosition = () => {
    if (Number.isFinite(audio.currentTime)) {
      sessionStorage.setItem(positionKey, String(audio.currentTime));
    }
  };

  audio.addEventListener('loadedmetadata', restorePosition, { once: true });
  audio.addEventListener('timeupdate', savePosition);
  window.addEventListener('pagehide', savePosition);

  const controls = document.createElement('div');
  controls.className = 'background-audio-controls';
  controls.innerHTML = `
    <button class="background-audio-toggle" type="button" aria-pressed="false" aria-label="Play ${title} background music">
      <span class="background-audio-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/></svg></span>
      <span class="background-audio-status">Play music</span>
    </button>
    <label class="background-audio-volume">
      <span class="visually-hidden">Background music volume</span>
      <input type="range" min="0" max="1" step="0.01" value="${initialVolume}" aria-label="Background music volume">
    </label>`;
  const toggle = controls.querySelector('.background-audio-toggle');
  const status = controls.querySelector('.background-audio-status');
  const volume = controls.querySelector('input[type="range"]');
  document.body.append(audio, controls);

  const setPlaying = (playing) => {
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${title} background music`);
    status.textContent = playing ? 'Pause music' : 'Play music';
  };
  const reportPlaybackError = (error) => {
    if (error.name === 'NotAllowedError') {
      setPlaying(false);
      return;
    }
    console.error(`Unable to play ${title} background music.`, error);
    toggle.disabled = true;
    toggle.setAttribute('aria-label', `${title} background music unavailable`);
    status.textContent = 'Music unavailable';
  };
  const startAudio = () => {
    audio.play()
      .then(() => {
        localStorage.setItem(playbackKey, 'on');
        setPlaying(true);
      })
      .catch(reportPlaybackError);
  };

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      startAudio();
    } else {
      audio.pause();
      localStorage.setItem(playbackKey, 'off');
      setPlaying(false);
    }
  });
  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);
    localStorage.setItem(volumeKey, volume.value);
  });
  audio.addEventListener('error', () => {
    console.error(`Unable to load ${title} background music: ${backgroundAudioSource}`);
    toggle.disabled = true;
    toggle.setAttribute('aria-label', `${title} background music unavailable`);
    status.textContent = 'Music unavailable';
  }, { once: true });

  if (localStorage.getItem(playbackKey) === 'off') {
    setPlaying(false);
  } else {
    startAudio();
  }
}

function swatches(colors) {
  return colors.map((color) => `<i style="background-color:${color}"></i>`).join('');
}

function renderPalettePanel(selected) {
  const options = Object.entries(palettes).map(([id, palette]) => `
    <button class="palette-option${id === selected ? ' selected' : ''}" type="button" data-palette-choice="${id}" aria-pressed="${id === selected}">
      <span class="palette-swatches" aria-hidden="true">${swatches(palette.colors)}</span>
      <span>${palette.name}</span>${id === selected ? '<span class="palette-check" aria-hidden="true">✓</span>' : ''}
    </button>`).join('');

  const panel = document.createElement('div');
  panel.className = 'palette-panel';
  panel.id = 'palette-panel';
  panel.innerHTML = `
    <div class="palette-panel-heading">
      <div><span class="panel-kicker">YOUR CANVAS</span><strong>Choose a palette</strong></div>
      <button class="panel-close" type="button" aria-label="Close palette settings">×</button>
    </div>
    <div class="palette-options" role="group" aria-label="Color palettes">${options}</div>
    <button class="motion-toggle" type="button" aria-pressed="true">
      <span><strong>Motion effects</strong><small>Ambient movement and scroll reveals</small></span>
      <span class="toggle-track enabled" aria-hidden="true"><i></i></span>
    </button>`;
  paletteControl.append(panel);
  return panel;
}

function setMotion(enabled) {
  shell.classList.toggle('motion-off', !enabled);
  localStorage.setItem(motionKey, enabled ? 'on' : 'off');
  const toggle = document.querySelector('.motion-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.querySelector('.toggle-track').classList.toggle('enabled', enabled);
  }
}

function setPalette(id, persist = true) {
  const palette = palettes[id];
  if (!palette || !shell) return;
  shell.dataset.palette = id;
  const themeColor = palette.colors[0];
  shell.style.setProperty('--arts-theme', themeColor);
  // Set directly on target elements — border-left is the clearest visible indicator
  document.querySelectorAll('.arts-details').forEach(el => {
    el.style.borderLeftColor = themeColor;
    el.style.setProperty('--arts-theme', themeColor);
  });
  document.querySelectorAll('.exhibit-story').forEach(el => {
    el.style.setProperty('--arts-theme', themeColor);
  });
  if (persist) localStorage.setItem(paletteKey, id);
  if (paletteButton) {
    paletteButton.querySelector('.palette-button-icon')?.replaceChildren(
      ...palette.colors.map((color) => {
        const swatch = document.createElement('i');
        swatch.style.backgroundColor = color;
        return swatch;
      }),
    );
  }
  const panel = document.querySelector('.palette-panel');
  if (panel && paletteControl) panel.replaceWith(renderPalettePanel(id));
}

// A page may declare its own starting palette (data-default-palette). Any palette other than the
// stored 'green' (the old automatic default) counts as the visitor's own choice and wins.
const savedPalette = localStorage.getItem(paletteKey);
const hasChosenPalette = Object.hasOwn(palettes, savedPalette)
  && (savedPalette !== 'green' || localStorage.getItem(`${paletteKey}-chosen`) === '1');
const startPalette = hasChosenPalette ? savedPalette : (shell?.dataset.defaultPalette || 'heritage');
setPalette(startPalette, hasChosenPalette);
setMotion(localStorage.getItem(motionKey) !== 'off');

paletteButton?.addEventListener('click', () => {
  const panel = document.querySelector('.palette-panel');
  if (panel) {
    panel.remove();
    paletteButton.setAttribute('aria-expanded', 'false');
    paletteButton.classList.remove('is-open');
    return;
  }
  renderPalettePanel(shell.dataset.palette || 'green');
  paletteButton.setAttribute('aria-expanded', 'true');
  paletteButton.classList.add('is-open');
});

paletteControl?.addEventListener('click', (event) => {
  if (event.target.closest('.panel-close')) {
    document.querySelector('.palette-panel')?.remove();
    paletteButton.setAttribute('aria-expanded', 'false');
    paletteButton.classList.remove('is-open');
  }
  const choice = event.target.closest('[data-palette-choice]');
  if (choice) {
    localStorage.setItem(`${paletteKey}-chosen`, '1');
    setPalette(choice.dataset.paletteChoice);
  }
  if (event.target.closest('.motion-toggle')) {
    setMotion(document.querySelector('.motion-toggle').getAttribute('aria-pressed') !== 'true');
  }
});

// Move one fixed glow element with a transform, at most once per frame. Setting a custom
// property on the shell instead forces a style recalc of the whole page on every pointer move.
const pointerGlow = document.createElement('div');
pointerGlow.className = 'pointer-glow';
pointerGlow.setAttribute('aria-hidden', 'true');
shell.append(pointerGlow);
let pointerX = 0;
let pointerY = 0;
let pointerFrame = 0;
shell.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    pointerGlow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    pointerGlow.classList.add('is-active');
  });
});
shell.addEventListener('pointerleave', () => pointerGlow.classList.remove('is-active'));

document.querySelectorAll('.is-loading img').forEach((image) => {
  const markLoaded = () => {
    image.parentElement.classList.remove('is-loading');
    image.parentElement.classList.add('is-loaded');
  };
  image.addEventListener('load', markLoaded, { once: true });
  image.addEventListener('error', markLoaded, { once: true });
  if (image.complete) markLoaded();
});

if ('IntersectionObserver' in window && !shell.classList.contains('motion-off')
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll(
    '.page-transition main > section:not([data-reveal-skip]), .page-transition main > .heritage-marquee, .page-transition .collection-card, .page-transition .sample-card, .page-transition .tradition-category-card, .page-transition .tradition-more-card, .page-transition .beat-card, .page-transition .festival-fact, .page-transition .team-feature-panel, .page-transition .team-directory, .page-transition .arts-collection-card, .page-transition .arts-reference-group, .page-transition [data-reveal]',
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => {
    target.classList.add('scroll-reveal');
    observer.observe(target);
  });
}

const referenceSearch = document.querySelector('.arts-reference-search input');
if (referenceSearch) {
  const filterButtons = [...document.querySelectorAll('.arts-reference-tools .arts-filters button')];
  const groups = [...document.querySelectorAll('.arts-reference-group')];
  const library = document.querySelector('.arts-reference-library');
  const emptyState = document.createElement('div');
  emptyState.className = 'arts-reference-empty';
  emptyState.style.display = 'none';
  emptyState.innerHTML = '<span class="line-star" aria-hidden="true"><svg class="leaf-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 22c-.4-6 .1-12 0-20M12 17c-3.5-.3-5.8-2.5-6.4-6.2 3.8.2 5.9 2.2 6.4 6.2ZM12 12c.5-3.8 2.7-6 6.4-6.4.1 3.9-2 6.1-6.4 6.4ZM12 20c-2.7-.2-4.3-1.9-4.8-4.6 2.8.1 4.5 1.8 4.8 4.6ZM12 8.5C9 8 7.5 6.3 7 3.5c3 .2 4.6 1.8 5 5Z"/></svg></span><h2>No sources found.</h2><p>Try a subject such as “Jeepney,” an author, or a website name.</p><button class="button-primary" type="button">Clear search &amp; filters</button>';
  library.append(emptyState);
  let filter = 'All sources';
  const updateReferences = () => {
    const query = referenceSearch.value.trim().toLocaleLowerCase();
    let total = 0;
    groups.forEach((group) => {
      let groupTotal = 0;
      group.querySelectorAll('.arts-citation-list li').forEach((item) => {
        const visible = filter !== 'Images' && item.textContent.toLocaleLowerCase().includes(query);
        item.style.display = visible ? '' : 'none';
        if (visible) groupTotal += 1;
      });
      group.querySelectorAll('.arts-image-credit-grid > a').forEach((item) => {
        const searchable = `${item.textContent} ${item.querySelector('img')?.alt ?? ''}`.toLocaleLowerCase();
        const visible = filter !== 'Research' && searchable.includes(query);
        item.style.display = visible ? '' : 'none';
        if (visible) groupTotal += 1;
      });
      group.style.display = groupTotal === 0 ? 'none' : '';
      total += groupTotal;
    });
    const status = document.querySelector('.arts-reference-subnav [role="status"]');
    if (status) status.textContent = `${total} SOURCE${total === 1 ? '' : 'S'} ON VIEW`;
    emptyState.style.display = total === 0 ? '' : 'none';
  };
  referenceSearch.addEventListener('input', updateReferences);
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filter = button.textContent.trim();
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    updateReferences();
  }));
  emptyState.querySelector('button').addEventListener('click', () => {
    referenceSearch.value = '';
    filter = 'All sources';
    filterButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.textContent.trim() === filter)));
    updateReferences();
  });
}

const artFilters = document.querySelectorAll('.arts-collection .arts-filters button');
if (artFilters.length) {
  const cards = [...document.querySelectorAll('.arts-collection-card')];
  artFilters.forEach((button) => button.addEventListener('click', () => {
    const category = button.firstChild.textContent.trim();
    artFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach((card) => {
      const cardCategory = card.querySelector('.arts-card-body .arts-micro').textContent.split('/')[0].trim();
      const show = category === 'All forms' || cardCategory === category;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });
    const status = document.querySelector('.arts-filter-row [role="status"]');
    if (status) status.textContent = `${String(visible).padStart(2, '0')} / 05 FORMS ON VIEW`;
  }));
}

const developerPanels = [...document.querySelectorAll('[data-developer-panel]')];
if (developerPanels.length) {
  const cards = [...document.querySelectorAll('.team-picker-card')];
  const activeProfile = () => cards.find((card) => card.getAttribute('aria-pressed') === 'true');
  const selectDeveloper = (id) => {
    developerPanels.forEach((panel) => {
      panel.style.display = panel.dataset.developerPanel === id ? '' : 'none';
    });
    cards.forEach((card) => {
      const cardId = card.dataset.developerId;
      const selected = cardId === id;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
  };
  document.querySelector('.team-picker-grid')?.addEventListener('click', (event) => {
    const card = event.target.closest('.team-picker-card');
    if (card) selectDeveloper(card.dataset.developerId);
  });
  selectDeveloper('intro');
}

const stepButton = document.querySelector('[data-stair-step]');
if (stepButton) {
  const names = ['oro', 'plata', 'mata'];
  const steps = document.querySelector('[data-stair-steps]');
  const verdict = document.querySelector('[data-stair-verdict]');
  const walker = document.querySelector('[data-stair-walker]');
  const action = document.querySelector('[data-stair-action]');
  const progress = document.querySelector('[data-stair-progress]');
  let current = 0;
  const positionWalker = () => {
    if (!walker || !current) return;
    const scene = document.querySelector('[data-stair-scene]');
    const reachedStep = steps?.querySelectorAll('.sp-stair-step')[current - 1];
    if (!scene || !reachedStep) return;
    const sceneRect = scene.getBoundingClientRect();
    const stepRect = reachedStep.getBoundingClientRect();
    walker.style.left = `${stepRect.left - sceneRect.left + (stepRect.width / 2) - (walker.offsetWidth / 2)}px`;
    walker.style.bottom = `${sceneRect.height - (stepRect.top - sceneRect.top)}px`;
  };
  const render = () => {
    if (!steps || !verdict) return;
    steps.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const name = names[index % 3];
      const reached = index < current;
      return `<div class="sp-stair-step sp-stair-${name}${reached ? ' is-reached' : ''}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${name}</strong></div>`;
    }).join('');
    if (walker) {
      if (!current) {
        walker.style.left = '18px';
        walker.style.bottom = '18px';
      }
      positionWalker();
    }
    if (!current) {
      verdict.textContent = 'At the starting step. Step forward to begin the oro, plata, mata count.';
      if (action) action.textContent = 'Step Forward';
      if (progress) progress.textContent = 'At the starting step';
      return;
    }
    const name = names[(current - 1) % 3];
    if (action) action.textContent = current === 7 ? 'Start Again' : 'Step Forward';
    if (progress) progress.textContent = `Step ${current} of 7 · ${name}`;
    verdict.textContent = name === 'oro'
      ? `Step ${current} ends on oro — gold. The tradition associates this ending with good fortune and abundance.`
      : name === 'plata'
        ? `Step ${current} ends on plata — silver. The tradition considers this a fortunate ending.`
        : `Step ${current} ends on mata — death or misfortune. The tradition considers this an unlucky ending.`;
  };
  stepButton.addEventListener('click', () => {
    current = current >= 7 ? 0 : current + 1;
    render();
  });
  window.addEventListener('resize', positionWalker);
  render();
}

const routeButtons = [...document.querySelectorAll('.sp-route-controls [data-route]')];
if (routeButtons.length) {
  const positionRoutePerson = () => {
    const scene = document.querySelector('[data-route-scene]');
    const person = document.querySelector('[data-route-person]');
    if (!scene || !person) return;
    const place = scene.dataset.routeScene === 'wake'
      ? scene.querySelector('.sp-wake i')
      : scene.querySelector(scene.dataset.routeScene === 'direct' ? '.sp-home i' : '.sp-stop i');
    if (!place) return;
    const sceneRect = scene.getBoundingClientRect();
    const placeRect = place.getBoundingClientRect();
    const personRect = person.getBoundingClientRect();
    const atWake = scene.dataset.routeScene === 'wake';
    person.style.left = `${placeRect.left - sceneRect.left + (placeRect.width / 2) - (personRect.width / 2)}px`;
    person.style.top = `${atWake
      ? placeRect.bottom - sceneRect.top + 6
      : placeRect.top - sceneRect.top - personRect.height - 8}px`;
    person.style.bottom = 'auto';
  };
  routeButtons.forEach((button) => button.addEventListener('click', () => {
    routeButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const direct = button.dataset.route === 'direct';
    const scene = document.querySelector('[data-route-scene]');
    if (scene) scene.dataset.routeScene = direct ? 'direct' : 'detour';
    requestAnimationFrame(positionRoutePerson);
    document.querySelector('[data-route-result]').textContent = direct
      ? 'Go Home: The figure returns straight to the household. This skips the brief pause described in pagpag, although families observe it differently.'
      : 'Short Detour: The figure stops before returning home. This pause is traditionally meant to leave the presence of the deceased behind.';
  }));
  window.addEventListener('resize', () => requestAnimationFrame(positionRoutePerson));
  positionRoutePerson();
}

const sukobButtons = [...document.querySelectorAll('.sp-sukob-controls [data-sukob]')];
if (sukobButtons.length) {
  sukobButtons.forEach((button) => button.addEventListener('click', () => {
    sukobButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const mourning = button.dataset.sukob === 'mourning';
    const scene = document.querySelector('[data-sukob-scene]');
    if (scene) scene.dataset.sukobScene = mourning ? 'mourning' : 'siblings';
    const highlight = document.querySelector('[data-sukob-highlight]');
    highlight.classList.toggle('is-good', !mourning);
    highlight.classList.toggle('is-warning', mourning);
    highlight.textContent = mourning
      ? 'SUKOB WARNING — A wedding meets a period of mourning'
      : 'GOOD LUCK — Both sibling weddings share blessings';
    document.querySelector('[data-sukob-result]').textContent = mourning
      ? 'Bad-luck interpretation: the belief warns that overlapping a wedding with mourning may bring misfortune or family conflict. Many families delay or reschedule to honor the meaning.'
      : 'Good-luck interpretation: when both siblings marry in 2026, the celebration of each wedding is highlighted. The belief is meant to show shared blessings—not that every overlapping wedding has the same outcome.';
  }));
}

const storyPanels = [...document.querySelectorAll('[data-art-story]')];
if (storyPanels.length) {
  document.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-art-select]');
    if (!choice) return;
    const id = choice.dataset.artSelect;
    storyPanels.forEach((panel) => {
      const active = panel.dataset.artStory === id;
      panel.style.display = active ? '' : 'none';
      panel.id = active ? 'arts-active-story' : `arts-story-${panel.dataset.artStory}`;
    });
    document.querySelectorAll('.arts-story-directory [data-art-select]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.artSelect === id));
    });
    if (choice.classList.contains('arts-story-link')) {
      document.querySelector('.arts-story-section')?.scrollIntoView({
        behavior: shell.classList.contains('motion-off') ? 'instant' : 'smooth',
        block: 'start',
      });
    }
  });

  let photoDialog;
  let photos = [];
  let photoIndex = 0;
  const showPhoto = () => {
    const image = photoDialog.querySelector('.arts-lightbox-stage img');
    const photo = photos[photoIndex];
    image.src = photo.src;
    image.alt = photo.alt;
    photoDialog.querySelector('.arts-lightbox-caption .arts-micro').textContent = `PHOTO ${String(photoIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    photoDialog.querySelector('.arts-lightbox-caption p').textContent = photo.alt;
  };
  const movePhoto = (step) => {
    photoIndex = (photoIndex + step + photos.length) % photos.length;
    showPhoto();
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.arts-card-image, .arts-story-main-photo, .arts-story-supporting button');
    if (!trigger) return;
    const panel = trigger.closest('.arts-story-panel')
      ?? document.querySelector(`[data-art-story="${trigger.closest('.arts-collection-card')?.className.match(/arts-card-([\w-]+)/)?.[1]}"]`);
    if (!panel) return;
    photos = [...panel.querySelectorAll('.arts-story-main-photo img, .arts-story-supporting img')]
      .map((image) => ({ src: image.src, alt: image.alt }));
    if (!photos.length) return;
    const clickedImage = trigger.querySelector('img');
    photoIndex = Math.max(0, photos.findIndex((photo) => photo.src === clickedImage?.src));
    if (!photoDialog) {
      photoDialog = document.createElement('dialog');
      photoDialog.className = 'arts-lightbox';
      photoDialog.setAttribute('aria-labelledby', 'photo-viewer-title');
      photoDialog.innerHTML = `
        <div class="arts-lightbox-content">
          <div class="arts-lightbox-top"><span id="photo-viewer-title">THE PHOTO ALBUM</span><button type="button" aria-label="Close photo viewer">×</button></div>
          <div class="arts-lightbox-stage"><button class="arts-photo-arrow" type="button" aria-label="Previous photo"><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 12H4m7 7-7-7 7-7"/></svg></button><img alt=""><button class="arts-photo-arrow" type="button" aria-label="Next photo"><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h16m-7-7 7 7-7 7"/></svg></button></div>
          <div class="arts-lightbox-caption" aria-live="polite"><div><span class="arts-micro"></span><p></p></div></div>
          <p class="arts-lightbox-hint">Use ← → to browse · Esc to close</p>
        </div>`;
      document.body.append(photoDialog);
      photoDialog.querySelector('[aria-label="Close photo viewer"]').addEventListener('click', () => photoDialog.close());
      photoDialog.querySelector('[aria-label="Previous photo"]').addEventListener('click', () => movePhoto(-1));
      photoDialog.querySelector('[aria-label="Next photo"]').addEventListener('click', () => movePhoto(1));
      photoDialog.addEventListener('keydown', (keyEvent) => {
        if (keyEvent.key === 'ArrowLeft') movePhoto(-1);
        if (keyEvent.key === 'ArrowRight') movePhoto(1);
      });
      photoDialog.addEventListener('click', (clickEvent) => {
        if (clickEvent.target === photoDialog) photoDialog.close();
      });
    }
    showPhoto();
    photoDialog.showModal();
  });
}

const festivalForm = document.querySelector('.video-url-form');
if (festivalForm) {
  const input = festivalForm.querySelector('input[type="url"]');
  const preview = document.querySelector('.motion-preview');
  const showError = (message) => {
    let error = festivalForm.querySelector('[role="alert"]');
    if (!error) {
      error = document.createElement('span');
      error.className = 'video-url-error';
      error.setAttribute('role', 'alert');
      festivalForm.append(error);
    }
    error.textContent = message;
  };
  input.addEventListener('input', () => festivalForm.querySelector('[role="alert"]')?.remove());
  festivalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value.trim();
    if (!/^https?:\/\//i.test(url)) {
      showError('Enter an http or https link to a direct MP4 or WebM clip.');
      return;
    }
    festivalForm.querySelector('[role="alert"]')?.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'video-player-wrap';
    const video = document.createElement('video');
    video.className = 'festival-video-player';
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    video.setAttribute('aria-label', 'Festival video preview');
    video.addEventListener('error', () => showError('This clip could not be loaded. Check the direct video URL and try again.'));
    const caption = document.createElement('span');
    caption.className = 'video-player-caption';
    caption.textContent = 'VIDEO PREVIEW · ADD CAPTIONS & CREATOR CREDIT BEFORE PUBLISHING';
    wrapper.append(video, caption);
    preview.replaceWith(wrapper);
  });
}

document.querySelector('.preview-play')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const preview = button.closest('.motion-preview');
  const playing = preview.classList.toggle('preview-playing');
  button.classList.toggle('is-playing', playing);
  button.setAttribute('aria-pressed', String(playing));
  button.setAttribute('aria-label', playing ? 'Pause animated preview' : 'Play animated preview');
});
