const Clases = require('../models/Clases');
const Usuarios = require('../models/Usuarios');

// Crear una nueva clase
const crearClase = async (req, res) => {
    try {
        const { nombre_clase, descripcion, id_profesor } = req.body;

        // Verificar si el usuario es un profesor
        const profesor = await Usuarios.findOne({
            where: { id_usuario: id_profesor, rol: 'Profesor' },
        });

        if (!profesor) {
            return res.status(400).json({ message: 'El usuario no es un profesor válido.' });
        }

        const nuevaClase = await Clases.create({
            nombre_clase,
            descripcion,
            id_profesor,
        });

        res.status(201).json({
            message: 'Clase creada exitosamente.',
            data: nuevaClase,
        });
    } catch (error) {
        console.error('Error al crear la clase:', error);
        res.status(500).json({ message: 'Error al crear la clase.', error: error.message });
    }
};

// Obtener todas las clases de un profesor
const obtenerClasesPorProfesor = async (req, res) => {
    try {
        const { id_profesor } = req.params;

        const clases = await Clases.findAll({
            where: { id_profesor },
        });

        res.status(200).json({
            message: 'Clases obtenidas exitosamente.',
            data: clases,
        });
    } catch (error) {
        console.error('Error al obtener las clases:', error);
        res.status(500).json({ message: 'Error al obtener las clases.', error: error.message });
    }
};

module.exports = { crearClase, obtenerClasesPorProfesor };
