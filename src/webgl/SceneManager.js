import * as THREE from 'three';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.scene = new THREE.Scene();
    
    // Perspective Camera
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 7);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.container.appendChild(this.renderer.domElement);

    // Lighting Setup
    this.setupLighting();

    // Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.updatables = [];
  }

  setupLighting() {
    // Ambient Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    // Main Cyber Point Light 1 (Cyan)
    this.light1 = new THREE.PointLight(0x00f3ff, 5, 20);
    this.light1.position.set(4, 4, 4);
    this.scene.add(this.light1);

    // Main Cyber Point Light 2 (Purple)
    this.light2 = new THREE.PointLight(0x9d4edd, 5, 20);
    this.light2.position.set(-4, -4, 3);
    this.scene.add(this.light2);

    // Accent Rim Light (Emerald Glow)
    this.light3 = new THREE.PointLight(0x00ff9d, 3, 15);
    this.light3.position.set(0, 5, -2);
    this.scene.add(this.light3);
  }

  addUpdatable(object) {
    this.updatables.push(object);
  }

  setThemeColors(primaryColor, secondaryColor) {
    if (this.light1) this.light1.color.set(primaryColor);
    if (this.light2) this.light2.color.set(secondaryColor);
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render(time) {
    this.updatables.forEach(item => {
      if (item && typeof item.update === 'function') {
        item.update(time);
      }
    });

    // Slow orbiting lights animation
    const t = time * 0.001;
    this.light1.position.x = Math.sin(t * 0.7) * 5;
    this.light1.position.y = Math.cos(t * 0.5) * 5;

    this.light2.position.x = Math.cos(t * 0.6) * -5;
    this.light2.position.y = Math.sin(t * 0.8) * -5;

    this.renderer.render(this.scene, this.camera);
  }
}
