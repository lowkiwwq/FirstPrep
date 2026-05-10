// antigravity.js
function initAntigravity(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const props = {
    count: 1500, // Increased to compensate for larger spawn area
    magnetRadius: 10,
    ringRadius: 10,
    waveSpeed: 0.4,
    waveAmplitude: 1,
    particleSize: 2,
    lerpSpeed: 0.1,
    color: '#FF4D1C', // Accent color from project
    autoAnimate: false,
    particleVariance: 1,
    rotationSpeed: 0,
    depthFactor: 1,
    pulseSpeed: 3,
    particleShape: 'capsule',
    fieldStrength: 10
  };

  let renderer = null;
  let scene = null;
  let camera = null;
  let mesh = null;
  let animationFrameId = 0;
  let particles = [];
  let dummy = new THREE.Object3D();
  let lastMousePos = { x: 0, y: 0 };
  let lastMouseMoveTime = 0;
  let virtualMouse = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };
  let clock = new THREE.Clock();

  function createGeometry(shape) {
    switch (shape) {
      case 'sphere': return new THREE.SphereGeometry(0.2, 16, 16);
      case 'box': return new THREE.BoxGeometry(0.3, 0.3, 0.3);
      case 'tetrahedron': return new THREE.TetrahedronGeometry(0.3);
      case 'capsule':
      default:
        // Use cylinder with rounded edge style (via higher segment count) for compatibility with older Three.js
        if (THREE.CapsuleGeometry) {
          return new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
        } else {
          return new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8);
        }
    }
  }

  function initParticles(viewportWidth, viewportHeight) {
    particles = [];
    for (let i = 0; i < props.count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      // Multiply by 2.5 to ensure particles exist far off-screen, so the ring isn't cut off at the edges
      const x = (Math.random() - 0.5) * viewportWidth * 2.5;
      const y = (Math.random() - 0.5) * viewportHeight * 2.5;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      particles.push({
        t, factor, speed, xFactor, yFactor, zFactor,
        mx: x, my: y, mz: z, cx: x, cy: y, cz: z,
        vx: 0, vy: 0, vz: 0, randomRadiusOffset
      });
    }
  }

  function getViewportAtDepth(camera, depth) {
    const fovInRadians = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fovInRadians / 2) * depth;
    const width = height * camera.aspect;
    return { width, height };
  }

  function setupScene() {
    const clientWidth = container.clientWidth || window.innerWidth;
    const clientHeight = container.clientHeight || window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const viewport = getViewportAtDepth(camera, camera.position.z);
    initParticles(viewport.width, viewport.height);

    const geometry = createGeometry(props.particleShape);
    const material = new THREE.MeshBasicMaterial({ color: props.color });
    mesh = new THREE.InstancedMesh(geometry, material, props.count);
    scene.add(mesh);

    // Event listener attached to document to capture mouse over whole page if needed
    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);

    animate();
  }

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    // Normalize mouse coords relative to container
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onResize() {
    if (!container || !renderer || !camera) return;
    const clientWidth = container.clientWidth;
    const clientHeight = container.clientHeight;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!mesh || !camera || !renderer || !scene) return;

    const viewport = getViewportAtDepth(camera, camera.position.z);
    const elapsedTime = clock.getElapsedTime();

    const mouseDist = Math.sqrt(Math.pow(pointer.x - lastMousePos.x, 2) + Math.pow(pointer.y - lastMousePos.y, 2));
    if (mouseDist > 0.001) {
      lastMouseMoveTime = Date.now();
      lastMousePos = { x: pointer.x, y: pointer.y };
    }

    let destX = (pointer.x * viewport.width) / 2;
    let destY = (pointer.y * viewport.height) / 2;

    if (props.autoAnimate && Date.now() - lastMouseMoveTime > 2000) {
      destX = Math.sin(elapsedTime * 0.5) * (viewport.width / 4);
      destY = Math.cos(elapsedTime * 0.5 * 2) * (viewport.height / 4);
    }

    const smoothFactor = 0.05;
    virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
    virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

    const targetX = virtualMouse.x;
    const targetY = virtualMouse.y;
    const globalRotation = elapsedTime * props.rotationSpeed;

    particles.forEach((particle, i) => {
      let { speed, mx, my, mz, cz, randomRadiusOffset } = particle;
      let t = particle.t += speed / 2;

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetPos = { x: mx, y: my, z: mz * props.depthFactor };

      if (dist < props.magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * props.waveSpeed + angle) * (0.5 * props.waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (props.fieldStrength + 0.1));
        const currentRingRadius = props.ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * props.depthFactor + Math.sin(t) * (1 * props.waveAmplitude * props.depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * props.lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * props.lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * props.lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      );

      const distFromRing = Math.abs(currentDistToMouse - props.ringRadius);
      let scaleFactor = 1 - distFromRing / 10;
      scaleFactor = Math.max(0, Math.min(1, scaleFactor));

      const finalScale = scaleFactor * (0.8 + Math.sin(t * props.pulseSpeed) * 0.2 * props.particleVariance) * props.particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }

  setupScene();

  return function cleanup() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    document.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    if (mesh) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
  };
}

window.initAntigravity = initAntigravity;
