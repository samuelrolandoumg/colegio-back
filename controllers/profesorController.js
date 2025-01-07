const Tareas = require('../models/Tareas');
const Grupos = require('../models/Grupos');
const Usuarios = require('../models/Usuarios');
const Clases = require('../models/Clases');
const Entregas = require('../models/Entregas');

const obtenerGruposClasesYtareasPorProfesor = async (req, res) => {
    try {
        const { id_profesor } = req.params;

        // Validar que el usuario sea un profesor
        const profesor = await Usuarios.findByPk(id_profesor, {
            where: { rol: 'Profesor' },
            include: {
                model: Clases,
                include: {
                    model: Grupos,
                    include: [
                        {
                            model: Usuarios,
                            attributes: ['id_usuario', 'nombre'],
                            through: { attributes: [] },
                            include: [
                                {
                                    model: Entregas,
                                    attributes: [
                                        'id_tarea',
                                        'archivo_nombre',
                                        'archivo_url',
                                        'fecha_subida',
                                        'calificado',
                                    ],
                                },
                            ],
                        },
                        {
                            model: Tareas,
                            attributes: [
                                'id_tarea',
                                'titulo',
                                'descripcion',
                                'fecha_entrega',
                                'puntuacion',
                            ],
                        },
                    ],
                },
            },
        });

        if (!profesor) {
            return res.status(404).json({
                message: `El usuario con ID ${id_profesor} no es un profesor o no existe.`,
            });
        }

        // Formatear la respuesta
        const clasesConGrupos = profesor.Clases.map((clase) => ({
            id_clase: clase.id_clase,
            nombre_clase: clase.nombre_clase,
            grupos: clase.Grupos.map((grupo) => ({
                id_grupo: grupo.id_grupo,
                nombre_grupo: grupo.nombre_grupo,
                alumnos: grupo.Usuarios.map((alumno) => ({
                    id_alumno: alumno.id_usuario,
                    nombre_alumno: alumno.nombre,
                    tareas: grupo.Tareas.map((tarea) => {
                        const entrega = alumno.Entregas.find(e => e.id_tarea === tarea.id_tarea);
                        return {
                            id_tarea: tarea.id_tarea,
                            titulo_tarea: tarea.titulo,
                            descripcion_tarea: tarea.descripcion,
                            fecha_entrega: tarea.fecha_entrega,
                            puntuacion: tarea.puntuacion,
                            estado: entrega ? 'entregado' : 'no entregado',
                            fecha_subida: entrega ? entrega.fecha_subida : null,
                            archivo_nombre: entrega ? entrega.archivo_nombre : null,
                            archivo_url: entrega ? entrega.archivo_url : null,
                            calificado: entrega ? entrega.calificado : null,
                        };
                    }),
                })),
            })),
        }));

        res.status(200).json({
            message: 'Grupos, clases y tareas obtenidos exitosamente.',
            clases: clasesConGrupos,
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({
            message: 'Error al obtener los datos.',
            error: error.message,
        });
    }
};


const obtenerGruposPorProfesor = async (req, res) => {
    try {
      const { id_profesor } = req.params;
  
      const grupos = await Grupos.findAll({
        include: [
          {
            model: Clases,
            where: { id_profesor },
            attributes: ['id_clase', 'nombre_clase'],
          },
        ],
        attributes: ['id_grupo', 'nombre_grupo'],
      });
  
      if (!grupos.length) {
        return res.status(404).json({
          message: 'No se encontraron grupos asignados para este profesor.',
        });
      }
  
      res.status(200).json({
        message: 'Grupos obtenidos exitosamente.',
        grupos,
      });
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      res.status(500).json({
        message: 'Error al obtener grupos.',
        error: error.message,
      });
    }
  };
  
// Obtener grupos, clases y alumnos por ID de profesor
const obtenerGruposClasesYAlumnosPorProfesor = async (req, res) => {
    try {
      const { id_profesor } = req.params;
  
      // Validar si el profesor existe
      const profesor = await Usuarios.findOne({ where: { id_usuario: id_profesor, rol: 'Profesor' } });
      if (!profesor) {
        return res.status(404).json({ message: 'El profesor no existe.' });
      }
  
      // Obtener las clases del profesor
      const clases = await Clases.findAll({
        where: { id_profesor },
        include: [
          {
            model: Grupos,
            include: [
              {
                model: Usuarios,
                as: 'Usuarios', // Usar el alias explícito definido en la relación
                attributes: ['id_usuario', 'nombre'],
                through: { attributes: [] }, // Evitar datos extra de la tabla pivote
              },
            ],
          },
        ],
      });
  
      // Formatear la respuesta
      const respuesta = clases.map((clase) => ({
        id_clase: clase.id_clase,
        nombre_clase: clase.nombre_clase,
        grupos: clase.Grupos.map((grupo) => ({
          id_grupo: grupo.id_grupo,
          nombre_grupo: grupo.nombre_grupo,
          alumnos: grupo.Usuarios.map((alumno) => ({
            id_alumno: alumno.id_usuario,
            nombre_alumno: alumno.nombre,
          })),
        })),
      }));
  
      res.status(200).json({
        message: 'Grupos, clases y alumnos obtenidos exitosamente.',
        data: respuesta,
      });
    } catch (error) {
      console.error('Error al obtener grupos, clases y alumnos:', error);
      res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  };
  

  const getGruposClasesAlumnosCalificaciones = async (req, res) => {
    const { id_profesor } = req.params;
  
    try {
      // Obtener las clases del profesor
      const clases = await Clases.findAll({
        where: { id_profesor },
        include: [
          {
            model: Grupos,
            include: [
              {
                model: Usuarios,
                as: 'Usuarios',
                attributes: ['id_usuario', 'nombre'],
                include: [
                  {
                    model: Entregas,
                    attributes: ['punteo'],
                    include: [
                      {
                        model: Tareas,
                        attributes: ['id_tarea', 'id_grupo'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
  
      // Procesar los datos
      const data = clases.map(clase => {
        return {
          id_clase: clase.id_clase,
          nombre_clase: clase.nombre_clase,
          grupos: clase.Grupos.map(grupo => {
            return {
              id_grupo: grupo.id_grupo,
              nombre_grupo: grupo.nombre_grupo,
              alumnos: grupo.Usuarios.map(alumno => {
                const total_puntos = alumno.Entregas.reduce((acc, entrega) => {
                  if (entrega.Tarea.id_grupo === grupo.id_grupo) {
                    return acc + entrega.punteo;
                  }
                  return acc;
                }, 0);
  
                return {
                  id_alumno: alumno.id_usuario,
                  nombre_alumno: alumno.nombre,
                  total_puntos,
                };
              }),
            };
          }),
        };
      });
  
      // Respuesta
      res.status(200).json({
        message: "Grupos, clases, alumnos y calificaciones obtenidos exitosamente.",
        data,
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error.message);
      res.status(500).json({
        message: "Error interno del servidor.",
        errors: error.message,
      });
    }
  };

module.exports = { obtenerGruposClasesYtareasPorProfesor,
    obtenerGruposPorProfesor,
    obtenerGruposClasesYAlumnosPorProfesor,
    getGruposClasesAlumnosCalificaciones
};
