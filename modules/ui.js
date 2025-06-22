export function showNotif(msg, type = "success") {
  const notif = document.getElementById('notif');
  const notifText = document.getElementById('notif-text');
  
  // Set notification content
  notifText.textContent = msg;
  
  // Set notification type
  notif.className = 'notif'; // Reset class
  notif.classList.add(type);
  
  // Show notification
  notif.classList.add('show');
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    notif.classList.remove('show');
  }, 3000);
}

export function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  
  if (!hamburger || !mobileMenu) return;
  
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

// ui.js - Perbaiki fungsi initScrollAnimations
export function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Amati elemen yang sudah ada dan yang baru ditambahkan
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    // Buat MutationObserver untuk elemen baru
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.matches('.animate-on-scroll')) {
            observer.observe(node);
          }
          if (node.nodeType === 1) {
            node.querySelectorAll('.animate-on-scroll').forEach(child => {
              observer.observe(child);
            });
          }
        });
      });
    });
  
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
export function initSmoothScrolling() {
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
        document.querySelector('.mobile-menu')?.classList.remove('active');
        document.querySelector('.hamburger')?.classList.remove('active');
      }
    });
  });
}

export function initHeaderScrollEffect() {
  const header = document.querySelector('header');
  if (!header) return;
  
  if (window.scrollY > 100) {
    header.style.padding = '10px 5%';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '15px 5%';
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
  }
}

// Initialize notification close button
document.querySelector('.notif-close')?.addEventListener('click', function() {
  document.getElementById('notif').classList.remove('show');
});