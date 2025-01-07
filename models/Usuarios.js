const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const Usuarios = sequelize.define('Usuarios', {
    id_usuario: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
//        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING(50), // Cambiado de ENUM a STRING
        allowNull: false,
        validate: {
            isIn: [['Alumno', 'Profesor', 'Admin']], // Validación a nivel de Sequelize
        }, 
    },
    estado: {
        type: DataTypes.BOOLEAN,
    },
}, {
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = Usuarios;

