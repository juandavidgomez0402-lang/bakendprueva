// Importamos la librería Express para crear el servidor de forma sencilla.
const express = require('express');
// Importamos la librería Path para manejar rutas de archivos y carpetas.
const path = require('path');

// Creamos una aplicación Express; esta será la base de nuestro servidor.
const app = express();

// Activamos el middleware express.json() para que el servidor entienda datos en formato JSON.
app.use(express.json());

// Indicamos a Express que sirva los archivos estáticos (HTML, CSS, JS) que se encuentran en la carpeta "frontend".
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Definimos el puerto en el que el servidor escuchará las peticiones (5000 en este caso).
const PORT = 5000;

// Configuramos la ruta principal " / " para entregar el archivo HTML de la interfaz.
app.get('/', (req, res) => {
  // Enviamos el archivo index.html ubicado en la carpeta frontend para mostrar el login en el navegador.
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// (Actualmente no definimos rutas adicionales: el backend solo entrega la app de login.)

// Iniciamos el servidor para que comience a escuchar en el puerto indicado y mostramos un mensaje en la consola cuando esté listo.
app.listen(PORT, () => {
  // Este mensaje aparece en la consola para confirmar que el servidor ya está funcionando.
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
