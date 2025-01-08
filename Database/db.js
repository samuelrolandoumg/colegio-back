const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE, // Nombre de la base de datos
    process.env.DB_USER,     // Usuario
    process.env.DB_PASSWORD, // Contraseña
    {
        host: process.env.DB_HOST, // Servidor
        dialect: process.env.DB_DIALECT || 'mysql', // Dialecto (asegúrate de que esté definido)
        port: process.env.DB_PORT || 3306, // Puerto (3306 por defecto para MySQL)
        logging: false, // Desactiva los logs de SQL en consola
        dialectOptions: {
            ssl: process.env.DB_DIALECT === 'mysql' ? {
                require: true,
                rejectUnauthorized: false // Permitir conexiones no verificadas
            } : false
        }
    }
);

module.exports = sequelize;

