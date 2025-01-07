const express = require('express');
const router = express.Router();
const { getGroupsAndClassesForUser, getNotesForUser } = require('../controllers/notasController');

/**
 * @swagger
 * /api/notas/{id_usuario}:
 *   get:
 *     summary: Obtiene los grupos y clases asociados a un usuario.
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupos y clases obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 grupos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_grupo:
 *                         type: integer
 *                       nombre_grupo:
 *                         type: string
 *                       id_alumno:
 *                         type: string
 *                       clase:
 *                         type: object
 *                         properties:
 *                           id_clase:
 *                             type: integer
 *                           nombre_clase:
 *                             type: string
 *       404:
 *         description: No se encontraron grupos o clases asociados.
 *       500:
 *         description: Error al obtener los datos.
 */
router.get('/:id_usuario', getGroupsAndClassesForUser);

/**
 * @swagger
 * /api/notas/{id_grupo}/{id_clase}/{id_usuario}:
 *   get:
 *     summary: Obtiene las notas de un usuario específico en un grupo y clase
 *     tags:
 *       - Notas
 *     parameters:
 *       - in: path
 *         name: id_grupo
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del grupo
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Notas obtenidas exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_grupo/:id_clase/:id_usuario', getNotesForUser);

module.exports = router;
