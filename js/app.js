// Shared app-shell behavior (sidebar, topbar, notifications) — used on every
// screen after login. Mockup only, no backend calls.

function initAppShell() {
  const notifBtn = document.getElementById('notif-btn');
  const notifPanel = document.getElementById('notif-panel');
  const userPill = document.getElementById('user-pill');
  const userMenu = document.getElementById('user-menu');
  const logoutBtn = document.getElementById('logout-btn');

  function closeAllPopovers(except) {
    [notifPanel, userMenu].forEach((panel) => {
      if (panel && panel !== except) panel.classList.remove('show');
    });
  }

  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willShow = !notifPanel.classList.contains('show');
      closeAllPopovers();
      notifPanel.classList.toggle('show', willShow);
    });
  }

  if (userPill && userMenu) {
    userPill.addEventListener('click', (e) => {
      e.stopPropagation();
      const willShow = !userMenu.classList.contains('show');
      closeAllPopovers();
      userMenu.classList.toggle('show', willShow);
    });
  }

  document.addEventListener('click', () => closeAllPopovers());

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', initAppShell);
