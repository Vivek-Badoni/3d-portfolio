import { soundFx } from '../utils/audio.js';

export function renderFooter(container, data) {
  const currentYear = new Date().getFullYear();

  container.innerHTML = `
    <footer class="footer">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <div>
          © ${currentYear} <span class="text-gradient">${data.personalInfo.name}</span>. Built with Three.js & Modern Web Technologies.
        </div>
        <button class="icon-btn" id="scroll-to-top-btn" title="Back to Top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>
    </footer>
  `;

  const topBtn = container.querySelector('#scroll-to-top-btn');
  topBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
