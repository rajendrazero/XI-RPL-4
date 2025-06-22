export function init3DModel() {
    // Initialize Vanta.js background
    VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x4cc9f0,
      backgroundColor: 0x0f172a,
      points: 10.00,
      maxDistance: 25.00,
      spacing: 20.00
    });
  
    // Three.js implementation
    const container = document.getElementById('model-container');
    if (!container) return;
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create head geometry
    const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x4cc9f0,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);
    
    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.2, 0.9);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.2, 0.9);
    head.add(rightEye);
    
    // Create pupils
    const pupilGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.4, 0.2, 1.1);
    head.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.4, 0.2, 1.1);
    head.add(rightPupil);
    
    // Create nose
    const noseGeometry = new THREE.ConeGeometry(0.15, 0.5, 16);
    const noseMaterial = new THREE.MeshBasicMaterial({ color: 0x4cc9f0 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, -0.1, 1.1);
    nose.rotation.x = Math.PI / 2;
    head.add(nose);
    
    // Create mouth
    const mouthGeometry = new THREE.TorusGeometry(0.4, 0.05, 16, 32, Math.PI);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.5, 0.8);
    mouth.rotation.x = Math.PI / 2;
    head.add(mouth);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Point light inside head
    const pointLight = new THREE.PointLight(0x4cc9f0, 1.5, 5);
    pointLight.position.set(0, 0, 0);
    head.add(pointLight);
    
    camera.position.z = 4;
    
    // Mouse tracking for head and eye movement
    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      // Head follows mouse
      head.rotation.y = mouse.x * 0.3;
      head.rotation.x = mouse.y * 0.3;
      
      // Eyes follow mouse more precisely
      leftPupil.position.x = -0.4 + mouse.x * 0.1;
      leftPupil.position.y = 0.2 + mouse.y * 0.05;
      rightPupil.position.x = 0.4 + mouse.x * 0.1;
      rightPupil.position.y = 0.2 + mouse.y * 0.05;
      
      // Mouth animation
      mouth.scale.y = 0.8 + Math.sin(Date.now() * 0.005) * 0.2;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }