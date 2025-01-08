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
  {
    host: dbConfig.host,
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
// db.Clases = require("../models/Clases.js")(sequelize, Sequelize);
// db.Grupos = require("../models/Grupos.js")(sequelize, Sequelize);
// db.Tareas = require("../models/Tareas.js")(sequelize, Sequelize);
// db.Entregas = require("../models/Entregas.js")(sequelize, Sequelize);


// // Relación Clases - Usuarios (Profesor) (1:N)
// Usuarios.hasMany(Clases, { foreignKey: 'id_profesor' });
// Clases.belongsTo(Usuarios, { foreignKey: 'id_profesor' });

// // Relación Clases -> Grupos (1:N)
// Clases.hasMany(Grupos, { foreignKey: 'id_clase' });
// Grupos.belongsTo(Clases, { foreignKey: 'id_clase' });

// // Relación Grupos -> Usuarios (N:M)
// Grupos.belongsToMany(Usuarios, { through: 'GruposUsuarios', foreignKey: 'id_grupo' });
// Usuarios.belongsToMany(Grupos, { through: 'GruposUsuarios', foreignKey: 'id_usuario' });


// // Relación Grupos -> Usuarios (N:M) con alias explícito
// // Grupos.belongsToMany(Usuarios, { through: 'GruposUsuarios', foreignKey: 'id_grupo', as: 'Usuarios' });
// // Usuarios.belongsToMany(Grupos, { through: 'GruposUsuarios', foreignKey: 'id_usuario', as: 'Grupos' });

// // Relación Grupos -> Tareas (1:N)
// Grupos.hasMany(Tareas, { foreignKey: 'id_grupo' });
// Tareas.belongsTo(Grupos, { foreignKey: 'id_grupo' });

// // Relación Usuarios (Alumno) -> Entregas (1:N)
// Usuarios.hasMany(Entregas, { foreignKey: 'id_alumno' });
// Entregas.belongsTo(Usuarios, { foreignKey: 'id_alumno' });

// // Relación Tareas -> Entregas (1:N)
// Tareas.hasMany(Entregas, { foreignKey: 'id_tarea' });
// Entregas.belongsTo(Tareas, { foreignKey: 'id_tarea' });

module.exports = sequelize;