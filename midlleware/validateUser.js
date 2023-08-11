const { validationResult } = require('express-validator');
const { body } = require('express-validator');

// Middleware de validación para nombre, apellido, email y contraseña
const registroValidator = [
    
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),

    body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),

    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es válido'),

    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    }
];


const loginValidator = [
    
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es válido'),

    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    }
];

module.exports = {
    registroValidator,
    loginValidator

};
