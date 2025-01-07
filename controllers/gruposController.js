const Grupos = require('../models/Grupos');
const Usuarios = require('../models/Usuarios');
const GruposUsuarios = require('../models/GruposUsuarios');
const Clases = require('../models/Clases');
const Entregas = require('../models/Entregas');
const Tareas = require('../models/Tareas');

// Crear un nuevo grupo
const crearGrupo = async (req, res) => {
  try {
      const { nombre_grupo, id_clase, alumnos } = req.body;

      // Validar que la clase exista
      const clase = await Clases.findByPk(id_clase);
      if (!clase) {
          return res.status(400).json({
              message: `La clase con id_clase ${id_clase} no existe.`,
          });
      }

      // Verificar que todos los alumnos existan y sean del rol correcto
      const alumnosValidos = await Usuarios.findAll({
          where: {
              id_usuario: alumnos,
              rol: 'Alumno',
          },
      });

      if (alumnosValidos.length !== alumnos.length) {
          return res.status(400).json({
              message: 'Algunos alumnos no son válidos o no existen.',
          });
      }

      // Crear el grupo
      const nuevoGrupo = await Grupos.create({ nombre_grupo, id_clase });

      // Asociar los alumnos al grupo
// Asociar los alumnos al grupo
await Promise.all(
  alumnosValidos.map(async (alumno) => {
    await GruposUsuarios.create({
      id_grupo: nuevoGrupo.id_grupo,
      id_usuario: alumno.id_usuario,
    });
  })
);

      res.status(201).json({
          message: 'Grupo creado exitosamente.',
          grupo: nuevoGrupo,
      });
  } catch (error) {
      console.error('Error al crear el grupo:', error);
      res.status(500).json({ message: 'Error al crear el grupo.', error: error.message });
  }
};

// Consultar grupos por clase
const obtenerGruposPorClase = async (req, res) => {
    try {
        const { id_clase } = req.params;

        const grupos = await Grupos.findAll({
            where: { id_clase },
            include: [
                {
                    model: Usuarios,
                    through: { attributes: [] }, // Evitar campos extra de la tabla pivote
                    attributes: ['id_usuario', 'nombre', 'correo', 'rol'], // Solo los campos que necesitas
                },
            ],
        });

        if (!grupos || grupos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron grupos para esta clase.' });
        }

        res.status(200).json({
            message: 'Grupos obtenidos exitosamente.',
            grupos,
        });
    } catch (error) {
        console.error('Error al obtener los grupos:', error);
        res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

const agregarAlumnosAGrupo = async (req, res) => {
    try {
        const { id_grupo, alumnos } = req.body;

        // Verificar si el grupo existe
        const grupo = await Grupos.findByPk(id_grupo);
        if (!grupo) {
            return res.status(404).json({ message: 'El grupo no existe.' });
        }

        // Verificar que todos los alumnos existan y sean del rol correcto
        const alumnosValidos = await Usuarios.findAll({
            where: {
                id_usuario: alumnos,
                rol: 'Alumno',
            },
        });

        if (alumnosValidos.length !== alumnos.length) {
            return res.status(400).json({
                message: 'Algunos alumnos no son válidos o no existen.',
            });
        }

        // Verificar si ya existen asociaciones entre el grupo y los alumnos
        const existentes = await GruposUsuarios.findAll({
            where: {
                id_grupo,
                id_usuario: alumnos,
            },
        });

        // Filtrar alumnos que ya están en el grupo
        const alumnosNoDuplicados = alumnos.filter((id) =>
            !existentes.some((existente) => existente.id_usuario === id)
        );

        if (alumnosNoDuplicados.length === 0) {
            return res.status(400).json({
                message: 'Todos los alumnos seleccionados ya están en el grupo.',
            });
        }

        // Asociar los nuevos alumnos al grupo
        const valoresIntermedios = alumnosNoDuplicados.map((id_usuario) => ({
            id_grupo,
            id_usuario,
        }));

        await GruposUsuarios.bulkCreate(valoresIntermedios);

        res.status(200).json({
            message: 'Alumnos agregados al grupo exitosamente.',
            alumnosAgregados: alumnosNoDuplicados,
        });
    } catch (error) {
        console.error('Error al agregar alumnos al grupo:', error);
        res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};


const obtenerTareasPorGrupoYClase = async (req, res) => {
  try {
      const { id_grupo, id_clase } = req.params;

      // Validar que el grupo esté asociado a la clase
      const grupo = await Grupos.findOne({
          where: { id_grupo },
          include: [
              {
                  model: Clases,
                  where: { id_clase },
                  attributes: ['id_clase', 'nombre_clase'],
              },
              {
                  model: Usuarios, // Obtener todos los alumnos del grupo
                  attributes: ['id_usuario', 'nombre'],
                  through: { attributes: [] }, // Evitar datos extra de la tabla pivote
              },
          ],
      });

      if (!grupo) {
          return res.status(404).json({
              message: `El grupo con ID ${id_grupo} no está asociado a la clase con ID ${id_clase}.`,
          });
      }

      // Obtener las tareas del grupo
      const tareas = await Tareas.findAll({
          where: { id_grupo },
          include: [
              {
                  model: Entregas,
                  include: {
                      model: Usuarios,
                      attributes: ['id_usuario', 'nombre'],
                  },
                  attributes: [
                      'id_entrega',
                      'archivo_nombre',
                      'archivo_url',
                      'fecha_subida',
                      'calificado',
                  ],
              },
          ],
      });

      // Crear la respuesta combinando alumnos que no han entregado
      const respuestaTareas = tareas.map((tarea) => {
          const entregas = tarea.Entregas || [];

          // Alumnos que han entregado
          const entregados = entregas.map((entrega) => ({
              id_usuario: entrega.Usuario.id_usuario,
              nombre: entrega.Usuario.nombre,
              entregado: true,
              archivo_nombre: entrega.archivo_nombre,
              archivo_url: entrega.archivo_url,
              fecha_subida: entrega.fecha_subida,
              calificado: entrega.calificado,
              id_entrega: entrega.id_entrega
          }));

          // Alumnos que no han entregado
          const noEntregados = grupo.Usuarios.filter(
              (alumno) =>
                  !entregados.some(
                      (entregado) => entregado.id_usuario === alumno.id_usuario
                  )
          ).map((alumno) => ({
              id_usuario: alumno.id_usuario,
              nombre: alumno.nombre,
              entregado: false,
          }));

          return {
              id_tarea: tarea.id_tarea,
              titulo: tarea.titulo,
              descripcion: tarea.descripcion,
              puntuacion: tarea.puntuacion,
              fecha_entrega: tarea.fecha_entrega,
              id_entrega: tarea.id_entrega,
              alumnos: [...entregados, ...noEntregados],
          };
      });

      res.status(200).json({
          message: 'Tareas obtenidas exitosamente.',
          tareas: respuestaTareas,
      });
  } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({
          message: 'Error al obtener tareas.',
          error: error.message,
      });
  }
};


module.exports = { crearGrupo, obtenerGruposPorClase, agregarAlumnosAGrupo, obtenerTareasPorGrupoYClase };
