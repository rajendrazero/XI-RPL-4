import { showNotif } from './ui.js';
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
      "image": "img/struktur/afsar.jpg",
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
      "image": "img/struktur/alvino.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Alzira Ukhty Zaskia",
      "role": "Siswa",
      "image": "img/struktur/alzira.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Amanda Aulia Shafira",
      "role": "Siswa",
      "image": "img/struktur/amanda.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Awanda Dhaffa Raditya",
      "role": "Siswa",
      "image": "img/struktur/awanda.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Bintang Aditya Risfa",
      "role": "Siswa",
      "image": "img/struktur/bintang.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Brenda Estella Silalahi",
      "role": "Siswa",
      "image": "img/struktur/brenda.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Chindi Aulia",
      "role": "Siswa",
      "image": "img/struktur/chindy.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Dania Sifa",
      "role": "Siswa",
      "image": "img/struktur/dania.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Dhea Afrilla Dewi",
      "role": "Siswa",
      "image": "img/struktur/dhea.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Erlangga Ramzi Putra",
      "role": "Siswa",
      "image": "img/struktur/erlangga.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Gracia Jovina Simanjuntak",
      "role": "Siswa",
      "image": "img/struktur/echa.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Haidil Habibi",
      "role": "Siswa",
      "image": "img/struktur/haidil.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Intan Wahyu Kesuma",
      "role": "Siswa",
      "image": "img/struktur/intan.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Keysha Fira Maenda",
      "role": "Siswa",
      "image": "img/struktur/keysha.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Luvia Hanum",
      "role": "Siswa",
      "image": "img/struktur/luvia.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Muhammad Fahdhy Akbar",
      "role": "Siswa",
      "image": "img/struktur/fahdhy.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Muhammad Shubki Arifin",
      "role": "Siswa",
      "image": "img/struktur/shubki.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Najla Ajjauza",
      "role": "Siswa",
      "image": "img/struktur/najla.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Nurannisa",
      "role": "Siswa",
      "image": "img/struktur/nisa.jpg",
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
      "image": "img/struktur/rajendra.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Randi Hartono",
      "role": "Siswa",
      "image": "img/struktur/randi.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Rendi Razalie",
      "role": "Siswa",
      "image": "img/struktur/rendi.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Ridwan Al Hafiz",
      "role": "Siswa",
      "image": "img/struktur/hafiz.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Satria Raffi Affandi",
      "role": "Siswa",
      "image": "img/struktur/satria.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    },
    {
      "name": "Tri Aulia Zahra",
      "role": "Siswa",
      "image": "img/struktur/aulia.jpg",
      "social": {
        "instagram": "#",
        "github": "#",
        "linkedin": "#"
      }
    }
  ];      

  import { initScrollAnimations } from './ui.js';

  function renderTeamCards() {
    const container = document.getElementById('team-container');
    if (!container) return;
    
    teamData.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card animate-on-scroll';
      
      card.innerHTML = `
        <div class="team-img">
          <img src="${member.image}" alt="${member.role}" loading="lazy">
        </div>
        <div class="team-info">
          <h3>${member.name}</h3>
          <p>${member.role}</p>
          <div class="team-social">
            <a href="${member.social.instagram}" class="social-icon" data-link="${member.social.instagram}" aria-label="Instagram ${member.name}">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="${member.social.github}" class="social-icon" data-link="${member.social.github}" aria-label="GitHub ${member.name}">
              <i class="fab fa-github"></i>
            </a>
            <a href="${member.social.linkedin}" class="social-icon" data-link="${member.social.linkedin}" aria-label="LinkedIn ${member.name}">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
    // Tambahkan event listener social media SETELAH semua card dimasukkan ke DOM
    container.querySelectorAll('.social-icon').forEach(link => {
      link.addEventListener('click', function(e) {
        const url = this.getAttribute('data-link');
        if (!url || url === '#') {
          e.preventDefault();
          showNotif('Akun Belum Terdaftar', 'error');
        }
      });
    });
  }
  
// tim.js - Perbaiki inisialisasi
export function initTim() {
  // Pastikan container ada sebelum render
  if (document.getElementById('team-container')) {
    renderTeamCards();
    initScrollAnimations(); // Panggil ulang untuk elemen baru
  } else {
    setTimeout(initTim, 100); // Coba lagi setelah DOM siap
  }
}