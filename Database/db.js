const { Sequelize } = require('sequelize');
const dbConfig = require('./db.config'); // Ajusta la ruta según tu estructura

const sequelize = new Sequelize(
  dbConfig.database, // Nombre de la base de datos
  dbConfig.username, // Usuario
  dbConfig.password, // Contraseña
  {
    host: dbConfig.host, // Servidor
    dialect: dbConfig.dialect, // Dialecto
    port: dbConfig.port, // Puerto
    pool: dbConfig.pool, // Pool de conexiones
    logging: false, // Desactiva los logs de consultas SQL
    dialectOptions: dbConfig.dialect === 'mysql' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } : {},
  }
);

module.exports = sequelize;
