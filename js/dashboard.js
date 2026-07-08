// Dashboard mock data + interactions.

const appointments = [
  { pet: '🐶', name: 'Max', owner: 'James Carter', doctor: 'Dr. Sarah Miles', time: '09:00 AM', status: 'Confirmed', statusType: 'success' },
  { pet: '🐱', name: 'Luna', owner: 'Emily Hughes', doctor: 'Dr. Alan Ford', time: '09:30 AM', status: 'Checked in', statusType: 'info' },
  { pet: '🐶', name: 'Rocky', owner: 'Priya Nair', doctor: 'Dr. Sarah Miles', time: '10:15 AM', status: 'Waiting', statusType: 'warning' },
  { pet: '🐰', name: 'Coco', owner: 'Tom Bennett', doctor: 'Dr. Wei Zhang', time: '11:00 AM', status: 'Confirmed', statusType: 'success' },
  { pet: '🐱', name: 'Bella', owner: 'Sofia Ramirez', doctor: 'Dr. Alan Ford', time: '11:45 AM', status: 'Cancelled', statusType: 'danger' },
];

const patients = [
  { pet: '🐶', name: 'Max', species: 'Dog · Labrador', owner: 'James Carter', lastVisit: '02/07/2026', nextDue: '15/07/2026' },
  { pet: '🐱', name: 'Luna', species: 'Cat · Siamese', owner: 'Emily Hughes', lastVisit: '28/06/2026', nextDue: '10/09/2026' },
  { pet: '🐶', name: 'Rocky', species: 'Dog · Beagle', owner: 'Priya Nair', lastVisit: '30/06/2026', nextDue: '20/07/2026' },
  { pet: '🐹', name: 'Nibbles', species: 'Hamster', owner: 'Diego Lopez', lastVisit: '25/06/2026', nextDue: '—' },
  { pet: '🐰', name: 'Coco', species: 'Rabbit', owner: 'Tom Bennett', lastVisit: '18/06/2026', nextDue: '18/12/2026' },
];

function renderAppointments() {
  const tbody = document.getElementById('appointments-body');
  tbody.innerHTML = appointments.map((a) => `
    <tr>
      <td>
        <div class="pet-cell">
          <div class="pet-avatar">${a.pet}</div>
          <span class="cell-primary">${a.name}</span>
        </div>
      </td>
      <td class="cell-muted">${a.owner}</td>
      <td class="cell-muted">${a.doctor}</td>
      <td class="cell-muted">${a.time}</td>
      <td><span class="badge badge-${a.statusType}">${a.status}</span></td>
    </tr>
  `).join('');
}

function renderPatients() {
  const tbody = document.getElementById('patients-body');
  tbody.innerHTML = patients.map((p) => `
    <tr>
      <td>
        <div class="pet-cell">
          <div class="pet-avatar">${p.pet}</div>
          <span class="cell-primary">${p.name}</span>
        </div>
      </td>
      <td class="cell-muted">${p.species}</td>
      <td class="cell-muted">${p.owner}</td>
      <td class="cell-muted">${p.lastVisit}</td>
      <td class="cell-muted">${p.nextDue}</td>
      <td>
        <button class="btn btn-ghost btn-sm">View</button>
      </td>
    </tr>
  `).join('');
}

renderAppointments();
renderPatients();
