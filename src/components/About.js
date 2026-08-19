import { soundFx } from '../utils/audio.js';

export function renderAbout(container, data) {
  container.innerHTML = `
    <section class="section-padding" id="about">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Background & Journey</span>
          </div>
          <h2 class="section-title">About <span class="text-gradient">My Experience</span></h2>
          <p class="section-desc">Building digital web applications that combine modern full-stack development, clean UI aesthetics, and scalable backend architecture.</p>
        </div>

        <div class="about-grid">
          <div class="glass-panel philosophy-card">
            <h3 style="font-size: 1.5rem; margin-bottom: 16px;" class="text-gradient">Engineering Philosophy</h3>
            <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 24px;">
              I believe web applications should be visually engaging, responsive, and robust. By combining PHP/Laravel backend architecture with modern frontend JavaScript, MySQL databases, and clean UI design, I create software solutions that solve real-world problems.
            </p>
            <div class="philosophy-badges">
              <div class="badge-item cyan">
                ⚡ High-FPS WebGL Rendering
              </div>
              <div class="badge-item purple">
                🛡️ Clean Code & Architecture
              </div>
              <div class="badge-item emerald">
                🎨 Cyber Glassmorphism UI
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Career Timeline</h3>
            ${data.experience.map(exp => `
              <div class="glass-panel experience-card" style="padding: 24px; position: relative;">
                <div style="font-family: var(--font-code); font-size: 0.85rem; color: var(--primary-cyan); margin-bottom: 6px;">${exp.period}</div>
                <h4 style="font-size: 1.2rem; margin-bottom: 4px;">${exp.role}</h4>
                <div style="color: var(--primary-purple); font-size: 0.95rem; margin-bottom: 12px; font-weight: 600;">@ ${exp.company}</div>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;

  const expCards = container.querySelectorAll('.experience-card');
  expCards.forEach(c => {
    c.addEventListener('mouseenter', () => soundFx.playHoverSound());
  });
}
