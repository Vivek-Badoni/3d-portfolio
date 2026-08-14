import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio.js';

export function renderContact(container, data) {
  container.innerHTML = `
    <section class="section-padding" id="contact">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>Get In Touch</span>
          </div>
          <h2 class="section-title">Let's Build Something <span class="text-gradient">Extraordinary</span></h2>
          <p class="section-desc">Have an upcoming project, freelance inquiry, or full-time position? Send me a message and let's start a conversation.</p>
        </div>

        <div class="contact-grid">
          <!-- Info Card -->
          <div class="glass-panel contact-info-card">
            <div>
              <h3 style="font-size: 1.6rem; margin-bottom: 16px;" class="text-gradient">Contact Information</h3>
              <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 32px;">
                I'm always open to discussing new web apps, 3D graphics projects, creative design collaborations, or engineering consulting.
              </p>

              <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div class="icon-btn" style="color: var(--primary-cyan);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div style="font-size: 0.8rem; color: var(--text-dim);">DIRECT EMAIL</div>
                    <div style="font-family: var(--font-code); color: #fff; font-size: 0.95rem;">${data.personalInfo.email}</div>
                  </div>
                  <button class="icon-btn" id="copy-email-btn" title="Copy Email" style="width: 32px; height: 32px; margin-left: auto;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                </div>

                <div style="display: flex; align-items: center; gap: 16px;">
                  <div class="icon-btn" style="color: var(--primary-purple);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <div style="font-size: 0.8rem; color: var(--text-dim);">LOCATION</div>
                    <div style="color: #fff; font-size: 0.95rem;">${data.personalInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 12px; font-family: var(--font-code);">CONNECT ON SOCIALS</div>
              <div style="display: flex; gap: 12px;">
                ${data.personalInfo.socials.map(s => `
                  <a href="${s.url}" target="_blank" class="icon-btn" title="${s.name}">
                    <span style="font-size: 0.85rem; font-family: var(--font-code); font-weight: 700;">${s.name.substring(0, 2)}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="glass-panel contact-form-card">
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label" for="contact-name">YOUR NAME *</label>
                <input type="text" id="contact-name" class="form-input" placeholder="John Doe" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-email">YOUR EMAIL *</label>
                <input type="email" id="contact-email" class="form-input" placeholder="john@example.com" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">YOUR MESSAGE *</label>
                <textarea id="contact-message" class="form-textarea" placeholder="Tell me about your project ideas or inquiries..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 16px;">
                <span>Send Message</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
            <div id="form-feedback" style="display: none; margin-top: 16px; padding: 14px; background: rgba(0, 255, 157, 0.15); border: 1px solid var(--accent-emerald); border-radius: var(--radius-sm); color: var(--accent-emerald); font-size: 0.95rem; text-align: center;">
              🎉 Message sent successfully! I'll get back to you within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach Copy Email button listener
  const copyBtn = container.querySelector('#copy-email-btn');
  copyBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    navigator.clipboard.writeText(data.personalInfo.email);
    copyBtn.title = "Copied!";
    setTimeout(() => { copyBtn.title = "Copy Email"; }, 2000);
  });

  // Attach Contact Form Submission listener
  const form = container.querySelector('#contact-form');
  const feedback = container.querySelector('#form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    soundFx.playSuccessSound();

    // Trigger Confetti effect!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    feedback.style.display = 'block';
    form.reset();

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 6000);
  });
}
