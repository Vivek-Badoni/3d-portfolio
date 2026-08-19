import * as THREE from 'three';

export class CyberGridTerrain {
  constructor(scene) {
    this.scene = scene;
    this.width = 70;
    this.height = 70;
    this.segments = 48;

    // Create Plane Geometry for Cyber Terrain
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, this.segments, this.segments);
    
    // Rotate horizontally
    this.geometry.rotateX(-Math.PI / 2.3);

    // Save initial positions
    this.initialPositions = this.geometry.attributes.position.array.slice();

    // Subtle Cyber Grid Material
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -4.8, -5);
    this.scene.add(this.mesh);

    // Create Constellation Node Particles & Lines
    this.createConstellationNodes();
  }

  createConstellationNodes() {
    this.nodeCount = 70;
    this.nodeGeo = new THREE.BufferGeometry();
    this.nodePositions = new Float32Array(this.nodeCount * 3);
    this.nodeVelocities = [];

    for (let i = 0; i < this.nodeCount; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = -4 + (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 35;

      this.nodePositions[i * 3] = x;
      this.nodePositions[i * 3 + 1] = y;
      this.nodePositions[i * 3 + 2] = z;

      this.nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.015
      });
    }

    this.nodeGeo.setAttribute('position', new THREE.BufferAttribute(this.nodePositions, 3));

    this.nodeMaterial = new THREE.PointsMaterial({
      color: 0x00ff9d,
      size: 0.12,
      transparent: true,
      opacity: 0.75
    });

    this.nodePoints = new THREE.Points(this.nodeGeo, this.nodeMaterial);
    this.scene.add(this.nodePoints);

    // Lines Connecting Constellation Nodes
    this.lineGeo = new THREE.BufferGeometry();
    this.lineMat = new THREE.LineBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.15
    });
    this.linesMesh = new THREE.LineSegments(this.lineGeo, this.lineMat);
    this.scene.add(this.linesMesh);
  }

  setColorTheme(primaryColor, secondaryColor) {
    if (this.material) {
      this.material.color.set(primaryColor);
    }
    if (this.nodeMaterial) {
      this.nodeMaterial.color.set(secondaryColor);
    }
    if (this.lineMat) {
      this.lineMat.color.set(primaryColor);
    }
  }

  update(time) {
    const t = time * 0.0008;
    const pos = this.geometry.attributes.position;

    // Smooth subtle ocean wave terrain movement
    for (let i = 0; i < pos.count; i++) {
      const x = this.initialPositions[i * 3];
      const z = this.initialPositions[i * 3 + 2];

      const wave1 = Math.sin(x * 0.15 + t) * Math.cos(z * 0.15 + t * 0.7) * 0.35;
      pos.setY(i, this.initialPositions[i * 3 + 1] + wave1);
    }
    pos.needsUpdate = true;

    // Update Constellation Nodes & Connecting Lines
    if (this.nodePositions && this.nodeGeo) {
      const linePos = [];

      for (let i = 0; i < this.nodeCount; i++) {
        let x = this.nodePositions[i * 3] + this.nodeVelocities[i].x;
        let y = this.nodePositions[i * 3 + 1] + this.nodeVelocities[i].y;
        let z = this.nodePositions[i * 3 + 2] + this.nodeVelocities[i].z;

        if (Math.abs(x) > 20) this.nodeVelocities[i].x *= -1;
        if (y < -6 || y > -2) this.nodeVelocities[i].y *= -1;
        if (Math.abs(z) > 20) this.nodeVelocities[i].z *= -1;

        this.nodePositions[i * 3] = x;
        this.nodePositions[i * 3 + 1] = y;
        this.nodePositions[i * 3 + 2] = z;

        // Connect nearby nodes with lines
        for (let j = i + 1; j < this.nodeCount; j++) {
          const dx = x - this.nodePositions[j * 3];
          const dy = y - this.nodePositions[j * 3 + 1];
          const dz = z - this.nodePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 5.5) {
            linePos.push(x, y, z, this.nodePositions[j * 3], this.nodePositions[j * 3 + 1], this.nodePositions[j * 3 + 2]);
          }
        }
      }

      this.nodeGeo.attributes.position.needsUpdate = true;
      this.lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    }
  }
}
