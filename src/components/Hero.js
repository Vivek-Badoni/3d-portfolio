import { soundFx } from '../utils/audio.js';

export function renderHero(container, data) {
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
              <a href="#lab" class="btn btn-glass" id="open-lab-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                <span>Launch 3D Lab</span>
              </a>
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
