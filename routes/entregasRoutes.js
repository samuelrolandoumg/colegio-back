const express = require('express');
const { subirArchivo, upload } = require('../controllers/uploadController');
const router = express.Router();
const entregasController = require('../controllers/entregasController');

/**
 * @swagger
 * /api/entregas/subir:
 *   post:
 *     summary: Subir un archivo
 *     description: Permite a los alumnos subir un archivo para una tarea específica.
 *     tags:
 *       - Entregas
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo que será subido (PDF o Word).
 *               id_tarea:
 *                 type: integer
 *                 description: ID de la tarea asociada.
 *               id_alumno:
 *                 type: string
 *                 description: ID del alumno que sube el archivo.
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/subir', upload.single('file'), subirArchivo);

/**
 * @swagger
 * /api/entregas/{id_tarea}/{id_entrega}/{id_alumno}/{punteo}:
 *   put:
 *     summary: Calificar una entrega
 *     description: Actualiza la calificación de una entrega específica.
 *     tags: [Entregas]
 *     parameters:
 *       - name: id_tarea
 *         in: path
 *         required: true
 *         description: ID de la tarea.
 *         schema:
 *           type: integer
 *       - name: id_entrega
 *         in: path
 *         required: true
 *         description: ID de la entrega.
 *         schema:
 *           type: integer
 *       - name: id_alumno
 *         in: path
 *         required: true
 *         description: ID del alumno.
 *         schema:
 *           type: string
 *       - name: punteo
 *         in: path
 *         required: true
 *         description: Punteo de la calificación.
 *         schema:
 *           type: number
 *           example: 85
 *     responses:
 *       200:
 *         description: Calificación actualizada correctamente.
 *       404:
 *         description: Entrega no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.put(
    '/:id_tarea/:id_entrega/:id_alumno/:punteo',
    entregasController.calificarEntrega
);


/**
 * @swagger
 * /api/entregas/{id_tarea}/{id_entrega}/{id_alumno}:
 *   get:
 *     summary: Obtener el punteo actual de una entrega específica
 *     tags:
 *       - Entregas
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_entrega
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_alumno
 *         required: true
 *         description: ID del alumno
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Punteo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 punteo:
 *                   type: integer
 *       404:
 *         description: Entrega no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:id_tarea/:id_entrega/:id_alumno', entregasController.obtenerPunteoActual);

module.exports = router;
