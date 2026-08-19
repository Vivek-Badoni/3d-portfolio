import { soundFx } from '../utils/audio.js';

export function renderHero(container, data, callbacks = {}) {
  container.innerHTML = `
    <section class="hero-section" id="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="status-pill">
              <span class="pulse-dot"></span>
              <span>${data.personalInfo.status}</span>
            </div>
            
            <h1 class="hero-name">
              Hi, I'm <span class="text-gradient">${data.personalInfo.name}</span>
            </h1>

            <div class="typewriter-container">
              <span id="typewriter-text"></span><span class="cursor-blink">|</span>
            </div>

            <p class="hero-bio">${data.personalInfo.bio}</p>

            <div class="hero-actions">
              <a href="#projects" class="btn btn-primary" id="explore-work-btn">
                <span>Explore Projects</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button class="btn btn-glass" id="open-resume-hero-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>View Resume</span>
              </button>
            </div>

            <div class="stats-grid">
              ${data.stats.map(s => `
                <div class="glass-panel stat-card">
                  <div class="stat-value" style="color: ${s.color};">${s.value}</div>
                  <div class="stat-label">${s.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
          <div><!-- Right side is 3D canvas viewport --></div>
        </div>
      </div>
    </section>
  `;

  // Attach sound effects to buttons
  const buttons = container.querySelectorAll('.btn');
  buttons.forEach(b => {
    b.addEventListener('mouseenter', () => soundFx.playHoverSound());
    b.addEventListener('click', () => soundFx.playClickSound());
  });

  const resumeBtn = container.querySelector('#open-resume-hero-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      if (callbacks.openResume) {
        callbacks.openResume();
      }
    });
  }

  // Initialize Typewriter Effect
  initTypewriter(container.querySelector('#typewriter-text'), data.personalInfo.taglines);
}

function initTypewriter(element, taglines) {
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = taglines[taglineIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}
