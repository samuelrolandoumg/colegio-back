const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Base de datos
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_SERVER, // Servidor
    port: process.env.DB_PORT,   // Puerto
    dialect: "mysql", // Dialecto
    dialectOptions: {
      ssl: {
        require: true, // Opcional: Si Railway requiere SSL
        rejectUnauthorized: false, // Ignora certificados no autorizados
      },
    },
  }
);

module.exports = sequelize;
