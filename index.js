const express = require('express');
require("dotenv").config();
const app = express();
const { DB_PORT } = process.env;

const sequelize = require('./config/database'); // Asegúrate de que esta ruta sea correcta
const User = require('./models/modelPrueba'); // Asegúrate de que esta ruta sea correcta

sequelize.sync({force: true}).then(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar el modelo con la base de datos (crear tablas si no existen)
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
});

app.get('/', (req, res) => {
  res.send('¡Hola, este es un proyecto con Express y Sequelize!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${DB_PORT}`);
});