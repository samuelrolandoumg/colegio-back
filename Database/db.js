const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { 
    DB_HOST: process.env.DB_HOST,
    dialect: "mysql",
    DB_PORT: process.env.DB_PORT || 3306, // Puerto (Railway lo define)
    logging: false,
    dialectOptions: 'mysql' ? {
      options: {
        encrypt: false, // Cambiar a true si usas Azure o conexiones remotas
        trustServerCertificate: true, // Requerido para conexiones locales
      },
    } : {},
  }
);

module.exports = sequelize;
