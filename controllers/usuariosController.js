const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize'); // Asegúrate de agregar esta línea

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { id_usuario, nombre, correo, password, rol } = req.body;

        // Validar campos requeridos
        if (!id_usuario || !nombre || !correo || !password || !rol) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios: id_usuario, nombre, correo, password, rol.',
            });
        }

        // Validar rol
        if (!['Alumno', 'Profesor', 'Admin'].includes(rol)) {
            return res.status(400).json({
                message: 'El rol debe ser uno de los siguientes: Alumno, Profesor, Admin.',
            });
        }

        // Crear usuario con estado predeterminado (true)
        const nuevoUsuario = await Usuarios.create({
            id_usuario,
            nombre,
            correo,
            password,
            rol,
            estado: true, // Aquí se setea el estado como `true`
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente.',
            usuario: nuevoUsuario,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear el usuario.',
            error: error.message,
        });
    }
};

// Obtener usuarios con rol "Alumno"
const obtenerAlumnos = async (req, res) => {
    try {
      const alumnos = await Usuarios.findAll({
        where: { rol: 'Alumno' },
        attributes: ['id_usuario', 'nombre', 'correo'], // Incluye solo los atributos necesarios
      });
  
      if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({
          message: 'No se encontraron alumnos.',
        });
      }
  
      res.status(200).json({
        message: 'Alumnos obtenidos exitosamente.',
        usuarios: alumnos,
      });
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      res.status(500).json({
        message: 'Error al obtener alumnos.',
        error: error.message,
      });
    }
  };
  
// Listar todos los usuarios con rol "Profesor"
const listarProfesores = async (req, res) => {
  try {
    const profesores = await Usuarios.findAll({
      where: { rol: 'Profesor' },
      attributes: ['id_usuario', 'nombre', 'correo'], // Atributos específicos para retornar
    });

    if (profesores.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron profesores.',
      });
    }

    res.status(200).json({
      message: 'Profesores obtenidos exitosamente.',
      profesores,
    });
  } catch (error) {
    console.error('Error al listar los profesores:', error);
    res.status(500).json({
      message: 'Error al listar los profesores.',
      error: error.message,
    });
  }
};

const obtenerUltimoIdUsuario = async (req, res) => {
  try {
    const { prefijo } = req.params;

    // Busca el último ID de usuario que comienza con el prefijo
    const ultimoUsuario = await Usuarios.findOne({
      where: {
        id_usuario: {
          [Op.like]: `${prefijo}-%`
        }
      },
      order: [['id_usuario', 'DESC']],
    });

    let ultimoId = 0;

    if (ultimoUsuario) {
      const partes = ultimoUsuario.id_usuario.split('-');
      ultimoId = parseInt(partes[2]); // Obtiene el número incremental
    }

    res.status(200).json({ ultimoId });
  } catch (error) {
    console.error('Error al obtener el último ID de usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { crearUsuario, obtenerAlumnos, listarProfesores, obtenerUltimoIdUsuario };
