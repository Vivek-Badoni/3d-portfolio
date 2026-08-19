import './style.css';
import { portfolioData } from './data/portfolioData.js';
import { initCustomCursor } from './utils/cursor.js';
import { initTheme, setTheme } from './utils/theme.js';

import { SceneManager } from './webgl/SceneManager.js';
import { StarField } from './webgl/StarField.js';
import { HeroMesh } from './webgl/HeroMesh.js';
import { CyberGridTerrain } from './webgl/CyberGridTerrain.js';
import { MouseParallax } from './webgl/MouseParallax.js';

import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderAbout } from './components/About.js';
import { renderLab3D } from './components/Lab3D.js';
import { renderProjects } from './components/Projects.js';
import { renderSkills } from './components/Skills.js';
import { renderContact } from './components/Contact.js';
import { renderFooter } from './components/Footer.js';

import { renderTerminalModal } from './components/Terminal.js';
import { renderResumeModal } from './components/ResumeModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 2. Initialize WebGL 3D Scene
  const canvasContainer = document.getElementById('webgl-container');
  const sceneManager = new SceneManager(canvasContainer);

  const starField = new StarField(sceneManager.scene, 3000);
  sceneManager.addUpdatable(starField);

  const cyberTerrain = new CyberGridTerrain(sceneManager.scene);
  sceneManager.addUpdatable(cyberTerrain);

  const heroMesh = new HeroMesh(sceneManager.scene);
  sceneManager.addUpdatable(heroMesh);

  // Initialize Theme System & WebGL Sync
  initTheme(sceneManager, heroMesh, cyberTerrain);

  // Mouse Parallax for WebGL Mesh & Camera
  new MouseParallax((x, y) => {
    heroMesh.setMouseParallax(x, y);
    sceneManager.camera.position.x = x * 0.3;
    sceneManager.camera.position.y = y * 0.3;
  });

  // Start 3D Render Loop
  function animate(time) {
    sceneManager.render(time);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // 3. Render Modals & Overlays
  const terminalController = renderTerminalModal(document.getElementById('terminal-root'), portfolioData);
  const resumeController = renderResumeModal(document.getElementById('resume-root'), portfolioData);

  // 4. Render Component Views with Callbacks
  renderNavbar(document.getElementById('nav-root'), portfolioData, {
    openTerminal: () => terminalController.open(),
    onSelectTheme: (themeKey) => setTheme(themeKey)
  });

  renderHero(document.getElementById('hero-root'), portfolioData, {
    openResume: () => resumeController.open()
  });

  renderAbout(document.getElementById('about-root'), portfolioData);
  renderLab3D(document.getElementById('lab-root'), heroMesh, sceneManager);
  renderProjects(document.getElementById('projects-root'), portfolioData);
  renderSkills(document.getElementById('skills-root'), portfolioData);
  renderContact(document.getElementById('contact-root'), portfolioData);
  renderFooter(document.getElementById('footer-root'), portfolioData);

  // 5. Global Keyboard Shortcuts (~ or Ctrl+K for Terminal CLI)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      terminalController.open();
    }
  });

  // 6. Setup Scroll Spy for Navbar highlighting
  setupScrollSpy();
});

function setupScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
