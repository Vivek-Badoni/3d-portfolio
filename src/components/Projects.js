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
  const projectSnippets = {
    'proj-1': `// Python / Flask - ATS Scoring Engine
@app.route('/api/evaluate-ats', methods=['POST'])
def evaluate_resume():
    file = request.files['resume']
    text = extract_text_from_pdf(file)
    scores = calculate_ats_score(text, target_role="Full-Stack Developer")
    return jsonify({
        "ats_score": scores['total'],
        "skill_gaps": scores['gaps'],
        "sections": ["Header", "Skills", "Experience", "Projects", "Education"]
    })`,
    'proj-2': `// Laravel / PHP - Protected Middleware Auth Controller
public function login(Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);
    if (Auth::attempt($credentials, $request->remember)) {
        $request->session()->regenerate();
        return redirect()->intended('dashboard');
    }
    return back()->withErrors(['email' => 'Invalid credentials']);
}`,
    'proj-3': `// PHP / MySQL - Student Registration CRUD
$stmt = $pdo->prepare("INSERT INTO students (name, email, course, created_at) VALUES (?, ?, ?, NOW())");
$stmt->execute([$name, $email, $course]);
header("Location: dashboard.php?status=registered_success");`,
    'proj-4': `# Python - Speech Recognition Voice Command
import speech_recognition as sr

def listen_command():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
        command = recognizer.recognize_google(audio)
        return command.lower()`,
    'proj-5': `// Three.js / WebGL - Particle Mesh Rotation Loop
function animate(time) {
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}`
  };

  const openBtns = container.querySelectorAll('.open-modal-btn');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFx.playChime();
      const projId = btn.getAttribute('data-id');
      const proj = data.projects.find(p => p.id === projId);

      if (proj) {
        const snippet = projectSnippets[projId] || projectSnippets['proj-1'];
        modalBody.innerHTML = `
          <button class="modal-close-btn" id="close-modal-btn">&times;</button>
          <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 240px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 20px;">
          <h2 style="font-size: 1.8rem; margin-bottom: 4px;" class="text-gradient">${proj.title}</h2>
          <div style="color: var(--primary-cyan); font-family: var(--font-code); font-size: 0.88rem; margin-bottom: 16px;">Category: ${proj.category}</div>
          
          <div class="resume-tabs" style="margin-bottom: 18px;">
            <button class="resume-tab-btn active" id="proj-tab-btn-overview">Project Overview</button>
            <button class="resume-tab-btn" id="proj-tab-btn-code">Source Code Snippet</button>
          </div>

          <div id="proj-content-overview">
            <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px; font-size: 1rem;">${proj.description}</p>
            <div class="project-tags" style="margin-bottom: 24px;">
              ${proj.tags.map(t => `<span class="tag" style="padding: 6px 16px; font-size: 0.85rem;">${t}</span>`).join('')}
            </div>
          </div>

          <div id="proj-content-code" style="display: none;">
            <div style="background: rgba(5,7,18,0.9); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--glass-border); margin-bottom: 24px;">
              <pre style="font-family: var(--font-code); color: var(--accent-emerald); font-size: 0.85rem; overflow-x: auto; white-space: pre-wrap;">${escapeHtml(snippet)}</pre>
            </div>
          </div>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="${proj.demoUrl}" target="_blank" class="btn btn-primary">Live Demo / Repo</a>
            <a href="${proj.githubUrl}" target="_blank" class="btn btn-glass">GitHub Repository</a>
          </div>
        `;
        modal.classList.add('active');

        // Tab switching logic
        const tabOverview = modalBody.querySelector('#proj-tab-btn-overview');
        const tabCode = modalBody.querySelector('#proj-tab-btn-code');
        const contentOverview = modalBody.querySelector('#proj-content-overview');
        const contentCode = modalBody.querySelector('#proj-content-code');

        tabOverview.addEventListener('click', () => {
          soundFx.playClickSound();
          tabOverview.classList.add('active');
          tabCode.classList.remove('active');
          contentOverview.style.display = 'block';
          contentCode.style.display = 'none';
        });

        tabCode.addEventListener('click', () => {
          soundFx.playClickSound();
          tabCode.classList.add('active');
          tabOverview.classList.remove('active');
          contentOverview.style.display = 'none';
          contentCode.style.display = 'block';
        });

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

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}
