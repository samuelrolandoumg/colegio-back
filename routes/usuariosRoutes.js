const express = require('express');
const { crearUsuario, obtenerAlumnos, listarProfesores, obtenerUltimoIdUsuario } = require('../controllers/usuariosController');

const router = express.Router();

/**
 * @swagger
 * /api/usuarios/crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Permite crear un nuevo usuario en el sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: string
 *                 description: Identificador único del usuario.
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *               correo:
 *                 type: string
 *                 description: Correo del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (Alumno, Profesor, Admin).
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 */
router.post('/crear', crearUsuario);



/**
 * @swagger
 * /api/usuarios/alumnos:
 *   get:
 *     summary: Obtiene todos los usuarios con rol de Alumno.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios con rol Alumno obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       correo:
 *                         type: string
 *       404:
 *         description: No se encontraron alumnos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/alumnos', obtenerAlumnos);

/**
 * @swagger
 * /api/usuarios/profesores:
 *   get:
 *     summary: Obtiene todos los usuarios con rol de Profesor.
 *     description: Retorna una lista de todos los profesores registrados.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profesores obtenidos exitosamente.
 *                 profesores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                         example: PROF12345
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       correo:
 *                         type: string
 *                         example: juan.perez@example.com
 *       404:
 *         description: No se encontraron profesores.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/profesores', listarProfesores);

/**
 * @swagger
 * /api/usuarios/{prefijo}:
 *   get:
 *     summary: Obtener el último ID de usuario basado en el prefijo.
 *     description: Devuelve el último ID de usuario registrado para un prefijo dado (10 para Alumno, 20 para Profesor, 30 para Admin).
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: prefijo
 *         required: true
 *         schema:
 *           type: string
 *         description: Prefijo del ID (10 para Alumno, 20 para Profesor, 30 para Admin).
 *         example: "10"
 *     responses:
 *       200:
 *         description: Último ID obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ultimoId:
 *                   type: integer
 *                   description: Último número incremental registrado para el prefijo dado.
 *                   example: 5
 *       400:
 *         description: Error en el prefijo proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:prefijo', obtenerUltimoIdUsuario);
module.exports = router;
