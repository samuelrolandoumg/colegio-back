const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const Entregas = require('../models/Entregas');
require('dotenv').config();

// Configuración de Multer con Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'entregas', // Carpeta en Cloudinary
        resource_type: 'auto', // Para permitir PDF, Word, etc.
        allowed_formats: ['pdf', 'doc', 'docx'],
    },
});

const upload = multer({ storage: storage });

const subirArchivo = async (req, res) => {
    try {
        const { id_tarea, id_alumno } = req.body;

        if (!id_tarea || !id_alumno) {
            return res.status(400).json({ message: 'id_tarea e id_alumno son obligatorios.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No se recibió ningún archivo.' });
        }

        // Obtener la última versión de la tarea para este alumno
        const ultimaEntrega = await Entregas.findOne({
            where: { id_tarea, id_alumno },
            order: [['version', 'DESC']],
        });

        const nuevaVersion = ultimaEntrega ? ultimaEntrega.version + 1 : 1;

        // Guardar la entrega en la base de datos
        const nuevaEntrega = await Entregas.create({
            id_tarea,
            id_alumno,
            archivo_url: req.file.path,
            archivo_nombre: req.file.originalname,
            archivo_tipo: req.file.mimetype,
            version: nuevaVersion,
            fecha_subida: new Date(), // Establecer manualmente la fecha
            calificado: false, // Establecer el valor por defecto manualmente
        });

        res.status(200).json({
            message: 'Archivo subido y guardado exitosamente.',
            entrega: {
                id_tarea: nuevaEntrega.id_tarea,
                id_alumno: nuevaEntrega.id_alumno,
                archivo_url: nuevaEntrega.archivo_url,
                archivo_nombre: nuevaEntrega.archivo_nombre,
                archivo_tipo: nuevaEntrega.archivo_tipo,
                version: nuevaEntrega.version,
                fecha_subida: nuevaEntrega.fecha_subida,
                calificado: nuevaEntrega.calificado,
            },
        });
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({ message: 'Error al subir el archivo.', error: error.message });
    }
};

module.exports = { subirArchivo, upload };
