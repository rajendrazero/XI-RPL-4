import { showNotif } from './ui.js';
import { generateId } from './utilities.js';

const BIN_ID = '6856a1d98960c979a5ae622a';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const API_PUT = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const MASTER_KEY = '$2a$10$7imEXBjuQHy3kKGZyBZccumUxrrVRKqAlShV.sIjByFJhLXona.f6';

let dataHarapan = [];

export function initHopeWall() {
  // Load initial data
  loadInitialData();
  
  // Setup form submission
  document.getElementById('hope-form').addEventListener('submit', handleFormSubmit);
}

function loadInitialData() {
  document.getElementById('loader').style.display = 'flex';

  fetch(API_URL, {
    headers: { 'X-Master-Key': MASTER_KEY }
  })
  .then(res => {
    if (!res.ok) throw new Error('Gagal memuat data');
    return res.json();
  })
  .then(json => {
    dataHarapan = json.record;
    renderHopeWall();
    if (dataHarapan.length > 0) {
      showNotif(`Berhasil memuat ${dataHarapan.length} harapan`, 'success');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    showNotif('Gagal memuat data: ' + error.message, 'error');
    // Fallback data
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
  
  dataHarapan.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'hope-card';
    card.innerHTML = `
      <div class="hope-initial">${item.name.toUpperCase()}</div>
      <div class="hope-text">${item.text}</div>
      <div class="hope-meta">
        <div class="hope-date">
          <i class="far fa-clock"></i> ${item.date}
        </div>
      </div>
    `;
    hopeWall.appendChild(card);
  });

  // Add event listeners
  document.querySelectorAll('.delete-hope').forEach(btn => 
    btn.addEventListener('click', handleDelete)
  );
  document.querySelectorAll('.edit-hope').forEach(btn => 
    btn.addEventListener('click', handleEdit)
  );
}

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
  .then(response => {
    if (!response.ok) throw new Error('Gagal menyimpan data');
    return response.json();
  })
  .then(() => {
    renderHopeWall();
    resetHopeForm();
    showNotif('Berhasil menyimpan harapan!', 'success');
  })
  .catch((error) => {
    console.error('Error:', error);
    showNotif('Gagal menyimpan data: ' + error.message, 'error');
  })
  .finally(() => {
    document.getElementById('loader').style.display = 'none';
  });
}

function handleDelete(e) {
  const id = e.currentTarget.dataset.id;
  dataHarapan = dataHarapan.filter(item => item.id !== id);
  updateRemoteData();
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

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('nama').value.trim();
  const text = document.getElementById('hope-text').value.trim();
  
  if (!name || !text) {
    showNotif('Nama dan harapan harus diisi!', 'error');
    return;
  }
  
  const date = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const editIndex = this.dataset.editing;
  if (editIndex !== undefined) {
    dataHarapan[editIndex] = {
      ...dataHarapan[editIndex],
      name, text, date
    };
    delete this.dataset.editing;
  } else {
    dataHarapan.push({ id: generateId(), name, text, date });
  }

  this.reset();
  resetHopeForm();
  updateRemoteData();
}

function resetHopeForm() {
  const form = document.getElementById('hope-form');
  form.reset(); 
  delete form.dataset.editing; 
}