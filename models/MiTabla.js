const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const MiTabla = sequelize.define('MiTabla',{
    id_version: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    clase: {
        type: DataTypes.STRING(50), // Columna VARCHAR(50)
        allowNull: false,
      },     
}, {
    tableName: 'MiTabla', // Nombre explícito de la tabla en la BD
    timestamps: false,    // No se usarán createdAt ni updatedAt
  });

  module.exports = MiTabla;