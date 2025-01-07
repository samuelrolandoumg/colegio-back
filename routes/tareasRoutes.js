const express = require('express');
const router = express.Router();
const { crearTarea, upload, obtenerTareasPorGrupo, obtenerTareasPorUsuario, obtenerEntregaPorId } = require('../controllers/tareasController');

/**
 * @swagger
 * /api/tareas/crear:
 *   post:
 *     summary: Crear una nueva tarea para un grupo específico con archivo adjunto.
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               puntuacion:
 *                 type: number
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               tipo_documento:
 *                 type: string
 *                 enum: [pdf, word]
 *               id_grupo:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo adjunto de la tarea.
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/crear', upload.single('file'), crearTarea);

/**
 * @swagger
 * /api/tareas/grupo/{id_grupo}:
 *   get:
 *     summary: Obtener todas las tareas de un grupo.
 *     tags: [Tareas]
 *     parameters:
 *       - name: id_grupo
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del grupo cuyas tareas se quieren consultar.
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/grupo/:id_grupo', obtenerTareasPorGrupo);

/**
 * @swagger
 * /api/tareas/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener todas las tareas asignadas a un usuario.
 *     tags: [Tareas]
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyas tareas se quieren consultar.
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/usuario/:id_usuario', obtenerTareasPorUsuario);


/**
 * @swagger
 * /api/tareas/{id_tarea}/entregas/{id_entrega}:
 *   get:
 *     summary: Obtiene los detalles de una entrega específica, incluyendo clase y grupo relacionados.
 *     description: Retorna información detallada de la entrega, tarea, grupo y clase relacionados.
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea.
 *       - in: path
 *         name: id_entrega
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrega.
 *     responses:
 *       200:
 *         description: Detalles de la entrega obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Entrega obtenida exitosamente.
 *                 entrega:
 *                   type: object
 *       404:
 *         description: Entrega no encontrada.
 *       500:
 *         description: Error al obtener la entrega.
 */
router.get('/:id_tarea/entregas/:id_entrega', obtenerEntregaPorId);

module.exports = router;
