const { body, validationResult } = require('express-validator');

// Middleware de validación para la calificación
const validarCalificacion = [
    body('punteo')
        .notEmpty().withMessage('El campo punteo es obligatorio.')
        .isNumeric().withMessage('El campo punteo debe ser un número.'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];

module.exports = validarCalificacion;

