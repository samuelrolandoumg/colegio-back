const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');
require('dotenv').config();

const login = async (req, res) => {
    const {correo, password} = req.body;
    try {
        // Verificar si el usuario existe
        const usuario = await Usuarios.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar password (simple, sin hashing de momento)
        if (usuario.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, rol: usuario.rol }, // Datos dentro del token
            process.env.JWT_SECRET, // Clave secreta
            { expiresIn: '1h' } // Duración del token
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { login };

