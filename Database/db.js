const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
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

