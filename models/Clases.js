const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const Clases = sequelize.define(
    'Clases',
    {
        id_clase: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre_clase: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        id_profesor: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'Clases',
        timestamps: false,
    }
);

module.exports = Clases;
