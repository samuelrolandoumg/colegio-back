const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const Tareas = sequelize.define(
  'Tareas',
  {
    id_tarea: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    puntuacion: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['pdf', 'word']],
      },
    },
    archivo_nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    archivo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Grupos',
        key: 'id_grupo',
      },
    },
  },
  {
    tableName: 'Tareas',
    timestamps: false,
  }
);

module.exports = Tareas;
