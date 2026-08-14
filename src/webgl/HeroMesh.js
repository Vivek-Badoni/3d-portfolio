import * as THREE from 'three';
import gsap from 'gsap';

export class HeroMesh {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.currentShapeType = 'torusKnot';
    this.wireframeMode = false;
    this.rotationSpeed = 1.0;

    // Create Main Mesh
    this.meshMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0f24,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: this.wireframeMode
    });

    this.buildGeometry(this.currentShapeType);

    // Inner Wireframe Accent Mesh
    this.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.innerMesh = new THREE.Mesh(this.meshGeometry, this.wireframeMaterial);
    this.innerMesh.scale.set(1.08, 1.08, 1.08);
    this.group.add(this.innerMesh);

    // Orbital Particle Ring around Mesh
    this.createOrbitalRing();

    // Mouse Tracking target
    this.targetRotation = { x: 0, y: 0 };
  }

  buildGeometry(type) {
    if (this.mainMesh) {
      this.group.remove(this.mainMesh);
    }
    if (this.innerMesh) {
      this.group.remove(this.innerMesh);
    }

    this.currentShapeType = type;

    switch (type) {
      case 'torusKnot':
        this.meshGeometry = new THREE.TorusKnotGeometry(1.4, 0.45, 128, 32, 2, 3);
        break;
      case 'icosahedron':
        this.meshGeometry = new THREE.IcosahedronGeometry(1.8, 1);
        break;
      case 'cube':
        this.meshGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2, 8, 8, 8);
        break;
      case 'sphere':
        this.meshGeometry = new THREE.SphereGeometry(1.8, 48, 48);
        break;
      case 'pyramid':
        this.meshGeometry = new THREE.ConeGeometry(2.0, 2.6, 4);
        break;
      default:
        this.meshGeometry = new THREE.TorusKnotGeometry(1.4, 0.45, 128, 32);
    }

    this.mainMesh = new THREE.Mesh(this.meshGeometry, this.meshMaterial);
    this.group.add(this.mainMesh);

    if (this.wireframeMaterial) {
      this.innerMesh = new THREE.Mesh(this.meshGeometry, this.wireframeMaterial);
      this.innerMesh.scale.set(1.08, 1.08, 1.08);
      this.group.add(this.innerMesh);
    }

    // Morph scaling transition using GSAP
    this.group.scale.set(0.2, 0.2, 0.2);
    gsap.to(this.group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    });
  }

  createOrbitalRing() {
    const ringCount = 180;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 3.2 + Math.sin(i * 0.5) * 0.2;
      ringPos[i * 3] = Math.cos(angle) * radius;
      ringPos[i * 3 + 1] = Math.sin(i * 3) * 0.3;
      ringPos[i * 3 + 2] = Math.sin(angle) * radius;
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    const ringMat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.08,
      transparent: true,
      opacity: 0.85
    });

    this.ringPoints = new THREE.Points(ringGeo, ringMat);
    this.group.add(this.ringPoints);
  }

  setWireframe(enabled) {
    this.wireframeMode = enabled;
    this.meshMaterial.wireframe = enabled;
  }

  setSpeed(speed) {
    this.rotationSpeed = speed;
  }

  setColorTheme(emissiveHex, wireframeHex) {
    gsap.to(this.meshMaterial.emissive, {
      r: new THREE.Color(emissiveHex).r,
      g: new THREE.Color(emissiveHex).g,
      b: new THREE.Color(emissiveHex).b,
      duration: 0.8
    });

    gsap.to(this.wireframeMaterial.color, {
      r: new THREE.Color(wireframeHex).r,
      g: new THREE.Color(wireframeHex).g,
      b: new THREE.Color(wireframeHex).b,
      duration: 0.8
    });
  }

  setMouseParallax(mouseX, mouseY) {
    this.targetRotation.x = mouseY * 0.6;
    this.targetRotation.y = mouseX * 0.6;
  }

  update(time) {
    const t = time * 0.001 * this.rotationSpeed;

    // Smooth rotation
    this.group.rotation.x += (this.targetRotation.x - this.group.rotation.x) * 0.05 + 0.002 * this.rotationSpeed;
    this.group.rotation.y += (this.targetRotation.y - this.group.rotation.y) * 0.05 + 0.005 * this.rotationSpeed;

    if (this.ringPoints) {
      this.ringPoints.rotation.z = -t * 0.5;
      this.ringPoints.rotation.y = t * 0.3;
    }

    // Subtle floating levitation bobbing
    this.group.position.y = Math.sin(t * 1.5) * 0.18;
  }
}
