const express = require('express');
const { crearClase, obtenerClasesPorProfesor } = require('../controllers/clasesController');

const router = express.Router();

/**
 * @swagger
 * /api/clases/crear:
 *   post:
 *     summary: Crear una nueva clase
 *     description: Permite a un profesor crear una nueva clase.
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_clase:
 *                 type: string
 *                 description: Nombre de la clase.
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la clase.
 *               id_profesor:
 *                 type: string
 *                 description: ID del profesor que crea la clase.
 *     responses:
 *       201:
 *         description: Clase creada exitosamente.
 */
router.post('/crear', crearClase);

/**
 * @swagger
 * /api/clases/consultar/{id_profesor}:
 *   get:
 *     summary: Obtener clases de un profesor
 *     description: Retorna todas las clases creadas por un profesor.
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id_profesor
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor.
 *     responses:
 *       200:
 *         description: Lista de clases obtenidas exitosamente.
 */
router.get('/consultar/:id_profesor', obtenerClasesPorProfesor);

module.exports = router;
