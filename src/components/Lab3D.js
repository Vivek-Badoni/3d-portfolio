import { soundFx } from '../utils/audio.js';

export function renderLab3D(container, heroMesh, sceneManager) {
  container.innerHTML = `
    <section class="section-padding" id="lab">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span>Interactive Playground</span>
          </div>
          <h2 class="section-title">3D WebGL <span class="text-gradient">Control Lab</span></h2>
          <p class="section-desc">Customize the interactive 3D WebGL viewport in real-time. Switch geometries, trigger disintegration physics, toggle pulse modes, and morph color themes.</p>
        </div>

        <div class="lab-layout">
          <div class="glass-panel lab-preview-box" id="lab-preview-box">
            <div class="lab-live-badge">
              <span class="live-dot"></span> REALTIME THREE.JS RENDERER
            </div>

            <!-- Active Mesh Telemetry Overlay -->
            <div class="lab-telemetry-panel">
              <div class="telemetry-item">
                <span class="telemetry-label">Geometry:</span>
                <span class="telemetry-value text-gradient" id="lab-shape-val">Torus Knot</span>
              </div>
              <div class="telemetry-item">
                <span class="telemetry-label">Speed:</span>
                <span class="telemetry-value" id="lab-speed-val">1.0x</span>
              </div>
              <div class="telemetry-item">
                <span class="telemetry-label">Vertices:</span>
                <span class="telemetry-value" id="lab-vert-val" style="color: var(--primary-cyan);">4,096</span>
              </div>
              <div class="telemetry-item">
                <span class="telemetry-label">Wireframe:</span>
                <span class="telemetry-value" id="lab-wf-val" style="color: var(--text-dim);">OFF</span>
              </div>
            </div>

            <div class="lab-drag-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              <span>Move cursor to orbit & tilt 3D canvas</span>
            </div>
          </div>

          <div class="glass-panel lab-control-panel">
            <h3 style="font-size: 1.2rem; margin-bottom: 12px;" class="text-gradient">Lab Controls</h3>

            <!-- Geometry Selector -->
            <div class="control-group">
              <label class="control-label">3D Mesh Shape</label>
              <div class="shape-btn-grid" style="grid-template-columns: repeat(4, 1fr);">
                <button class="shape-btn active" data-shape="torusKnot" data-name="Torus Knot (Classic)">Torus Knot</button>
                <button class="shape-btn" data-shape="quantumMatrix" data-name="Quantum Matrix">Quantum Matrix</button>
                <button class="shape-btn" data-shape="cyberCrystal" data-name="Cyber Crystal">Cyber Crystal</button>
                <button class="shape-btn" data-shape="tesseract" data-name="Hypercube Tesseract">Tesseract</button>
                <button class="shape-btn" data-shape="pulsarCore" data-name="Pulsar Core">Pulsar Core</button>
                <button class="shape-btn" data-shape="dnaHelix" data-name="DNA Helix">DNA Helix</button>
                <button class="shape-btn" data-shape="stellarStar" data-name="Stellar Cyber Star">Stellar Star</button>
              </div>
            </div>

            <!-- Animation FX Controls -->
            <div class="control-group">
              <label class="control-label">Animation FX & Shaders</label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-glass" id="pulse-btn" style="flex: 1; justify-content: center; padding: 8px 12px; font-size: 0.82rem;">
                  💓 Pulse Core: OFF
                </button>
                <button class="btn btn-glass" id="warp-btn" style="flex: 1; justify-content: center; padding: 8px 12px; font-size: 0.82rem;">
                  ⚡ Hyper Warp: OFF
                </button>
              </div>
              <button class="btn btn-primary" id="disintegrate-btn" style="width: 100%; justify-content: center; padding: 10px; margin-top: 8px; font-size: 0.88rem;">
                💥 Disintegrate & Re-assemble
              </button>
            </div>

            <!-- Wireframe Toggle -->
            <div class="control-group">
              <label class="control-label">Wireframe Mode</label>
              <button class="btn btn-glass" id="wireframe-toggle-btn" style="width: 100%; justify-content: center; padding: 10px;">
                Toggle Wireframe: OFF
              </button>
            </div>

            <!-- Rotation Speed Slider -->
            <div class="control-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="control-label">Orbital Rotation Speed</label>
                <span id="speed-label-badge" style="font-family: var(--font-code); font-size: 0.8rem; color: var(--primary-cyan);">1.0x</span>
              </div>
              <input type="range" id="speed-slider" min="0.1" max="3.0" step="0.1" value="1.0" style="width: 100%; accent-color: var(--primary-cyan); cursor: pointer;">
            </div>

            <!-- Theme Color Swatches -->
            <div class="control-group">
              <label class="control-label">Lighting Theme</label>
              <div class="theme-presets">
                <div class="theme-swatch active" data-primary="#00f3ff" data-secondary="#9d4edd" style="background: linear-gradient(135deg, #00f3ff, #9d4edd);" title="Cyber Cyan/Purple"></div>
                <div class="theme-swatch" data-primary="#00ff9d" data-secondary="#00f3ff" style="background: linear-gradient(135deg, #00ff9d, #00f3ff);" title="Matrix Emerald"></div>
                <div class="theme-swatch" data-primary="#ffb703" data-secondary="#ff477e" style="background: linear-gradient(135deg, #ffb703, #ff477e);" title="Solar Flare"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const shapeVal = container.querySelector('#lab-shape-val');
  const speedVal = container.querySelector('#lab-speed-val');
  const speedLabelBadge = container.querySelector('#speed-label-badge');
  const wfVal = container.querySelector('#lab-wf-val');
  const vertVal = container.querySelector('#lab-vert-val');

  function updateTelemetryStats() {
    if (heroMesh && vertVal) {
      const stats = heroMesh.getGeometryStats();
      vertVal.textContent = stats.vertices.toLocaleString();
    }
  }

  updateTelemetryStats();

  // Attach shape button handlers
  const shapeBtns = container.querySelectorAll('.shape-btn');
  shapeBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => soundFx.playHoverSound());
    btn.addEventListener('click', () => {
      soundFx.playClickSound();
      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const shapeType = btn.getAttribute('data-shape');
      const shapeName = btn.getAttribute('data-name');
      heroMesh.buildGeometry(shapeType);
      if (shapeVal) shapeVal.textContent = shapeName;
      updateTelemetryStats();
    });
  });

  // Pulse & Warp toggles
  let isPulse = false;
  const pulseBtn = container.querySelector('#pulse-btn');
  pulseBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    isPulse = !isPulse;
    heroMesh.setPulseMode(isPulse);
    pulseBtn.textContent = `💓 Pulse Core: ${isPulse ? 'ON' : 'OFF'}`;
    pulseBtn.style.borderColor = isPulse ? 'var(--primary-cyan)' : 'var(--glass-border)';
  });

  let isWarp = false;
  const warpBtn = container.querySelector('#warp-btn');
  warpBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    isWarp = !isWarp;
    heroMesh.setWarpMode(isWarp);
    warpBtn.textContent = `⚡ Hyper Warp: ${isWarp ? 'ON' : 'OFF'}`;
    warpBtn.style.borderColor = isWarp ? 'var(--accent-coral)' : 'var(--glass-border)';
  });

  // Disintegrate FX Trigger
  const disintegrateBtn = container.querySelector('#disintegrate-btn');
  disintegrateBtn.addEventListener('click', () => {
    soundFx.playChime();
    heroMesh.triggerDisintegrate();
  });

  // Attach wireframe toggle
  let isWireframe = false;
  const wireframeBtn = container.querySelector('#wireframe-toggle-btn');
  wireframeBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    isWireframe = !isWireframe;
    heroMesh.setWireframe(isWireframe);
    wireframeBtn.textContent = `Toggle Wireframe: ${isWireframe ? 'ON' : 'OFF'}`;
    wireframeBtn.style.borderColor = isWireframe ? 'var(--primary-cyan)' : 'var(--glass-border)';
    if (wfVal) {
      wfVal.textContent = isWireframe ? 'ON' : 'OFF';
      wfVal.style.color = isWireframe ? 'var(--primary-cyan)' : 'var(--text-dim)';
    }
  });

  // Attach speed slider
  const speedSlider = container.querySelector('#speed-slider');
  speedSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value).toFixed(1);
    heroMesh.setSpeed(parseFloat(val));
    if (speedVal) speedVal.textContent = `${val}x`;
    if (speedLabelBadge) speedLabelBadge.textContent = `${val}x`;
  });

  // Attach theme swatches
  const swatches = container.querySelectorAll('.theme-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      soundFx.playClickSound();
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const pColor = swatch.getAttribute('data-primary');
      const sColor = swatch.getAttribute('data-secondary');
      heroMesh.setColorTheme(pColor, sColor);
      sceneManager.setThemeColors(pColor, sColor);
    });
  });
}
