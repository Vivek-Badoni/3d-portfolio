import { soundFx } from '../utils/audio.js';

export function renderSkills(container, data) {
  container.innerHTML = `
    <section class="section-padding" id="skills">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <span>Technical Proficiency</span>
          </div>
          <h2 class="section-title">Skills & <span class="text-gradient">Tech Stack</span></h2>
          <p class="section-desc">A detailed breakdown of my engineering skill set, spanning 3D WebGL graphics, full-stack frameworks, and developer tools.</p>
        </div>

        <div class="skills-grid">
          <!-- Frontend & 3D -->
          <div class="glass-panel skills-category">
            <h3 class="category-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <span>3D & Frontend Graphics</span>
            </h3>
            ${data.skills.frontend.map(s => renderSkillItem(s)).join('')}
          </div>

          <!-- Backend & Databases -->
          <div class="glass-panel skills-category">
            <h3 class="category-title" style="color: var(--primary-purple);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              <span>Backend & Architecture</span>
            </h3>
            ${data.skills.backend.map(s => renderSkillItem(s)).join('')}
          </div>

          <!-- Tools & Workflow -->
          <div class="glass-panel skills-category">
            <h3 class="category-title" style="color: var(--accent-emerald);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              <span>Tools & DevOps</span>
            </h3>
            ${data.skills.tools.map(s => renderSkillItem(s)).join('')}
          </div>
        </div>
      </div>
    </section>
  `;

  // Animate skill progress bars when visible
  const skillItems = container.querySelectorAll('.skill-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-progress');
        const level = entry.target.getAttribute('data-level');
        bar.style.width = `${level}%`;
      }
    });
  }, { threshold: 0.2 });

  skillItems.forEach(item => {
    observer.observe(item);
    item.addEventListener('mouseenter', () => soundFx.playHoverSound());
  });
}

function renderSkillItem(skill) {
  return `
    <div class="skill-item" data-level="${skill.level}">
      <div class="skill-info">
        <span style="font-weight: 600;">${skill.name}</span>
        <span style="font-family: var(--font-code); color: var(--primary-cyan);">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress"></div>
      </div>
    </div>
  `;
}
