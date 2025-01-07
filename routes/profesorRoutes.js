const express = require('express');
const {
  obtenerGruposClasesYtareasPorProfesor,
  obtenerGruposPorProfesor,
  obtenerGruposClasesYAlumnosPorProfesor,
  getGruposClasesAlumnosCalificaciones,
} = require('../controllers/profesorController');
const { obtenerAlumnosYTareas } = require('../controllers/clasesController');

const router = express.Router();

/**
 * @swagger
 * /api/profesor/{id_profesor}/grupos-clases-tareas:
 *   get:
 *     summary: Obtiene los grupos, clases, alumnos y tareas asignadas al profesor.
 *     tags: [Profesor]
 *     parameters:
 *       - in: path
 *         name: id_profesor
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del profesor.
 *     responses:
 *       200:
 *         description: Grupos, clases y tareas obtenidos exitosamente.
 *       404:
 *         description: El usuario no es un profesor o no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id_profesor/grupos-clases-tareas', obtenerGruposClasesYtareasPorProfesor);

/**
 * @swagger
 * /api/profesor/{id_profesor}/grupos:
 *   get:
 *     summary: Obtiene los grupos asignados al profesor.
 *     tags: [Profesor]
 *     parameters:
 *       - in: path
 *         name: id_profesor
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del profesor.
 *     responses:
 *       200:
 *         description: Lista de grupos obtenida exitosamente.
 *       404:
 *         description: No se encontraron grupos para el profesor.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id_profesor/grupos', obtenerGruposPorProfesor);

/**
 * @swagger
 * /api/profesor/{id_profesor}:
 *   get:
 *     summary: Obtener grupos, clases y alumnos por profesor
 *     description: Devuelve una lista de grupos, clases y alumnos asignados a un profesor.
 *     tags: [Profesor]
 *     parameters:
 *       - in: path
 *         name: id_profesor
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del profesor.
 *     responses:
 *       200:
 *         description: Grupos, clases y alumnos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grupos, clases y alumnos obtenidos exitosamente.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_clase:
 *                         type: integer
 *                         example: 1
 *                       nombre_clase:
 *                         type: string
 *                         example: Matemática
 *                       grupos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id_grupo:
 *                               type: integer
 *                               example: 1
 *                             nombre_grupo:
 *                               type: string
 *                               example: Primero Básico
 *                             alumnos:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id_alumno:
 *                                     type: string
 *                                     example: 49193821A
 *                                   nombre_alumno:
 *                                     type: string
 *                                     example: Samuel
 *       404:
 *         description: El profesor no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id_profesor/', obtenerGruposClasesYAlumnosPorProfesor);

/**
 * @swagger
 * /api/profesor/{id_profesor}/grupos-clases-alumnos-calificaciones:
 *   get:
 *     summary: Obtiene grupos, clases, alumnos y sus calificaciones por profesor.
 *     description: Devuelve una lista de clases, grupos y los alumnos con sus calificaciones totales.
 *     parameters:
 *       - name: id_profesor
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor.
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id_profesor/grupos-clases-alumnos-calificaciones', getGruposClasesAlumnosCalificaciones);

module.exports = router;
