
import { showNotif } from './ui.js';
import { generateId, startFly, stopFly, openTrash, closeTrash } from './utilities.js';

const BIN_ID = '6856a1d98960c979a5ae622a';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const API_PUT = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const MASTER_KEY = '$2a$10$7imEXBjuQHy3kKGZyBZccumUxrrVRKqAlShV.sIjByFJhLXona.f6';

let dataHarapan = [];

// ===== Fungsi escape HTML =====
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ===== Init =====
export function initHopeWall() {
  loadInitialData();

  const form = document.getElementById('hope-form');
  form.addEventListener('submit', handleFormSubmit);

  const submitButton = document.querySelector('button[type="submit"]');
  const resetButton = document.querySelector('button[type="button"]');

  if (submitButton) {
    submitButton.addEventListener('mouseenter', startFly);
    submitButton.addEventListener('mouseleave', stopFly);
  }

  if (resetButton) {
    resetButton.addEventListener('mouseenter', openTrash);
    resetButton.addEventListener('mouseleave', closeTrash);
    resetButton.addEventListener('click', resetHopeForm);
  }
}

// ===== Load data awal =====
function loadInitialData() {
  document.getElementById('loader').style.display = 'flex';

  fetch(API_URL, { headers: { 'X-Master-Key': MASTER_KEY } })
    .then(res => {
      if (!res.ok) throw new Error('Gagal memuat data');
      return res.json();
    })
    .then(json => {
      dataHarapan = json.record || [];
      renderHopeWall();
      if (dataHarapan.length > 0) {
        showNotif(`Berhasil memuat ${dataHarapan.length} harapan`, 'success');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotif('Gagal memuat data: ' + error.message, 'error');
      // fallback data
      dataHarapan = [
        { id: '1', name: 'RJ', text: 'Semoga di tahun depan...', date: '12 Juli 2024' },
        { id: '2', name: 'BS', text: 'Semoga dunia lebih damai.', date: '21 Juni 2025' },
        { id: '3', name: 'AL', text: 'Sukses UTBK dan masuk PTN impian!', date: '20 Juni 2025' }
      ];
      renderHopeWall();
    })
    .finally(() => {
      document.getElementById('loader').style.display = 'none';
    });
}

// ===== Render dinding harapan =====
function renderHopeWall() {
  const hopeWall = document.getElementById('hope-wall');
  hopeWall.innerHTML = '';

  if (dataHarapan.length === 0) {
    hopeWall.innerHTML = `
      <div class="no-hope-message">
        <i class="fas fa-comment-alt"></i>
        <h3>Belum ada harapan</h3>
        <p>Jadilah yang pertama menulis harapan!</p>
      </div>
    `;
    return;
  }

  dataHarapan.forEach(item => {
    const card = document.createElement('div');
    card.className = 'hope-card';
    card.innerHTML = `
      <div class="hope-actions">
        <button class="edit-hope" data-id="${item.id}" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="delete-hope" data-id="${item.id}" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
      <div class="hope-initial">${escapeHTML(item.name.toUpperCase())}</div>
      <div class="hope-text">${escapeHTML(item.text)}</div>
      <div class="hope-meta">
        <div class="hope-date"><i class="far fa-clock"></i> ${item.date}</div>
      </div>
    `;
    hopeWall.appendChild(card);
  });

  // Event listener delete & edit
  document.querySelectorAll('.delete-hope').forEach(btn =>
    btn.addEventListener('click', handleDelete)
  );
  document.querySelectorAll('.edit-hope').forEach(btn =>
    btn.addEventListener('click', handleEdit)
  );
}

// ===== Update data remote =====
function updateRemoteData() {
  document.getElementById('loader').style.display = 'flex';
  fetch(API_PUT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': MASTER_KEY,
      'X-Bin-Versioning': 'false'
    },
    body: JSON.stringify(dataHarapan)
  })
    .then(res => {
      if (!res.ok) throw new Error('Gagal menyimpan data');
      return res.json();
    })
    .then(() => {
      renderHopeWall();
      resetHopeForm();
    })
    .catch(err => {
      console.error(err);
      showNotif('Gagal menyimpan data: ' + err.message, 'error');
    })
    .finally(() => {
      document.getElementById('loader').style.display = 'none';
    });
}

// ===== Konfirmasi delete =====
function showDeleteConfirm(id, onConfirm) {
  const oldPopup = document.getElementById('hope-delete-confirm');
  if (oldPopup) oldPopup.remove();

  const overlay = document.createElement('div');
  overlay.id = 'hope-delete-confirm';
  overlay.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:9999';

  const box = document.createElement('div');
  box.style = 'background:#fff;padding:2rem 1.5rem;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);text-align:center';
  box.innerHTML = `
    <div style="font-size:2rem;color:#e74c3c;margin-bottom:0.5rem"><i class='fas fa-exclamation-triangle'></i></div>
    <div style="font-size:1.1rem;margin-bottom:1rem;color:#0f172a">Yakin ingin menghapus harapan ini?</div>
    <button id="hope-confirm-yes" style="background:#e74c3c;color:#fff;padding:0.5rem 1.2rem;border:none;border-radius:6px;margin-right:0.7rem;cursor:pointer;font-weight:bold;">Ya, hapus</button>
    <button id="hope-confirm-no" style="background:#eee;color:#333;padding:0.5rem 1.2rem;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Batal</button>
  `;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById('hope-confirm-yes').onclick = () => { overlay.remove(); onConfirm(); };
  document.getElementById('hope-confirm-no').onclick = () => overlay.remove();
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

function handleDelete(e) {
  const id = e.currentTarget.dataset.id;
  showDeleteConfirm(id, () => {
    dataHarapan = dataHarapan.filter(item => item.id !== id);
    updateRemoteData();
  });
}

function handleEdit(e) {
  const id = e.currentTarget.dataset.id;
  const item = dataHarapan.find(d => d.id === id);
  const index = dataHarapan.findIndex(d => d.id === id);
  document.getElementById('nama').value = item.name;
  document.getElementById('hope-text').value = item.text;
  document.getElementById('hope-form').dataset.editing = index;
  showNotif('Sekarang Anda bisa mengedit harapan', 'success');
  window.scrollTo({ top: document.getElementById('harapan').offsetTop, behavior: 'smooth' });
}

// ===== Form submit =====
function handleFormSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('nama');
  const textInput = document.getElementById('hope-text');
  let name = nameInput.value.trim();
  let text = textInput.value.trim();

  if (!name || !text) {
    showNotif('Nama dan harapan harus diisi!', 'error');
    return;
  }

  // Escape input supaya plain text
  name = escapeHTML(name);
  text = escapeHTML(text);

  const date = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const editIndex = this.dataset.editing;
  if (editIndex !== undefined) {
    dataHarapan[editIndex] = { ...dataHarapan[editIndex], name, text, date };
    delete this.dataset.editing;
  } else {
    dataHarapan.push({ id: generateId(), name, text, date });
  }

  this.reset();
  resetHopeForm();
  updateRemoteData();

  showNotif('Yahhh Kasian gak bisa retas lagi', 'success');
}

// ===== Reset form =====
function resetHopeForm() {
  const form = document.getElementById('hope-form');
  form.reset();
  delete form.dataset.editing;
}


