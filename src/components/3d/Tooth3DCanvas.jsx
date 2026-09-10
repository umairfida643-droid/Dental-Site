import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Eye } from 'lucide-react';

export default function Tooth3DCanvas() {
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [inspectedCusp, setInspectedCusp] = useState(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // 2. Tooth Group & Procedural Geometry
    const toothGroup = new THREE.Group();
    toothGroup.position.set(0, -0.2, 0);

    // Realistic Enamel Material (PBR MeshPhysicalMaterial)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf4f9ff,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.22, // subtle enamel translucency
      ior: 1.54,
      reflectivity: 0.85,
      attenuationColor: new THREE.Color(0xd7ecff),
      attenuationDistance: 1.2,
      wireframe: wireframe
    });

    // Root material (slightly warmer ivory tone)
    const rootMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfaebd7,
      roughness: 0.35,
      metalness: 0.02,
      clearcoat: 0.4,
      wireframe: wireframe
    });

    // --- Build Molar Crown & Cusps ---
    // Central Crown Body
    const crownBodyGeo = new THREE.CylinderGeometry(1.0, 0.85, 1.1, 32, 16);
    // Sculpt crown body to be slightly rounded and organic
    const pos = crownBodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      // organic barrel distortion
      const factor = 1.0 - Math.pow(y / 0.6, 2) * 0.15;
      pos.setX(i, x * factor * (1 + 0.08 * Math.cos(4 * Math.atan2(z, x))));
      pos.setZ(i, z * factor * (1 + 0.08 * Math.cos(4 * Math.atan2(z, x))));
    }
    crownBodyGeo.computeVertexNormals();
    const crownMesh = new THREE.Mesh(crownBodyGeo, enamelMaterial);
    crownMesh.position.y = 0.5;
    crownMesh.castShadow = true;
    toothGroup.add(crownMesh);

    // 4 Occlusal Cusps (Anatomical molar ridges)
    const cuspPositions = [
      { x: 0.52, y: 1.15, z: 0.52, r: 0.48 },
      { x: -0.52, y: 1.15, z: 0.52, r: 0.46 },
      { x: 0.52, y: 1.12, z: -0.52, r: 0.45 },
      { x: -0.52, y: 1.12, z: -0.52, r: 0.47 }
    ];

    cuspPositions.forEach((cp) => {
      const cuspGeo = new THREE.SphereGeometry(cp.r, 24, 16);
      cuspGeo.scale(1, 0.9, 1);
      const cuspMesh = new THREE.Mesh(cuspGeo, enamelMaterial);
      cuspMesh.position.set(cp.x, cp.y, cp.z);
      cuspMesh.castShadow = true;
      toothGroup.add(cuspMesh);
    });

    // Central fissure dome
    const centralRidgeGeo = new THREE.SphereGeometry(0.65, 24, 12);
    centralRidgeGeo.scale(1.1, 0.35, 1.1);
    const centralRidge = new THREE.Mesh(centralRidgeGeo, enamelMaterial);
    centralRidge.position.set(0, 0.98, 0);
    toothGroup.add(centralRidge);

    // --- Tooth Roots (Double curved anatomical roots) ---
    const createRoot = (startX, curveDirection, length) => {
      const points = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const y = -t * length;
        const x = startX * (1 - t * 0.4) + Math.sin(t * Math.PI) * curveDirection * 0.25;
        const z = Math.cos(t * Math.PI * 0.5) * 0.1;
        points.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const rootGeo = new THREE.TubeGeometry(curve, 32, 0.35, 16, false);

      // Taper the root towards the tip
      const rPos = rootGeo.attributes.position;
      for (let i = 0; i < rPos.count; i++) {
        const y = rPos.getY(i);
        const t = Math.min(Math.max(-y / length, 0), 1);
        const taper = Math.max(1.0 - t * 0.72, 0.25);
        rPos.setX(i, rPos.getX(i) * taper);
        rPos.setZ(i, rPos.getZ(i) * taper);
      }
      rootGeo.computeVertexNormals();

      const rootMesh = new THREE.Mesh(rootGeo, rootMaterial);
      rootMesh.castShadow = true;
      return rootMesh;
    };

    const rootLeft = createRoot(-0.42, -0.4, 1.6);
    const rootRight = createRoot(0.42, 0.4, 1.6);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    // --- Floating Sparkling Micro-Particles ---
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 1.5;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    toothGroup.add(particleSystem);

    scene.add(toothGroup);

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xdcf0fa, 1.2);
    scene.add(ambientLight);

    // Key Light (warm soft light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Blue/Cyan Rim Light (gives medical tech sheen)
    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
    cyanRimLight.position.set(-4, -1, -3);
    scene.add(cyanRimLight);

    // Top Specular Highlight Light
    const topHighlight = new THREE.PointLight(0x38bdf8, 2.8, 10);
    topHighlight.position.set(0, 3, 2);
    scene.add(topHighlight);

    // Dynamic Cursor Pointer Light
    const cursorLight = new THREE.PointLight(0x67e8f9, 2.0, 8);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 4. Mouse Tracking & Interactive Drag
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
      mouseX = x;
      mouseY = y;

      cursorLight.position.x = x * 3;
      cursorLight.position.y = y * 3;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        toothGroup.rotation.y += deltaX * 0.01;
        toothGroup.rotation.x += deltaY * 0.01;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 5. Responsive Resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation if enabled and not dragging
      if (isRotating && !isDragging) {
        toothGroup.rotation.y += 0.007;
      }

      // Gentle floating levitation effect
      toothGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.5) * 0.08;

      // Cursor responsive gentle tilt
      if (!isDragging) {
        targetRotationY = mouseX * 0.35;
        targetRotationX = -mouseY * 0.25;
        toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.05;
      }

      // Rotate particle cloud slowly in counter direction
      particleSystem.rotation.y -= 0.003;
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // 7. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crownBodyGeo.dispose();
      enamelMaterial.dispose();
      rootMaterial.dispose();
    };
  }, [isRotating, wireframe]);

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center select-none">
      {/* Glow aura backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent rounded-3xl filter blur-3xl -z-10 pointer-events-none" />

      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl"
        title="Click and drag to rotate 3D tooth"
      />

      {/* Floating 3D Control Badges */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Left inspection tag */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs text-cyan-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Interactive 3D Molar Anatomy</span>
        </div>

        {/* Interactive action toggles */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all text-xs flex items-center gap-1.5 shadow-md ${
              isRotating 
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' 
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span className="hidden sm:inline font-medium">{isRotating ? 'Rotate ON' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all text-xs flex items-center gap-1.5 shadow-md ${
              wireframe 
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300' 
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Wireframe CAD Mesh"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">CAD Mesh</span>
          </button>
        </div>
      </div>

      {/* Subtle interaction tip overlay */}
      <div className="absolute top-4 right-4 pointer-events-none text-[11px] text-slate-400/80 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/5">
        ✦ Drag to inspect 360°
      </div>
    </div>
  );
}
