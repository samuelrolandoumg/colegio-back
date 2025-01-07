const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const Grupos = sequelize.define('Grupos', {
    id_grupo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_grupo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_clase: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Grupos',
    timestamps: false,
});

module.exports = Grupos;
