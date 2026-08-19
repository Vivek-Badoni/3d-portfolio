import { soundFx } from '../utils/audio.js';

export function renderResumeModal(container, data) {
  container.innerHTML = `
    <div class="modal-backdrop" id="resume-modal">
      <div class="glass-panel modal-content resume-modal-content">
        <button class="modal-close-btn" id="close-resume-btn">&times;</button>
        
        <!-- Resume Header -->
        <div class="resume-header">
          <div>
            <h2 class="text-gradient" style="font-size: 2.2rem; margin-bottom: 4px;">${data.personalInfo.name}</h2>
            <div style="font-family: var(--font-code); color: var(--primary-cyan); font-size: 1.05rem; font-weight: 600;">${data.personalInfo.role}</div>
            <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 8px; display: flex; gap: 16px; flex-wrap: wrap;">
              <span>📍 ${data.personalInfo.location}</span>
              <span>📧 <a href="mailto:${data.personalInfo.email}" style="color: var(--primary-cyan);">${data.personalInfo.email}</a></span>
              <span>📞 ${data.personalInfo.phone}</span>
            </div>
            <div style="margin-top: 8px; display: flex; gap: 12px;">
              <a href="${data.personalInfo.socials[0].url}" target="_blank" class="link-btn" style="font-size: 0.85rem;">GitHub</a>
              <a href="${data.personalInfo.socials[1].url}" target="_blank" class="link-btn" style="font-size: 0.85rem;">LinkedIn</a>
            </div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 12px;">
            <button class="btn btn-primary" id="print-resume-btn" style="padding: 10px 22px; font-size: 0.88rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        <hr class="terminal-divider" style="margin: 20px 0;">

        <!-- Career Summary -->
        <div style="background: rgba(0, 243, 255, 0.04); border-left: 3px solid var(--primary-cyan); padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
          <h4 style="font-size: 0.9rem; font-family: var(--font-code); color: var(--primary-cyan); text-transform: uppercase; margin-bottom: 6px;">Career Summary</h4>
          <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6;">${data.personalInfo.bio}</p>
        </div>

        <!-- Resume Tabs -->
        <div class="resume-tabs">
          <button class="resume-tab-btn active" data-tab="exp">Experience (${data.experience.length})</button>
          <button class="resume-tab-btn" data-tab="projects">Projects (${data.projects.length})</button>
          <button class="resume-tab-btn" data-tab="edu">Education & Certs</button>
          <button class="resume-tab-btn" data-tab="skills">Technical Skills</button>
        </div>

        <!-- Tab 1: Experience -->
        <div class="resume-tab-content active" id="tab-exp">
          <h3 style="font-size: 1.25rem; margin-bottom: 18px; color: var(--primary-cyan);">Professional Experience</h3>
          ${data.experience.map(exp => `
            <div class="resume-exp-item" style="margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px dashed rgba(255,255,255,0.08);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; margin-bottom: 6px;">
                <h4 style="font-size: 1.15rem;">${exp.role} <span style="color: var(--primary-purple); font-weight: 600;">@ ${exp.company}</span></h4>
                <span style="font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-emerald); padding: 2px 10px; background: rgba(0,255,157,0.1); border-radius: 12px;">${exp.period}</span>
              </div>
              <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px; margin-top: 8px;">
                ${exp.bullets ? exp.bullets.map(b => `<li style="margin-bottom: 4px;">${b}</li>`).join('') : `<li>${exp.description}</li>`}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Tab 2: Projects -->
        <div class="resume-tab-content" id="tab-projects" style="display: none;">
          <h3 style="font-size: 1.25rem; margin-bottom: 18px; color: var(--primary-cyan);">Featured Software Projects</h3>
          ${data.projects.map(p => `
            <div class="resume-exp-item" style="margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px dashed rgba(255,255,255,0.08);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
                <h4 style="font-size: 1.1rem; color: #fff;">${p.title}</h4>
                <span style="font-family: var(--font-code); font-size: 0.78rem; color: var(--primary-purple);">${p.category}</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-top: 6px;">${p.description}</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                ${p.tags.map(t => `<span class="tag" style="font-size: 0.72rem; padding: 2px 10px;">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Tab 3: Education & Certifications -->
        <div class="resume-tab-content" id="tab-edu" style="display: none;">
          <h3 style="font-size: 1.25rem; margin-bottom: 16px; color: var(--primary-cyan);">Education</h3>
          ${data.education.map(edu => `
            <div style="margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 1.05rem;">${edu.degree}</h4>
                <span style="font-family: var(--font-code); font-size: 0.82rem; color: var(--primary-cyan);">${edu.period}</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 2px;">${edu.institution}</p>
            </div>
          `).join('')}

          <h3 style="font-size: 1.25rem; margin-top: 28px; margin-bottom: 16px; color: var(--primary-purple);">Certifications</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
            ${data.certifications.map(cert => `
              <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-sm);">
                <div style="font-weight: 600; font-size: 0.92rem; color: #fff;">📜 ${cert.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-code); margin-top: 4px;">${cert.issuer}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 4: Skills Matrix -->
        <div class="resume-tab-content" id="tab-skills" style="display: none;">
          <h3 style="font-size: 1.25rem; margin-bottom: 18px; color: var(--accent-emerald);">Technical Skills & Tools</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h5 style="color: var(--primary-cyan); font-family: var(--font-code); margin-bottom: 10px;">Frontend & Languages</h5>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${data.skills.frontend.map(s => `<span class="tag">${s.name}</span>`).join('')}
              </div>
            </div>
            <div>
              <h5 style="color: var(--primary-purple); font-family: var(--font-code); margin-bottom: 10px;">Backend & Databases</h5>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${data.skills.backend.map(s => `<span class="tag" style="border-color: rgba(157,78,221,0.3); color: var(--primary-purple);">${s.name}</span>`).join('')}
                ${data.skills.databases.map(s => `<span class="tag" style="border-color: rgba(0,255,157,0.3); color: var(--accent-emerald);">${s.name}</span>`).join('')}
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
