// Importamos Firebase y reutilizamos la misma configuración que en el login.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// Inicializamos Firebase para esta página del dashboard.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmail = document.getElementById('userEmail');
const statusText = document.getElementById('status');
const logoutBtn = document.getElementById('logoutBtn');

function updateStatus(message, type = 'info') {
  statusText.textContent = message;
  statusText.className = `status status--${type}`;
}

// Verificamos si existe un usuario autenticado cuando se carga el dashboard.
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = user.email;
    updateStatus('Sesión activa. Disfruta del dashboard.', 'success');
  } else {
    updateStatus('No hay sesión activa, redirigiendo...', 'error');
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  }
});

// Permitimos cerrar sesión desde el botón dedicado.
logoutBtn.addEventListener('click', async () => {
  updateStatus('Cerrando sesión...', 'info');
  try {
    await signOut(auth);
    updateStatus('Sesión cerrada. Volviendo al login...', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  } catch (error) {
    updateStatus(`No se pudo cerrar sesión: ${error.message}`, 'error');
  }
});
