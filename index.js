
const { conn, sequelize } = require('./config/database')
require("dotenv").config();
const server = require('./config/app');
const { PORT } = process.env;

conn.sync({force: true}).then(async () => {     //aqui se configura si se reinicia la tabla o no, true la reinicia false no
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    // Sincronizar el modelo con la base de datos (crear tablas si no existen)
    //await sequelize.sync({force: false});
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
});



