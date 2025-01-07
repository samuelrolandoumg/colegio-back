const Tareas = require('../models/Tareas');
const Grupos = require('../models/Grupos');
const Usuarios = require('../models/Usuarios');
const Clases = require('../models/Clases');
const Entregas = require('../models/Entregas');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
require('dotenv').config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'DocumentoSoporte',
    resource_type: 'auto',
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});

const upload = multer({ storage: storage });

// Crear una nueva tarea con archivo adjunto
const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, puntuacion, fecha_entrega, tipo_documento, id_grupo } = req.body;

    // Validar que el grupo exista
    const grupo = await Grupos.findByPk(id_grupo, {
      include: [
        {
          model: Usuarios,
          through: { attributes: [] },
          where: { rol: 'Alumno' },
        },
      ],
    });

    if (!grupo) {
      return res.status(400).json({ message: `El grupo con ID ${id_grupo} no existe o no tiene alumnos.` });
    }

    // Manejar archivo adjunto
    let archivo_nombre = null;
    let archivo_url = null;

    if (req.file) {
      archivo_nombre = req.file.originalname;
      archivo_url = req.file.path;
    }

    // Crear la tarea
    const nuevaTarea = await Tareas.create({
      titulo,
      descripcion,
      puntuacion,
      fecha_entrega,
      tipo_documento,
      archivo_nombre,
      archivo_url,
      id_grupo,
    });

    res.status(201).json({
      message: 'Tarea creada exitosamente.',
      tarea: nuevaTarea,
    });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea.', error: error.message });
  }
};

// Obtener tareas por grupo
const obtenerTareasPorGrupo = async (req, res) => {
  try {
    const { id_grupo } = req.params;

    // Validar que el grupo exista
    const grupo = await Grupos.findByPk(id_grupo);
    if (!grupo) {
      return res.status(400).json({ message: `El grupo con ID ${id_grupo} no existe.` });
    }

    // Obtener tareas del grupo
    const tareas = await Tareas.findAll({ where: { id_grupo } });

    res.status(200).json({
      message: 'Tareas obtenidas exitosamente.',
      tareas,
    });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas.', error: error.message });
  }
};

// Obtener tareas pendientes por usuario
const obtenerTareasPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Buscar los grupos asociados al usuario
    const grupos = await Usuarios.findByPk(id_usuario, {
      include: {
        model: Grupos,
        attributes: ['id_grupo', 'nombre_grupo'],
        include: {
          model: Clases,
          attributes: ['nombre_clase'],
        },
      },
    });

    if (!grupos) {
      return res.status(404).json({ message: 'El usuario no pertenece a ningún grupo.' });
    }

    // Obtener las tareas de los grupos del usuario
    const tareas = await Tareas.findAll({
      where: {
        id_grupo: grupos.Grupos.map((grupo) => grupo.id_grupo),
      },
      include: {
        model: Grupos,
        attributes: ['nombre_grupo'],
        include: {
          model: Clases,
          attributes: ['nombre_clase'],
        },
      },
    });

    // Filtrar las tareas que ya han sido entregadas por el usuario
    const tareasPendientes = [];
    for (const tarea of tareas) {
      const entrega = await Entregas.findOne({
        where: {
          id_tarea: tarea.id_tarea,
          id_alumno: id_usuario,
        },
      });

      if (!entrega) {
        tareasPendientes.push(tarea);
      }
    }

    // Formatear la respuesta para incluir el nombre del grupo y la clase
    const tareasFormateadas = tareasPendientes.map((tarea) => ({
      id_tarea: tarea.id_tarea,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      puntuacion: tarea.puntuacion,
      fecha_entrega: tarea.fecha_entrega,
      tipo_documento: tarea.tipo_documento,
      nombre_grupo: tarea.Grupo.nombre_grupo,
      nombre_clase: tarea.Grupo.Clase.nombre_clase,
      archivo_nombre: tarea.archivo_nombre,
      archivo_url: tarea.archivo_url
    }));

    res.status(200).json({
      message: 'Tareas pendientes obtenidas exitosamente.',
      tareas: tareasFormateadas,
    });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas.', error: error.message });
  }
};


const obtenerEntregaPorId = async (req, res) => {
  try {
    const { id_tarea, id_entrega } = req.params;

    const entrega = await Entregas.findOne({
      where: { id_tarea, id_entrega },
      attributes: ['id_entrega', 'archivo_nombre', 'archivo_url', 'calificado', 'fecha_subida', 'id_tarea', 'id_alumno', 'punteo'],
      include: [
        {
          model: Tareas,
          attributes: ['titulo', 'descripcion', 'puntuacion', 'fecha_entrega', 'tipo_documento', 'id_grupo'],
          include: [
            {
              model: Grupos,
              attributes: ['nombre_grupo', 'id_clase'],
              include: [
                {
                  model: Clases,
                  attributes: ['nombre_clase', 'id_profesor'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!entrega) {
      return res.status(404).json({ message: 'Entrega no encontrada.' });
    }

    res.status(200).json({
      message: 'Entrega obtenida exitosamente.',
      entrega,
    });
  } catch (error) {
    console.error('Error al obtener la entrega:', error);
    res.status(500).json({
      message: 'Error al obtener la entrega.',
      error: error.message,
    });
  }
};

module.exports = { crearTarea, upload, obtenerTareasPorGrupo, obtenerTareasPorUsuario, obtenerEntregaPorId };