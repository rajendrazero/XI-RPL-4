// Initialize Vanta.js background
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
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

// Initialize Three.js for 3D head model
function init3DModel() {
    const container = document.getElementById('model-container');
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

// Initialize animations on scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.mobile-menu').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Fungsi untuk Dinding Harapan
function initHopeWall() {
    const hopeForm = document.getElementById('hope-form');
    const hopeWall = document.getElementById('hope-wall');
    
    // Load existing hopes from localStorage
    let hopes = JSON.parse(localStorage.getItem('harapanRPL4')) || [];
    
    // Display hopes
    function displayHopes() {
        hopeWall.innerHTML = '';
        
        if (hopes.length === 0) {
            hopeWall.innerHTML = '<p class="text-center text-gray-500">Belum ada harapan yang ditulis. Jadilah yang pertama!</p>';
            return;
        }
        
        hopes.forEach((hope, index) => {
            const hopeCard = document.createElement('div');
            hopeCard.className = 'hope-card animate-on-scroll';
            hopeCard.innerHTML = `
                <div class="delete-hope" data-index="${index}"><i class="fas fa-times"></i></div>
                <div class="hope-text">${hope.text}</div>
                <div class="hope-author">- ${hope.name}</div>
                <div class="hope-date">${hope.date}</div>
            `;
            hopeWall.appendChild(hopeCard);
        });
        
        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-hope').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                hopes.splice(index, 1);
                localStorage.setItem('harapanRPL4', JSON.stringify(hopes));
                displayHopes();
            });
        });
    }
    
    // Form submission
    hopeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('nama').value.trim();
        const text = document.getElementById('harapan').value.trim();
        
        if (name && text) {
            // Create new hope
            const newHope = {
                name: name,
                text: text,
                date: new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
            
            // Add to array and save to localStorage
            hopes.unshift(newHope);
            localStorage.setItem('harapanRPL4', JSON.stringify(hopes));
            
            // Reset form
            hopeForm.reset();
            
            // Update display
            displayHopes();
            
            // Scroll to top of hope wall
            document.getElementById('hope-wall').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Initial display
    displayHopes();
}

// Initialize when page is loaded
window.addEventListener('load', () => {
    init3DModel();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initHopeWall();
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '10px 5%';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 5%';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }
    });
});
   