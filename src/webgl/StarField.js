import * as THREE from 'three';

export class StarField {
  constructor(scene, count = 2500) {
    this.scene = scene;
    this.count = count;

    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const color1 = new THREE.Color(0x00f3ff); // Cyan
    const color2 = new THREE.Color(0x9d4edd); // Purple
    const color3 = new THREE.Color(0xffffff); // White star

    for (let i = 0; i < count; i++) {
      // Spread in a large sphere
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color blend
      const rand = Math.random();
      const mixedColor = rand < 0.4 ? color1 : (rand < 0.8 ? color2 : color3);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Shader Material
    this.material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  update(time) {
    const t = time * 0.0002;
    this.points.rotation.y = t * 0.5;
    this.points.rotation.x = Math.sin(t * 0.3) * 0.1;
  }
}
