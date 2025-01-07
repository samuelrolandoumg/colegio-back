const express = require('express');
const {
    crearGrupo,
    obtenerGruposPorClase,
    agregarAlumnosAGrupo,
} = require('../controllers/gruposController');
const { obtenerTareasPorGrupoYClase } = require('../controllers/gruposController');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Gestión de Grupos y su relación con los usuarios
 */

/**
 * @swagger
 * /api/grupos/crear:
 *   post:
 *     summary: Crear un nuevo grupo
 *     description: Permite crear un grupo y asociarlo a una clase específica, incluyendo alumnos.
 *     tags: [Grupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_grupo:
 *                 type: string
 *                 description: Nombre del grupo.
 *                 example: Primero Básico
 *               id_clase:
 *                 type: integer
 *                 description: ID de la clase a la que pertenece el grupo.
 *                 example: 1
 *               alumnos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de los alumnos que pertenecerán al grupo.
 *                 example: ["49193821", "49193822"]
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grupo creado exitosamente.
 *                 grupo:
 *                   type: object
 *                   properties:
 *                     id_grupo:
 *                       type: integer
 *                     nombre_grupo:
 *                       type: string
 *                     id_clase:
 *                       type: integer
 *       400:
 *         description: Error en la solicitud, como alumnos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/crear', crearGrupo);

/**
 * @swagger
 * /api/grupos/consultar/{id_clase}:
 *   get:
 *     summary: Obtener grupos por clase
 *     description: Retorna todos los grupos asociados a una clase específica.
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase cuyos grupos se quieren consultar.
 *         example: 1
 *     responses:
 *       200:
 *         description: Grupos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grupos obtenidos exitosamente.
 *                 grupos:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/consultar/:id_clase', obtenerGruposPorClase);

/**
 * @swagger
 * /api/grupos/agregar-alumnos:
 *   post:
 *     summary: Agregar alumnos a un grupo existente
 *     description: Permite agregar uno o más alumnos a un grupo ya existente.
 *     tags: [Grupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_grupo:
 *                 type: integer
 *                 description: ID del grupo al que se agregarán los alumnos.
 *                 example: 1
 *               alumnos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de los alumnos a agregar al grupo.
 *                 example: ["49193823", "49193824"]
 *     responses:
 *       200:
 *         description: Alumnos agregados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Alumnos agregados al grupo exitosamente.
 *       404:
 *         description: El grupo no existe.
 *       400:
 *         description: Error en la solicitud, como alumnos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/agregar-alumnos', agregarAlumnosAGrupo);


/**
 * @swagger
 * /api/grupos/{id_grupo}/clases/{id_clase}/tareas-alumnos:
 *   get:
 *     summary: Obtiene las tareas de los alumnos de una clase en un grupo específico.
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id_grupo
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del grupo.
 *       - in: path
 *         name: id_clase
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la clase.
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente.
 *       404:
 *         description: No se encontraron tareas para este grupo y clase.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id_grupo/clases/:id_clase/tareas-alumnos', obtenerTareasPorGrupoYClase);

module.exports = router;
    