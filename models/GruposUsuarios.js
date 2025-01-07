const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const GruposUsuarios = sequelize.define('GruposUsuarios', {
    id_grupo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Grupos',
            key: 'id_grupo',
        },
    },
    id_usuario: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        references: {
            model: 'Usuarios',
            key: 'id_usuario',
        },
    },
}, {
    tableName: 'GruposUsuarios',
    timestamps: false,
});

module.exports = GruposUsuarios;
