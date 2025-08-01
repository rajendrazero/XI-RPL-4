import { initBackgroundTransition } from './modules/background.js';
import { initHopeWall } from './modules/hopeWall.js';
import { init3DModel } from './modules/threejs.js';
import { 
  initMobileMenu, 
  initScrollAnimations, 
  initSmoothScrolling,
  initHeaderScrollEffect
} from './modules/ui.js';
import { initPrestasi } from './modules/prestasi.js';
import { initGaleri } from './modules/galeri.js';
import { initTim } from './modules/tim.js';

window.addEventListener('load', () => {
  // Initialize 3D model after page loads
  init3DModel();
});

const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// main.js - Perbaiki urutan dan penanganan
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundTransition();
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScrollEffect();
    
    // Inisialisasi setelah DOM siap
    setTimeout(() => {
      initTim();
      initPrestasi();
      initGaleri();
      initHopeWall();
      initScrollAnimations(); // Pastikan terpanggil terakhir
    }, 300);
  });

