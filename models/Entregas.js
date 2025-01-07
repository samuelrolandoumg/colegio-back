const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db.js');

const Entregas = sequelize.define('Entregas', {
    id_entrega: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_alumno: {
        type: DataTypes.STRING(50), // Referencia al id_usuario
        allowNull: false,
    },
    archivo_url: {
        type: DataTypes.STRING(255), // URL del archivo en la nube
        allowNull: false,
    },
    archivo_nombre: {
        type: DataTypes.STRING(255), // Nombre original del archivo
        allowNull: false,
    },
    archivo_tipo: {
        type: DataTypes.STRING(50), // Tipo de archivo (PDF, DOCX, etc.)
        allowNull: false,
    },
    fecha_subida: {
        type: DataTypes.DATE, // No se establece un valor predeterminado aquí
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    calificado: {
        type: DataTypes.BOOLEAN, // Sin valor predeterminado, se maneja en el controlador
    },
    punteo: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puedes ponerlo como false si siempre es obligatorio
    },
    comentarios_profesor: {
        type: DataTypes.TEXT, 
        allowNull: true,
    },
}, {
    tableName: 'Entregas', 
    timestamps: false, 
});

module.exports = Entregas;
