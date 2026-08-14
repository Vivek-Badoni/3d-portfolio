import { soundFx } from '../utils/audio.js';

export function renderProjects(container, data) {
  const categories = ['All', ...new Set(data.projects.map(p => p.category))];

  container.innerHTML = `
    <section class="section-padding" id="projects">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span>Portfolio Showcase</span>
          </div>
          <h2 class="section-title">Featured <span class="text-gradient">3D & Web Projects</span></h2>
          <p class="section-desc">Explore recent web applications, WebGL visualizers, and digital experiences created with cutting-edge web technologies.</p>
        </div>

        <div class="project-filters">
          ${categories.map((cat, idx) => `
            <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>
          `).join('')}
        </div>

        <div class="projects-grid" id="projects-grid">
          ${renderProjectCards(data.projects)}
        </div>
      </div>
    </section>

    <!-- Project Modal Backdrop -->
    <div class="modal-backdrop" id="project-modal">
      <div class="glass-panel modal-content" id="modal-content-body">
        <!-- Dynamic Modal Content -->
      </div>
    </div>
  `;

  // Attach filter event listeners
  const filterBtns = container.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => soundFx.playHoverSound());
    btn.addEventListener('click', () => {
      soundFx.playClickSound();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');
      const filtered = cat === 'All' ? data.projects : data.projects.filter(p => p.category === cat);
      container.querySelector('#projects-grid').innerHTML = renderProjectCards(filtered);
      attachCardEvents(container, data);
    });
  });

  attachCardEvents(container, data);
}

function renderProjectCards(projects) {
  return projects.map(p => `
    <div class="glass-panel project-card" data-id="${p.id}">
      <img src="${p.image}" alt="${p.title}" class="project-thumb" loading="lazy">
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-subtitle">${p.subtitle}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <button class="link-btn open-modal-btn" data-id="${p.id}">
            <span>View Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function attachCardEvents(container, data) {
  const cards = container.querySelectorAll('.project-card');
  const modal = container.querySelector('#project-modal');
  const modalBody = container.querySelector('#modal-content-body');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => soundFx.playHoverSound());

    // 3D tilt effect on card mousemove
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 18;
      const rotateY = (centerX - x) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Modal handlers
  const openBtns = container.querySelectorAll('.open-modal-btn');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFx.playChime();
      const projId = btn.getAttribute('data-id');
      const proj = data.projects.find(p => p.id === projId);

      if (proj) {
        modalBody.innerHTML = `
          <button class="modal-close-btn" id="close-modal-btn">&times;</button>
          <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 24px;">
          <h2 style="font-size: 1.8rem; margin-bottom: 8px;" class="text-gradient">${proj.title}</h2>
          <div style="color: var(--primary-cyan); font-family: var(--font-code); font-size: 0.9rem; margin-bottom: 16px;">Category: ${proj.category}</div>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; font-size: 1.05rem;">${proj.description}</p>
          <div class="project-tags" style="margin-bottom: 32px;">
            ${proj.tags.map(t => `<span class="tag" style="padding: 6px 16px; font-size: 0.85rem;">${t}</span>`).join('')}
          </div>
          <div style="display: flex; gap: 16px;">
            <a href="${proj.demoUrl}" target="_blank" class="btn btn-primary">Live Demo</a>
            <a href="${proj.githubUrl}" target="_blank" class="btn btn-glass">Source Code</a>
          </div>
        `;
        modal.classList.add('active');

        modalBody.querySelector('#close-modal-btn').addEventListener('click', () => {
          soundFx.playClickSound();
          modal.classList.remove('active');
        });
      }
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
