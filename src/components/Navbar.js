import { soundFx } from '../utils/audio.js';

export function renderNavbar(container, data) {
  const initials = data.personalInfo.initials || data.personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const firstName = data.personalInfo.name.split(' ')[0];

  container.innerHTML = `
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="#hero" class="brand-logo">
          <div class="logo-badge">${initials}</div>
          <span>${firstName}<span class="text-gradient">.DEV</span></span>
        </a>

        <div class="nav-backdrop" id="nav-backdrop"></div>

        <ul class="nav-links" id="nav-links">
          <li><a href="#hero" class="nav-link active">Home</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#lab" class="nav-link">3D Lab</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
          <li class="mobile-nav-cta">
            <a href="#contact" class="btn btn-primary" style="padding: 12px 24px; width: 100%; justify-content: center;">Let's Talk</a>
          </li>
        </ul>

        <div class="nav-controls">
          <button class="icon-btn" id="audio-toggle-btn" title="Toggle Sound SFX">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
          <a href="#contact" class="btn btn-primary desktop-cta" style="padding: 10px 22px; font-size: 0.88rem;">Let's Talk</a>
          
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
        </div>
      </div>
    </nav>
  `;

  const navLinksContainer = container.querySelector('#nav-links');
  const mobileMenuBtn = container.querySelector('#mobile-menu-btn');
  const navBackdrop = container.querySelector('#nav-backdrop');

  function closeMobileMenu() {
    navLinksContainer.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    navBackdrop.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function toggleMobileMenu() {
    const isExpanded = navLinksContainer.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    navBackdrop.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isExpanded);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      soundFx.playClickSound();
      toggleMobileMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Attach navbar sound & scroll handlers
  const navLinks = container.querySelectorAll('.nav-link, .mobile-nav-cta a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => soundFx.playHoverSound());
    link.addEventListener('click', () => {
      soundFx.playClickSound();
      closeMobileMenu();
    });
  });

  const audioBtn = container.querySelector('#audio-toggle-btn');
  audioBtn.addEventListener('click', () => {
    const isEnabled = soundFx.toggleSound();
    audioBtn.style.color = isEnabled ? 'var(--primary-cyan)' : 'var(--text-dim)';
  });

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Close menu on resize to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      closeMobileMenu();
    }
  });
}
