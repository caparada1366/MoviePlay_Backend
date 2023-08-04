const { conn, sequelize } = require("./config/database");
require("dotenv").config();
const server = require("./config/app");
const { PORT } = process.env;
const routes = require("./Routes/index");

conn.sync({ force: false }).then(async () => {
  //aqui se configura si se reinicia la tabla o no
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    // Sincronizar el modelo con la base de datos (crear tablas si no existen)
    await sequelize.sync({ force: false });
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error(
      "Error al conectar y sincronizar con la base de datos:",
      error
    );
  }
});

// app.get('/', (req, res) => {
//   res.send('¡Hola, este es un proyecto con Express y Sequelize!!!!');
// });
