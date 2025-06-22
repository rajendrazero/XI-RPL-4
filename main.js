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

// Initialize when page is loaded
window.addEventListener('load', () => {
    init3DModel();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    
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








    // Team data array
    const teamData = [
        {
          "name": "Pak Ardiansyah, ST",
          "role": "Wali Kelas",
          "image": "img/struktur/pak-ardiansyah.jpg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Muhammad Nur Rajif",
          "role": "Ketua Kelas",
          "image": "img/struktur/rajif.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Kayla Khairunnisa",
          "role": "Sekretaris",
          "image": "img/struktur/kayla.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Syafira Azhara",
          "role": "Bendahara",
          "image": "img/struktur/syafira.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Dimas Pradhivta",
          "role": "Wakil Ketua",
          "image": "img/struktur/dimas.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Az-zahra",
          "role": "Wakil Sekretaris",
          "image": "img/struktur/zahra.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Dona Tiara Dewi",
          "role": "Wakil Bendahara",
          "image": "img/struktur/dona.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Afsar Nafis",
          "role": "Siswa",
          "image": "img/struktur/afsar.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Ahmad Faozan Zebua",
          "role": "Siswa",
          "image": "img/struktur/pojan.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Alvino Nugraha Nasution",
          "role": "Siswa",
          "image": "img/struktur/alvino_nugraha.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Alzira Ukhty Zaskia",
          "role": "Siswa",
          "image": "img/struktur/alzira_ukhty.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Amanda Aulia Shafira",
          "role": "Siswa",
          "image": "img/struktur/amanda_aulia.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Awanda Dhaffa Raditya",
          "role": "Siswa",
          "image": "img/struktur/awanda_dhaffa.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Bintang Aditya Risfa",
          "role": "Siswa",
          "image": "img/struktur/bintang_aditya.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Brenda Estella Silalahi",
          "role": "Siswa",
          "image": "img/struktur/brenda_estella.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Chindi Aulia",
          "role": "Siswa",
          "image": "img/struktur/chindi.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Dania Sifa",
          "role": "Siswa",
          "image": "img/struktur/dania.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Dhea Afrilla Dewi",
          "role": "Siswa",
          "image": "img/struktur/dhea_afrilla.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Erlangga Ramzi Putra",
          "role": "Siswa",
          "image": "img/struktur/erlangga_ramzi.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Gracia Jovina Simanjuntak",
          "role": "Siswa",
          "image": "img/struktur/gracia_jovina.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Haidil Habibi",
          "role": "Siswa",
          "image": "img/struktur/haidil.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Intan Wahyu Kesuma",
          "role": "Siswa",
          "image": "img/struktur/intan_wahyu.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Keysha Fira Maenda",
          "role": "Siswa",
          "image": "img/struktur/keysha_fira.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Luvia Hanum",
          "role": "Siswa",
          "image": "img/struktur/luvia.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Muhammad Fahdhy Akbar",
          "role": "Siswa",
          "image": "img/struktur/muhammad_fahdhy.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Muhammad Shubki Arifin",
          "role": "Siswa",
          "image": "img/struktur/muhammad_shubki.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Najla Ajjauza",
          "role": "Siswa",
          "image": "img/struktur/najla.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Nurannisa",
          "role": "Siswa",
          "image": "img/struktur/nurannisa.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Putri Ghaisani Sahputra",
          "role": "Siswa",
          "image": "img/struktur/putri.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Rajendra Athallah Fawwaz",
          "role": "Siswa",
          "image": "img/struktur/rajendra_athallah.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Randi Hartono",
          "role": "Siswa",
          "image": "img/struktur/randi.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Rendi Razaile",
          "role": "Siswa",
          "image": "img/struktur/rendi.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Ridwan Al Hafiz",
          "role": "Siswa",
          "image": "img/struktur/ridwan_al.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Satria Raffi Affandi",
          "role": "Siswa",
          "image": "img/struktur/satria_raffi.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        },
        {
          "name": "Tri Aulia Zahra",
          "role": "Siswa",
          "image": "img/struktur/tri_aulia.jpeg",
          "social": {
            "instagram": "#",
            "github": "#",
            "linkedin": "#"
          }
        }
      ];      

    // Function to generate team cards
    function generateTeamCards() {
        const container = document.getElementById('team-container');
        
        teamData.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card animate-on-scroll';
            
            card.innerHTML = `
                <div class="team-img">
                    <img src="${member.image}" alt="${member.role}">
                </div>
                <div class="team-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <div class="team-social">
                        <a href="${member.social.instagram}" class="social-icon"><i class="fab fa-instagram"></i></a>
                        <a href="${member.social.github}" class="social-icon"><i class="fab fa-github"></i></a>
                        <a href="${member.social.linkedin}" class="social-icon"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // Generate cards when the page loads
    window.addEventListener('DOMContentLoaded', generateTeamCards);