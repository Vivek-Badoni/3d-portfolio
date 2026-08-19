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
    this.pulseMode = false;
    this.warpMode = false;

    // Premium Cyber Material for Main Mesh
    this.meshMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x070c20,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.4,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      wireframe: this.wireframeMode
    });

    // Wireframe Outer Cage Material
    this.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // Outer Gyroscope Holographic Rings Materials
    this.ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });

    this.ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    // Build Central 3D Geometry
    this.buildGeometry(this.currentShapeType);

    // Create Holographic Gyro-Rings
    this.createHolographicGyroRings();

    // Create Double-Helix Orbital Particle Field
    this.createDoubleHelixParticles();

    // Mouse Tracking Target
    this.targetRotation = { x: 0, y: 0 };
  }

  buildGeometry(type) {
    if (this.mainMesh) this.group.remove(this.mainMesh);
    if (this.innerMesh) this.group.remove(this.innerMesh);

    this.currentShapeType = type;

    switch (type) {
      case 'torusKnot':
        this.meshGeometry = new THREE.TorusKnotGeometry(1.35, 0.42, 128, 32, 2, 3);
        break;
      case 'quantumMatrix':
        this.meshGeometry = new THREE.TorusKnotGeometry(1.4, 0.22, 200, 32, 3, 7);
        break;
      case 'cyberCrystal':
        this.meshGeometry = new THREE.ConeGeometry(1.65, 3.2, 6, 2);
        break;
      case 'tesseract':
        this.meshGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0, 12, 12, 12);
        break;
      case 'pulsarCore':
        this.meshGeometry = new THREE.IcosahedronGeometry(1.7, 4);
        break;
      case 'dnaHelix':
        this.meshGeometry = new THREE.TorusKnotGeometry(1.3, 0.38, 180, 24, 4, 3);
        break;
      case 'stellarStar':
        this.meshGeometry = new THREE.TetrahedronGeometry(1.9, 2);
        break;
      default:
        this.meshGeometry = new THREE.TorusKnotGeometry(1.35, 0.42, 128, 32);
    }

    this.mainMesh = new THREE.Mesh(this.meshGeometry, this.meshMaterial);
    this.group.add(this.mainMesh);

    if (this.wireframeMaterial) {
      this.innerMesh = new THREE.Mesh(this.meshGeometry, this.wireframeMaterial);
      this.innerMesh.scale.set(1.07, 1.07, 1.07);
      this.group.add(this.innerMesh);
    }

    // Elastic morph scaling transition using GSAP
    this.group.scale.set(0.15, 0.15, 0.15);
    gsap.to(this.group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.1,
      ease: "elastic.out(1, 0.45)"
    });

    this.triggerParticleExplosion();
  }

  createHolographicGyroRings() {
    this.ringGroup = new THREE.Group();
    this.group.add(this.ringGroup);

    // Gyro Ring 1
    const rGeo1 = new THREE.TorusGeometry(2.4, 0.025, 16, 96);
    this.gyroRing1 = new THREE.Mesh(rGeo1, this.ringMaterial1);
    this.gyroRing1.rotation.x = Math.PI / 3;
    this.ringGroup.add(this.gyroRing1);

    // Gyro Ring 2
    const rGeo2 = new THREE.TorusGeometry(2.75, 0.025, 16, 96);
    this.gyroRing2 = new THREE.Mesh(rGeo2, this.ringMaterial2);
    this.gyroRing2.rotation.z = -Math.PI / 3.5;
    this.ringGroup.add(this.gyroRing2);
  }

  createDoubleHelixParticles() {
    this.helixCount = 240;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(this.helixCount * 3);

    for (let i = 0; i < this.helixCount; i++) {
      const angle = (i / this.helixCount) * Math.PI * 8;
      const radius = 3.3 + Math.sin(i * 0.3) * 0.3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = ((i / this.helixCount) - 0.5) * 4.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.helixMaterial = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.08,
      transparent: true,
      opacity: 0.85
    });

    this.helixPoints = new THREE.Points(geo, this.helixMaterial);
    this.group.add(this.helixPoints);
  }

  getGeometryStats() {
    if (!this.meshGeometry) return { vertices: 0, faces: 0 };
    const pos = this.meshGeometry.attributes.position;
    const count = pos ? pos.count : 0;
    const index = this.meshGeometry.index;
    const faces = index ? index.count / 3 : count / 3;
    return { vertices: count, faces: Math.round(faces) };
  }

  setPulseMode(enabled) {
    this.pulseMode = enabled;
  }

  setWarpMode(enabled) {
    this.warpMode = enabled;
  }

  triggerDisintegrate() {
    const burstCount = 350;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(burstCount * 3);
    const velocities = [];

    for (let i = 0; i < burstCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      velocities.push(
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28
      );
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.15,
      transparent: true,
      opacity: 1
    });

    const burstPoints = new THREE.Points(geo, mat);
    this.scene.add(burstPoints);

    gsap.to(this.group.scale, {
      x: 0.05,
      y: 0.05,
      z: 0.05,
      duration: 0.4,
      ease: "power2.in"
    });

    gsap.to(mat, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        const posAttr = geo.attributes.position;
        for (let i = 0; i < burstCount; i++) {
          posAttr.setXYZ(
            i,
            posAttr.getX(i) + velocities[i * 3],
            posAttr.getY(i) + velocities[i * 3 + 1],
            posAttr.getZ(i) + velocities[i * 3 + 2]
          );
        }
        posAttr.needsUpdate = true;
      },
      onComplete: () => {
        this.scene.remove(burstPoints);
        geo.dispose();
        mat.dispose();

        gsap.to(this.group.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.0,
          ease: "elastic.out(1, 0.4)"
        });
      }
    });
  }

  triggerParticleExplosion() {
    const burstCount = 140;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(burstCount * 3);
    const velocities = [];

    for (let i = 0; i < burstCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      velocities.push(
        (Math.random() - 0.5) * 0.14,
        (Math.random() - 0.5) * 0.14,
        (Math.random() - 0.5) * 0.14
      );
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.12,
      transparent: true,
      opacity: 1
    });

    const burstPoints = new THREE.Points(geo, mat);
    this.scene.add(burstPoints);

    gsap.to(mat, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        const posAttr = geo.attributes.position;
        for (let i = 0; i < burstCount; i++) {
          posAttr.setXYZ(
            i,
            posAttr.getX(i) + velocities[i * 3],
            posAttr.getY(i) + velocities[i * 3 + 1],
            posAttr.getZ(i) + velocities[i * 3 + 2]
          );
        }
        posAttr.needsUpdate = true;
      },
      onComplete: () => {
        this.scene.remove(burstPoints);
        geo.dispose();
        mat.dispose();
      }
    });
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

    if (this.ringMaterial1) {
      gsap.to(this.ringMaterial1.color, {
        r: new THREE.Color(emissiveHex).r,
        g: new THREE.Color(emissiveHex).g,
        b: new THREE.Color(emissiveHex).b,
        duration: 0.8
      });
    }

    if (this.ringMaterial2) {
      gsap.to(this.ringMaterial2.color, {
        r: new THREE.Color(wireframeHex).r,
        g: new THREE.Color(wireframeHex).g,
        b: new THREE.Color(wireframeHex).b,
        duration: 0.8
      });
    }
  }

  setMouseParallax(mouseX, mouseY) {
    this.targetRotation.x = mouseY * 0.6;
    this.targetRotation.y = mouseX * 0.6;
  }

  update(time) {
    const effectiveSpeed = this.warpMode ? this.rotationSpeed * 3.5 : this.rotationSpeed;
    const t = time * 0.001 * effectiveSpeed;

    // Smooth Core Rotation
    this.group.rotation.x += (this.targetRotation.x - this.group.rotation.x) * 0.05 + 0.003 * effectiveSpeed;
    this.group.rotation.y += (this.targetRotation.y - this.group.rotation.y) * 0.05 + 0.006 * effectiveSpeed;

    // Gyroscope Holographic Rings Rotation
    if (this.gyroRing1) {
      this.gyroRing1.rotation.x += 0.012 * effectiveSpeed;
      this.gyroRing1.rotation.y += 0.008 * effectiveSpeed;
    }
    if (this.gyroRing2) {
      this.gyroRing2.rotation.z += 0.015 * effectiveSpeed;
      this.gyroRing2.rotation.y -= 0.01 * effectiveSpeed;
    }

    // Double Helix Particle Rotation
    if (this.helixPoints) {
      this.helixPoints.rotation.y = t * 0.6;
      this.helixPoints.rotation.z = Math.sin(t * 0.4) * 0.15;
    }

    // Pulse mode scale modulation
    if (this.pulseMode) {
      const pulseScale = 1 + Math.sin(time * 0.005) * 0.18;
      this.mainMesh.scale.set(pulseScale, pulseScale, pulseScale);
      if (this.innerMesh) this.innerMesh.scale.set(pulseScale * 1.07, pulseScale * 1.07, pulseScale * 1.07);
    } else {
      this.mainMesh.scale.set(1, 1, 1);
      if (this.innerMesh) this.innerMesh.scale.set(1.07, 1.07, 1.07);
    }

    // Floating levitation bobbing
    this.group.position.y = Math.sin(t * 1.5) * (this.warpMode ? 0.35 : 0.2);
  }
}
