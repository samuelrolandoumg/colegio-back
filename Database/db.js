// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE, // Base de datos
//   process.env.DB_USER,     // Usuario
//   process.env.DB_PASSWORD, // Contraseña
//   {
//     host: process.env.DB_SERVER, // Servidor
//     port: process.env.DB_PORT,   // Puerto
//     dialect: "mysql", // Dialecto
//     dialectOptions: {
//       ssl: {
//         require: true, // Opcional: Si Railway requiere SSL
//         rejectUnauthorized: false, // Ignora certificados no autorizados
//       },
//     },
//   }
// );

// module.exports = sequelize;


const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuarios = require("../models/Usuarios.js")(sequelize, Sequelize);