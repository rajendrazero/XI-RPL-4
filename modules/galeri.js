const galleryData = [
  {
    img: [
      "img/kegiatan/bukber",
      "img/kegiatan/bukber1",
      "img/kegiatan/bukber2",
      "img/kegiatan/bukber3",
      "img/kegiatan/bukber4",
      "img/kegiatan/bukber5",
      "img/kegiatan/bukber6",
      "img/kegiatan/bukber7",
    ],
    title: "Buka Bersama",
    desc: "Kegiatan Buka Puasa Bersama 1446H"
  },
  {
    img: [
      "img/kegiatan/kunjangan-rumah-walikelas",
      "img/kegiatan/kunjangan-rumah-walikelas2",
    ],
    title: "Silahtuhrahmi",
    desc: "Berkunjung Kerumah Walikelas"
  },
  {
    img: [
      "img/kegiatan/hari-guru",
      "img/kegiatan/hari-guru2",
      "img/kegiatan/hari-guru3",
      "img/kegiatan/hari-guru4",
      "img/kegiatan/hari-guru5",
      "img/kegiatan/hari-guru6",
      "img/kegiatan/hari-guru7",
      "img/kegiatan/hari-guru8",
    ],
    title: "Perayaan Hari Guru",
    desc: "Merayakan Hari Guru Nasional SMKN9 Medan"
  },
  {
    img: [
      "img/kegiatan/praktik-nikah",
      "img/kegiatan/praktik-nikah2",
      "img/kegiatan/praktik-nikah3",
      "img/kegiatan/praktik-nikah4",
      "img/kegiatan/praktik-nikah5",
      "img/kegiatan/praktik-nikah6",
      "img/kegiatan/praktik-nikah7",
      "img/kegiatan/praktik-nikah8",
    ],
    title: "Praktik Nikah",
    desc: "Pembelajaran Praktik Nikah"
  },
  {
    img: [
      "img/kegiatan/makan-bersama",
      "img/kegiatan/makan-bersama2",
    ],
    title: "Makan Bersama",
    desc: "Makan Bersama Meningkatkan Kekeluargaan"
  },
  {
    img: [
      "img/kegiatan/hbd-dimas",
      "img/kegiatan/hbd-dimas2",
      "img/kegiatan/hbd-dimas3"
    ],
    title: "Ulang Tahun Dimas",
    desc: "Merayakan Ulang Tahun ke 17 Dimas"
  },
  {
    img: [
      "img/kegiatan/hbd-kayla",
      "img/kegiatan/hbd-kayla2",
      "img/kegiatan/hbd-kayla3",
      "img/kegiatan/hbd-kayla4",
      "img/kegiatan/hbd-kayla5",
      "img/kegiatan/hbd-kayla6",
      "img/kegiatan/hbd-kayla7",
      "img/kegiatan/hbd-kayla8",
      "img/kegiatan/hbd-kayla9",
    ],
    title: "Ulang Tahun Kayla",
    desc: "Merayakan Ulang Tahun ke 17 Kayla"
  },
  {
    img: [
      "img/kegiatan/random",
      "img/kegiatan/random2",
      "img/kegiatan/random3",
      "img/kegiatan/random4",
      "img/kegiatan/random5",
      "img/kegiatan/random6",
      "img/kegiatan/random7",
    ],
    title: "Random",
    desc: "Foto Foto Random"
  }
];

// Variabel global modal control
let currentImages = [];
let currentIndex = 0;

