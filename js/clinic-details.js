// Clinic details page mock data + interactions.

const hours = [
  { day: 'Monday', time: '08:00 AM – 06:00 PM', open: true },
  { day: 'Tuesday', time: '08:00 AM – 06:00 PM', open: true },
  { day: 'Wednesday', time: '08:00 AM – 06:00 PM', open: true },
  { day: 'Thursday', time: '08:00 AM – 06:00 PM', open: true },
  { day: 'Friday', time: '08:00 AM – 05:00 PM', open: true },
  { day: 'Saturday', time: '09:00 AM – 02:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
];

let services = [
  'Wellness exams', 'Vaccinations', 'Dental care', 'Surgery',
  'Grooming', 'Emergency care', 'Diagnostic imaging', 'Boarding',
];

const staff = [
  { initials: 'SM', name: 'Dr. Sarah Miles', role: 'Head Veterinarian' },
  { initials: 'AF', name: 'Dr. Alan Ford', role: 'Veterinary Surgeon' },
  { initials: 'WZ', name: 'Dr. Wei Zhang', role: 'Veterinarian' },
  { initials: 'RN', name: 'Rita Novak', role: 'Vet Technician' },
];

let editMode = false;
let editSnapshot = null;

function renderHours() {
  const list = document.getElementById('hours-list');
  list.innerHTML = hours.map((h, i) => `
    <div class="hours-row">
      <div class="hours-day">${h.day}</div>
      <div class="hours-time">${h.open ? h.time : 'Closed'}</div>
      <div class="hours-toggle ${h.open ? 'on' : ''} ${editMode ? '' : 'readonly'}" data-index="${i}">
        <div class="knob"></div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.hours-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const idx = Number(toggle.dataset.index);
      hours[idx].open = !hours[idx].open;
      renderHours();
    });
  });
}

function renderServices() {
  const list = document.getElementById('services-list');
  list.innerHTML = services.map((s, i) => `
    <span class="chip">
      ${s}
      ${editMode ? `<button data-index="${i}" class="remove-service" aria-label="Remove ${s}"><span class="material-symbols-outlined" style="font-size:16px;">close</span></button>` : ''}
    </span>
  `).join('');

  list.querySelectorAll('.remove-service').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      services.splice(idx, 1);
      renderServices();
    });
  });
}

function renderStaff() {
  const grid = document.getElementById('staff-grid');
  grid.innerHTML = staff.map((s) => `
    <div class="staff-card">
      <div class="staff-avatar">${s.initials}</div>
      <div class="staff-name">${s.name}</div>
      <div class="staff-role">${s.role}</div>
      <button class="btn btn-ghost btn-sm">View profile</button>
    </div>
  `).join('');
}

function setEditMode(on) {
  editMode = on;

  document.getElementById('edit-toggle-btn').style.display = on ? 'none' : 'inline-flex';
  document.getElementById('cancel-btn').style.display = on ? 'inline-flex' : 'none';
  document.getElementById('save-btn').style.display = on ? 'inline-flex' : 'none';

  document.getElementById('clinic-edit-form').style.display = on ? 'block' : 'none';
  document.getElementById('add-service-row').style.display = on ? 'flex' : 'none';
  document.getElementById('clinic-logo').classList.toggle('edit-mode', on);

  renderHours();
  renderServices();
}

function enterEditMode() {
  const logoImg = document.getElementById('clinic-logo-img');

  editSnapshot = {
    hours: JSON.parse(JSON.stringify(hours)),
    services: [...services],
    logoSrc: logoImg.src,
    logoVisible: logoImg.style.display,
    emojiVisible: document.getElementById('clinic-logo-emoji').style.display,
  };

  document.getElementById('edit-name').value = document.getElementById('clinic-name-display').textContent;
  document.getElementById('edit-address').value = document.getElementById('clinic-address-display').textContent;
  document.getElementById('edit-phone').value = document.getElementById('clinic-phone-display').textContent;
  document.getElementById('edit-email').value = document.getElementById('clinic-email-display').textContent;

  setEditMode(true);
}

function cancelEditMode() {
  if (editSnapshot) {
    hours.splice(0, hours.length, ...editSnapshot.hours);
    services.splice(0, services.length, ...editSnapshot.services);

    const logoImg = document.getElementById('clinic-logo-img');
    logoImg.src = editSnapshot.logoSrc;
    logoImg.style.display = editSnapshot.logoVisible;
    document.getElementById('clinic-logo-emoji').style.display = editSnapshot.emojiVisible;

    editSnapshot = null;
  }

  document.getElementById('new-service-input').value = '';
  setEditMode(false);
}

document.getElementById('edit-toggle-btn').addEventListener('click', enterEditMode);

document.getElementById('cancel-btn').addEventListener('click', cancelEditMode);

document.getElementById('save-btn').addEventListener('click', () => {
  document.getElementById('clinic-name-display').textContent = document.getElementById('edit-name').value;
  document.getElementById('clinic-address-display').textContent = document.getElementById('edit-address').value;
  document.getElementById('clinic-phone-display').textContent = document.getElementById('edit-phone').value;
  document.getElementById('clinic-email-display').textContent = document.getElementById('edit-email').value;
  document.getElementById('clinic-manager-display').textContent = document.getElementById('edit-manager').value;

  editSnapshot = null;
  setEditMode(false);
  showToast('Clinic details saved');
});

document.getElementById('add-service-btn').addEventListener('click', () => {
  const input = document.getElementById('new-service-input');
  const value = input.value.trim();
  if (value) {
    services.push(value);
    input.value = '';
    renderServices();
  }
});

document.getElementById('new-service-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('add-service-btn').click();
  }
});

document.getElementById('clinic-logo-edit-btn').addEventListener('click', () => {
  document.getElementById('clinic-logo-input').click();
});

document.getElementById('clinic-logo-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById('clinic-logo-img');
    img.src = reader.result;
    img.style.display = 'block';
    document.getElementById('clinic-logo-emoji').style.display = 'none';
    showToast('Clinic photo updated');
  };
  reader.readAsDataURL(file);
});

renderHours();
renderServices();
renderStaff();
