export function initBackgroundTransition() {
    const images = [
      "img/kegiatan/bukber.jpg",
      "img/kegiatan/bukber2.jpg",
      "img/kegiatan/bukber3.jpg",
    ];
  
    let index = 0;
    const hero = document.getElementById("home");
    const transition = document.getElementById("bg-transition");
  
    // Set first image
    hero.style.backgroundImage = `url('${images[0]}')`;
  
    setInterval(() => {
      index = (index + 1) % images.length;
  
      // Set overlay image for transition
      transition.style.backgroundImage = `url('${images[index]}')`;
      transition.classList.remove("opacity-0");
      transition.classList.add("opacity-100");
  
      // After transition, change main background
      setTimeout(() => {
        hero.style.backgroundImage = `url('${images[index]}')`;
        transition.classList.remove("opacity-100");
        transition.classList.add("opacity-0");
      }, 1000);
    }, 5000);
  }