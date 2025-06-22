

export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  export function startFly() {
    document.getElementById("planeIcon")?.classList.add("fly-loop");
  }
  
  export function stopFly() {
    document.getElementById("planeIcon")?.classList.remove("fly-loop");
  }
  
  export function openTrash() {
    const trashIcon = document.getElementById("trashIcon");
    if (!trashIcon) return;
    
    trashIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-yellow-300 transition-transform duration-300" viewBox="0 0 24 24">
        <rect x="6" y="2" width="12" height="2" rx="1" transform="rotate(-10 12 3)" />
        <path d="M5 7h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
        <line x1="9" y1="10" x2="9" y2="17" stroke="currentColor" stroke-width="1.5" />
        <line x1="12" y1="10" x2="12" y2="17" stroke="currentColor" stroke-width="1.5" />
        <line x1="15" y1="10" x2="15" y2="17" stroke="currentColor" stroke-width="1.5" />
      </svg>
    `;
  }
  
  export function closeTrash() {
    const trashIcon = document.getElementById("trashIcon");
    if (!trashIcon) return;
    
    trashIcon.innerHTML = `
      <i class="fas fa-trash text-xl transition-transform duration-300"></i>
    `;
  }


  