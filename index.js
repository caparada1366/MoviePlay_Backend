const express = require('express');
const app = express();
const PORT = 3001;

const sequelize = require('./config/database'); // Asegúrate de que esta ruta sea correcta
const User = require('./models/modelPrueba'); // Asegúrate de que esta ruta sea correcta

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar el modelo con la base de datos (crear tablas si no existen)
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
})();

app.get('/', (req, res) => {
  res.send('¡Hola, este es un proyecto con Express y Sequelize!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});