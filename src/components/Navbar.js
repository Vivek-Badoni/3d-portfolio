import { soundFx } from '../utils/audio.js';

export function renderNavbar(container, data, callbacks = {}) {
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
          <!-- Terminal CLI Toggle -->
          <button class="icon-btn" id="terminal-toggle-btn" title="Open Cyber Terminal CLI (~ or Ctrl+K)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          </button>

          <!-- Theme Palette Selector -->
          <div class="theme-dropdown-wrapper">
            <button class="icon-btn" id="theme-toggle-btn" title="Select Theme Palette">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.75 1.7-1.68 0-.44-.17-.86-.44-1.18-.28-.33-.44-.75-.44-1.18 0-.93.77-1.68 1.7-1.68H16c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10z"/></svg>
            </button>
            <div class="theme-dropdown-menu" id="theme-dropdown-menu">
              <button class="theme-option" data-theme="cyber">
                <span class="swatch-dot" style="background: #00f3ff;"></span> Cyber Cyan (Dark)
              </button>
              <button class="theme-option" data-theme="light">
                <span class="swatch-dot" style="background: #0066ff;"></span> Daylight Cyber (Light)
              </button>
              <button class="theme-option" data-theme="synthwave">
                <span class="swatch-dot" style="background: #ff477e;"></span> Synthwave Sunset
              </button>
              <button class="theme-option" data-theme="matrix">
                <span class="swatch-dot" style="background: #00ff9d;"></span> Matrix Emerald
              </button>
              <button class="theme-option" data-theme="solar">
                <span class="swatch-dot" style="background: #ffb703;"></span> Solar Flare
              </button>
            </div>
          </div>

          <button class="icon-btn" id="music-toggle-btn" title="Toggle Ambient Synth Music">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </button>

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

  // Attach terminal toggle button handler
  const termBtn = container.querySelector('#terminal-toggle-btn');
  if (termBtn) {
    termBtn.addEventListener('click', () => {
      soundFx.playClickSound();
      if (callbacks.openTerminal) {
        callbacks.openTerminal();
      }
    });
  }

  // Attach Theme Dropdown Handlers
  const themeToggleBtn = container.querySelector('#theme-toggle-btn');
  const themeDropdownMenu = container.querySelector('#theme-dropdown-menu');
  const themeOptions = container.querySelectorAll('.theme-option');

  if (themeToggleBtn && themeDropdownMenu) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFx.playClickSound();
      themeDropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdownMenu.contains(e.target) && e.target !== themeToggleBtn) {
        themeDropdownMenu.classList.remove('active');
      }
    });

    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        soundFx.playClickSound();
        const themeKey = opt.getAttribute('data-theme');
        if (callbacks.onSelectTheme) {
          callbacks.onSelectTheme(themeKey);
        }
        themeDropdownMenu.classList.remove('active');
      });
    });
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

  const musicBtn = container.querySelector('#music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const isPlaying = soundFx.toggleAmbientMusic();
      musicBtn.style.color = isPlaying ? 'var(--accent-emerald)' : 'var(--text-dim)';
      musicBtn.style.borderColor = isPlaying ? 'var(--accent-emerald)' : 'var(--glass-border)';
    });
  }

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
