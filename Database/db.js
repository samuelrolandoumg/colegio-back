const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { 
    host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 3306, // Puerto (Railway lo define)
    logging: false,
    dialectOptions: process.env.DB_DIALECT === 'mysql' ? {
      options: {
        encrypt: false, // Cambiar a true si usas Azure o conexiones remotas
        trustServerCertificate: true, // Requerido para conexiones locales
      },
    } : {},
  }
);

module.exports = sequelize;
