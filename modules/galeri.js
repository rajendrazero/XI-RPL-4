const galleryData = [
  {
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Sesi Pemrograman",
    desc: "Praktik Java di laboratorium"
  },
  {
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Diskusi Proyek",
    desc: "Brainstorming aplikasi mobile"
  },
  {
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Presentasi Kelas",
    desc: "Demo aplikasi web siswa"
  },
  {
    img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Workshop UI/UX",
    desc: "Bersama desainer profesional"
  },
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Study Tour",
    desc: "Kunjungan ke perusahaan teknologi"
  },
  {
    img: "https://images.unsplash.com/photo-1543269865-0a740d43b90c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Perayaan Kelulusan",
    desc: "Acara kenangan kelas X"
  }
];

function renderGallery(data) {
  const container = document.getElementById("galleryContainer");
  if (!container) return;
  
  container.innerHTML = ""; // reset isi

  data.forEach(item => {
    const el = document.createElement("div");
    el.className = "gallery-item animate-on-scroll";
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

export function initGaleri() {
  renderGallery(galleryData);
}