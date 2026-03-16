// Importamos las funciones necesarias desde el SDK modular de Firebase alojado en la CDN.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
// Importamos la configuración compartida para evitar repetir credenciales.
import { firebaseConfig } from './firebase-config.js';

// Inicializamos la app de Firebase con la configuración proporcionada.
const app = initializeApp(firebaseConfig);
// Obtenemos el servicio de autenticación para realizar el login por correo/contraseña.
const auth = getAuth(app);

// Seleccionamos elementos del DOM para leer los datos del formulario y mostrar mensajes.
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const statusText = document.getElementById('status');

// Función auxiliar para mostrar mensajes al usuario con estilos.
function updateStatus(message, type = 'info') {
  statusText.textContent = message;
  statusText.className = `status status--${type}`;
}

// Escuchamos el evento submit del formulario para iniciar sesión con Firebase Authentication.
loginForm.addEventListener('submit', async (event) => {
  // Evitamos que la página se recargue al enviar el formulario.
  event.preventDefault();
  // Obtenemos los valores ingresados por la persona usuaria.
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Mostramos un mensaje temporal mientras intentamos autenticar.
  updateStatus('Conectando con Firebase...', 'info');

  try {
    // Llamamos a Firebase para iniciar sesión con correo y contraseña.
    await signInWithEmailAndPassword(auth, email, password);
    // Si todo va bien, mostramos un mensaje de éxito.
    updateStatus('Inicio de sesión exitoso. ¡Bienvenido!', 'success');
    // Redirigimos al dashboard para mostrar contenido después del login.
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 800);
  } catch (error) {
    // Si ocurre un error (credenciales incorrectas, usuario inexistente, etc.), mostramos el mensaje.
    updateStatus(`Error: ${error.message}`, 'error');
  }
});
