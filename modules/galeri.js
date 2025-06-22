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
    ],
    title: "Makan Bersama",
    desc: "Makan Bersama Meningkatkan Kekeluargaan"
  },
  {
    img: [
      "img/kegiatan/random",
      "img/kegiatan/random2",
      "img/kegiatan/random3",
      "img/kegiatan/random4",
      "img/kegiatan/random5",
      "img/kegiatan/random6",
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

function openModal(images, title, desc, clickedIndex) {
  const modal = document.getElementById("imageModal");
  if (!modal) {
    console.error("[Galeri Debug] Modal element not found!");
    debugger;
    return;
  }
  const modalCarousel = modal.querySelector(".modal-carousel");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalCarousel.innerHTML = images.map((src, i) => `
    <img src="${src}.jpg" class="${i === clickedIndex ? "active" : ""}">
  `).join("");

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  currentImages = images;
  currentIndex = clickedIndex;

  // Update tombol navigasi setelah modal dibuka
  updateNavButtons();
}

function renderGallery(data) {
  const container = document.getElementById("galleryContainer");
  if (!container) {
    console.error("[Galeri Debug] Gallery container not found!");
    debugger;
    return;
  }

  container.innerHTML = "";

  data.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "gallery-item";

    const imagesHTML = item.img.map((url, i) => `
      <img 
        src="${url}.jpg" 
        alt="${item.title}" 
        class="carousel-image ${i === 0 ? "active" : ""}" 
        loading="lazy"
        data-img-index="${i}" 
        data-gallery-index="${index}"
      >
    `).join("");

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
  });

  startCarousel();

  // Pasang event klik popup setelah gambar ada di DOM
  document.querySelectorAll(".gallery-item .carousel-image").forEach(img => {
    img.addEventListener("click", () => {
      const galleryIndex = +img.dataset.galleryIndex;
      const imgIndex = +img.dataset.imgIndex;
      const data = galleryData[galleryIndex];
      console.log("[Galeri Debug] Gambar diklik", { galleryIndex, imgIndex, data });
      debugger;
      openModal(data.img, data.title, data.desc, imgIndex);
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
