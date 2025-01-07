const Tareas = require('../models/Tareas');
const Grupos = require('../models/Grupos');
const Usuarios = require('../models/Usuarios');
const Clases = require('../models/Clases');
const Entregas = require('../models/Entregas');

// Get groups and classes associated with a user
const getGroupsAndClassesForUser = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const grupos = await Grupos.findAll({
            include: [
                {
                    model: Clases,
                    attributes: ['id_clase', 'nombre_clase'], // Incluye los atributos de la clase
                },
                {
                    model: Usuarios,
                    where: { id_usuario },
                    through: { attributes: [] }, // Excluye los atributos de la tabla intermedia
                },
            ],
        });

        if (!grupos || grupos.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron grupos o clases asociados al usuario.',
            });
        }

        // Mapeamos los datos para incluir la información de la clase
        const response = grupos.map((grupo) => ({
            id_grupo: grupo.id_grupo,
            nombre_grupo: grupo.nombre_grupo,
            id_alumno: id_usuario,
            clase: grupo.Clase // Aquí se incluye la relación correctamente
                ? {
                    id_clase: grupo.Clase.id_clase,
                    nombre_clase: grupo.Clase.nombre_clase,
                }
                : null,
        }));

        res.status(200).json({
            message: 'Grupos y clases obtenidos exitosamente.',
            grupos: response,
        });
    } catch (error) {
        console.error('Error al obtener grupos y clases:', error);
        res.status(500).json({
            message: 'Error al obtener grupos y clases.',
            error: error.message,
        });
    }
};

const getNotesForUser = async (req, res) => {
    try {
        const { id_grupo, id_clase, id_usuario } = req.params;

        const tareas = await Tareas.findAll({
            where: { id_grupo },
            attributes: ['id_tarea', 'titulo', 'descripcion'],
            include: [
                {
                    model: Entregas,
                    where: { id_alumno: id_usuario },
                    attributes: ['id_entrega', 'punteo', 'id_alumno']
                }
            ]
        });

        const response = tareas.map(tarea => ({
            id_tarea: tarea.id_tarea,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            id_grupo, // Incluimos id_grupo
            id_clase, // Incluimos id_clase
            entregas: tarea.Entregas
        }));

        res.status(200).json({
            message: 'Notas obtenidas exitosamente.',
            notas: response
        });
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({
            message: 'Error al obtener las notas.',
            error: error.message
        });
    }
};

module.exports = { getGroupsAndClassesForUser, getNotesForUser };
