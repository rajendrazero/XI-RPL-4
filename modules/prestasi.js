const prestasiData = [
  {
    img: "img/prestasi/prestasi-fic.jpeg",
    date: "23 Mei 2025",
    title: "Juara 2 Lomba Foodtech Innovation Compotition 2025",
    desc: "Selamat kepada <strong>Rajendra Athallah Fawwaz</strong> dan tim yang berhasil meraih juara kedua dalam perlombaan FIC yang di adakan di Universitas Katolik Santo Thomas Medan 2025"
  },
  {
    img: "img/prestasi/prestasi-lks.jpeg",
    date: "10 Juni 2025",
    title: "Juara 2 Lomba Kompetensi Siswa",
    desc: "Selamat kepada <strong>Muhammad Nur Rajif</strong> yang berhasil meraih juara kedua dalam perlombaan kompetensi siswa WEB Technologies 2025"
  },
  {
    img: "img/prestasi/default-avatar.png",
    date: "mendatang...",
    title: "Mendatang...",
    desc: "Mendatang.."
  }
];

function renderPrestasi(data) {
  const container = document.getElementById("prestasiContainer");
  if (!container) return;
  
  container.innerHTML = ""; // reset konten

  data.forEach(item => {
    const el = document.createElement("div");
    el.className = "prestasi-card animate-on-scroll";
    el.innerHTML = `
      <div class="prestasi-img">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
      </div>
      <div class="prestasi-content">
        <div class="prestasi-meta">
          <span><i class="far fa-calendar"></i> ${item.date}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

export function initPrestasi() {
  renderPrestasi(prestasiData);
}