// Login page mock behavior — no real authentication, this is a UI mockup only.

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const togglePasswordBtn = document.getElementById('toggle-password');
const togglePasswordIcon = document.getElementById('toggle-password-icon');
const submitBtn = document.getElementById('submit-btn');
const submitLabel = document.getElementById('submit-label');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const guestBtn = document.getElementById('google-btn');
const forgotLink = document.getElementById('forgot-link');

function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePasswordIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
});

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function goToDashboard() {
  submitLabel.textContent = 'Signing in…';
  submitBtn.disabled = true;
  showToast('Signed in successfully');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 700);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if (!validEmail(emailInput.value.trim())) {
    emailInput.classList.add('invalid');
    emailError.textContent = 'Enter a valid email address';
    valid = false;
  } else {
    emailInput.classList.remove('invalid');
    emailError.textContent = '';
  }

  if (passwordInput.value.length < 6) {
    passwordInput.classList.add('invalid');
    passwordError.textContent = 'Password must be at least 6 characters';
    valid = false;
  } else {
    passwordInput.classList.remove('invalid');
    passwordError.textContent = '';
  }

  if (valid) goToDashboard();
});

guestBtn.addEventListener('click', () => {
  showToast('Continuing as guest…');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 500);
});

forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Password reset link sent (mock)');
});
