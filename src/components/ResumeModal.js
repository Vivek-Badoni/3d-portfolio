import { soundFx } from '../utils/audio.js';

export function renderResumeModal(container, data) {
  container.innerHTML = `
    <div class="modal-backdrop" id="resume-modal">
      <div class="glass-panel modal-content resume-modal-content">
        <button class="modal-close-btn" id="close-resume-btn">&times;</button>
        
        <div class="resume-header">
          <div>
            <h2 class="text-gradient" style="font-size: 2rem; margin-bottom: 4px;">${data.personalInfo.name}</h2>
            <div style="font-family: var(--font-code); color: var(--primary-cyan); font-size: 0.95rem;">Full-Stack Web & WebGL Developer</div>
            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">📍 ${data.personalInfo.location} | 📧 ${data.personalInfo.email}</div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 12px;">
            <button class="btn btn-primary" id="print-resume-btn" style="padding: 8px 18px; font-size: 0.85rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        <hr class="terminal-divider" style="margin: 20px 0;">

        <!-- Resume Tabs -->
        <div class="resume-tabs">
          <button class="resume-tab-btn active" data-tab="exp">Work Experience</button>
          <button class="resume-tab-btn" data-tab="edu">Education & Certs</button>
          <button class="resume-tab-btn" data-tab="skills">Core Competencies</button>
        </div>

        <div class="resume-tab-content active" id="tab-exp">
          <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--primary-cyan);">Professional Experience</h3>
          ${data.experience.map(exp => `
            <div class="resume-exp-item" style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
                <h4 style="font-size: 1.1rem;">${exp.role} <span style="color: var(--primary-purple); font-weight: 600;">@ ${exp.company}</span></h4>
                <span style="font-family: var(--font-code); font-size: 0.82rem; color: var(--primary-cyan);">${exp.period}</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-top: 6px;">${exp.description}</p>
            </div>
          `).join('')}
        </div>

        <div class="resume-tab-content" id="tab-edu" style="display: none;">
          <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--primary-cyan);">Education</h3>
          <div class="resume-exp-item" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <h4 style="font-size: 1.1rem;">Bachelor of Computer Applications (BCA)</h4>
              <span style="font-family: var(--font-code); font-size: 0.82rem; color: var(--primary-cyan);">2022 - 2025</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Specialized in Web Engineering, Object-Oriented Programming, and Data Structures.</p>
          </div>

          <h3 style="font-size: 1.2rem; margin-top: 24px; margin-bottom: 16px; color: var(--primary-purple);">Certifications</h3>
          <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.8; padding-left: 20px;">
            <li>Full-Stack Web Development Certification (Laravel & React)</li>
            <li>WebGL Graphics Programming & Three.js Specialization</li>
            <li>Database Architecture & Query Optimization</li>
          </ul>
        </div>

        <div class="resume-tab-content" id="tab-skills" style="display: none;">
          <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--accent-emerald);">Engineering Proficiency</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h5 style="color: var(--primary-cyan); margin-bottom: 10px;">Frontend & 3D</h5>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${data.skills.frontend.map(s => `<span class="tag">${s.name} (${s.level}%)</span>`).join('')}
              </div>
            </div>
            <div>
              <h5 style="color: var(--primary-purple); margin-bottom: 10px;">Backend & DevOps</h5>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${data.skills.backend.map(s => `<span class="tag" style="border-color: rgba(0, 243, 255, 0.3); color: var(--primary-cyan);">${s.name} (${s.level}%)</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  const modal = container.querySelector('#resume-modal');
  const closeBtn = container.querySelector('#close-resume-btn');
  const printBtn = container.querySelector('#print-resume-btn');
  const tabBtns = container.querySelectorAll('.resume-tab-btn');

  function openModal() {
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  closeBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  printBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    window.print();
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      soundFx.playClickSound();
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = `tab-${btn.getAttribute('data-tab')}`;
      container.querySelectorAll('.resume-tab-content').forEach(content => {
        content.style.display = content.id === targetId ? 'block' : 'none';
      });
    });
  });

  return {
    open: openModal,
    close: closeModal
  };
}
