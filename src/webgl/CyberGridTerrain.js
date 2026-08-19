import * as THREE from 'three';

export class CyberGridTerrain {
  constructor(scene) {
    this.scene = scene;
    this.width = 60;
    this.height = 60;
    this.segments = 40;

    // Create Plane Geometry for Cyber Terrain
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, this.segments, this.segments);
    
    // Rotate to lie horizontally
    this.geometry.rotateX(-Math.PI / 2.2);

    // Save initial vertex positions for wave calculations
    this.initialPositions = this.geometry.attributes.position.array.slice();

    // Wireframe Mesh Material
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -3.5, -4);
    this.scene.add(this.mesh);

    // Floating Neon Particles along Terrain
    this.createTerrainParticles();
  }

  createTerrainParticles() {
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 45;
      pPos[i * 3 + 1] = -3 + (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    this.particleMaterial = new THREE.PointsMaterial({
      color: 0x9d4edd,
      size: 0.09,
      transparent: true,
      opacity: 0.65
    });

    this.particles = new THREE.Points(pGeo, this.particleMaterial);
    this.scene.add(this.particles);
  }

  setColorTheme(primaryColor, secondaryColor) {
    if (this.material) {
      this.material.color.set(primaryColor);
    }
    if (this.particleMaterial) {
      this.particleMaterial.color.set(secondaryColor);
    }
  }

  update(time) {
    const t = time * 0.0012;
    const pos = this.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = this.initialPositions[i * 3];
      const z = this.initialPositions[i * 3 + 2];

      // Dynamic Cyber Wave Equation
      const wave1 = Math.sin(x * 0.25 + t) * Math.cos(z * 0.25 + t * 0.8) * 0.45;
      const wave2 = Math.sin(x * 0.1 - t * 0.5) * 0.25;

      pos.setY(i, this.initialPositions[i * 3 + 1] + wave1 + wave2);
    }

    pos.needsUpdate = true;

    if (this.particles) {
      this.particles.rotation.y = t * 0.05;
    }
  }
}
