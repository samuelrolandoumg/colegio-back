// const { DataTypes } = require('sequelize');
// const sequelize = require('../Database/db.js');

//const Usuarios = sequelize.define('Usuarios', {
module.exports = (sequelize, Sequelize) => {
const Usuarios = sequelize.define('Usuarios', {
    id_usuario: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    correo: {
        type: Sequelize.STRING(100),
//        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    rol: {
        type: Sequelize.STRING(50), // Cambiado de ENUM a STRING
        allowNull: false,
        validate: {
            isIn: [['Alumno', 'Profesor', 'Admin']], // Validación a nivel de Sequelize
        }, 
    },
    estado: {
        type: Sequelize.BOOLEAN,
    },
}, {
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = Usuarios;

};