function showImage(index) {
  const imgs = document.querySelectorAll("#imageModal .modal-carousel img");
  imgs.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function getValidImageUrl(base) {
  const jpg = base + '.jpg';
  const jpeg = base + '.jpeg';
  if (await checkImageExists(jpg)) return jpg;
  if (await checkImageExists(jpeg)) return jpeg;
  return jpg; // fallback
}

async function openModal(images, title, desc, clickedIndex) {
  const modal = document.getElementById("imageModal");
  if (!modal) {
    console.error("[Galeri Debug] Modal element not found!");
    debugger;
    return;
  }
  const modalCarousel = modal.querySelector(".modal-carousel");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  // Cek ekstensi gambar
  const imgTags = await Promise.all(images.map(async (src, i) => {
    const url = await getValidImageUrl(src);
    return `<img src="${url}" class="${i === clickedIndex ? "active" : ""}">`;
  }));

  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalCarousel.innerHTML = imgTags.join("");

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  currentImages = images;
  currentIndex = clickedIndex;

  // Update tombol navigasi setelah modal dibuka
  updateNavButtons();
}

async function renderGallery(data) {
  const container = document.getElementById("galleryContainer");
  if (!container) {
    console.error("[Galeri Debug] Gallery container not found!");
    debugger;
    return;
  }

  container.innerHTML = "";

  for (const [index, item] of data.entries()) {
    const el = document.createElement("div");
    el.className = "gallery-item";

    // Hanya gunakan ekstensi .jpg
    let imagesHTML = "";
    for (let i = 0; i < item.img.length; i++) {
      const base = item.img[i];
      const jpgUrl = base + ".jpg";
      imagesHTML += `
        <img 
          src="${jpgUrl}" 
          alt="${item.title}" 
          class="carousel-image ${(i === 0) ? "active" : ""}" 
          loading="lazy"
          data-img-index="${i}" 
          data-gallery-index="${index}"
        >
      `;
    }

    el.innerHTML = `
      <div class="carousel" data-index="${index}">
        ${imagesHTML}
        <button class="carousel-btn prev" data-dir="prev" data-index="${index}">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="carousel-btn next" data-dir="next" data-index="${index}">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    container.appendChild(el);
  }

  startCarousel();

  // Pasang event klik popup setelah gambar ada di DOM
  document.querySelectorAll(".gallery-item .carousel-image").forEach(img => {
    img.addEventListener("click", async () => {
      const galleryIndex = +img.dataset.galleryIndex;
      const imgIndex = +img.dataset.imgIndex;
      const data = galleryData[galleryIndex];
      // Buka modal dengan pengecekan ekstensi
      await openModal(data.img, data.title, data.desc, imgIndex);
    });
  });
}

function startCarousel() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    let index = 0;
    const images = carousel.querySelectorAll(".carousel-image");
    const total = images.length;

    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");

    const showImage = (i) => {
      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === i);
      });
    };

    const nextImage = () => {
      index = (index + 1) % total;
      showImage(index);
    };

    const prevImage = () => {
      index = (index - 1 + total) % total;
      showImage(index);
    };

    let interval = setInterval(nextImage, 5000);

    nextBtn.addEventListener("click", () => {
      nextImage();
      resetInterval();
    });

    prevBtn.addEventListener("click", () => {
      prevImage();
      resetInterval();
    });

    const resetInterval = () => {
      clearInterval(interval);
      interval = setInterval(nextImage, 5000);
    };
  });
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");
  modal.classList.add("hidden");
}

function updateCaptionAndNav() {
  showImage(currentIndex);
  updateNavButtons();
}

function updateNavButtons() {
  const modal = document.getElementById("imageModal");
  const nextBtn = modal.querySelector(".modal-nav.next");
  const prevBtn = modal.querySelector(".modal-nav.prev");
  if (!nextBtn || !prevBtn) return;
  if (currentImages.length === 1) {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
  } else {
    nextBtn.style.display = (currentIndex === currentImages.length - 1) ? "none" : "";
    prevBtn.style.display = (currentIndex === 0) ? "none" : "";
  }
}

function setupPopup() {
  const modal = document.getElementById("imageModal");
  const closeBtn = modal.querySelector(".modal-close");
  const nextBtn = modal.querySelector(".modal-nav.next");
  const prevBtn = modal.querySelector(".modal-nav.prev");

  closeBtn.addEventListener("click", closeModal);

  nextBtn.addEventListener("click", () => {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      updateCaptionAndNav();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCaptionAndNav();
    }
  });

  // Klik di overlay untuk tutup modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard support untuk modal
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    switch(e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        if (currentIndex > 0) {
          currentIndex--;
          updateCaptionAndNav();
        }
        break;
      case "ArrowRight":
        if (currentIndex < currentImages.length - 1) {
          currentIndex++;
          updateCaptionAndNav();
        }
        break;
    }
  });
}

export function initGaleri() {
  renderGallery(galleryData);
  setupPopup();
}
