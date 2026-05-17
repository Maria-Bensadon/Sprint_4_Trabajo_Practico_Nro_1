
import { body } from 'express-validator';

export const validarHeroe = () => [

    body('nombreSuperHeroe')
        .notEmpty().withMessage('El superheroe debe tener un nombre')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

    body('nombreReal')
        .notEmpty().withMessage('El campo esta vacio')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

    body('edad')
        .notEmpty().withMessage('Debe indicar la edad del superheroe')
        .trim()
        .isInt({ min: 0 }).withMessage('La edad no puede ser negativa'), // es un numero

    body('poderes')
        .isArray({ min: 1 })
        .withMessage('El array debe tener al menos un elemento'),

    body('poderes.*')
        .notEmpty()
        .trim() // elimina los espacio en blanco al inicio y al final
        .isLength({ min: 3, max: 60 })
        .withMessage('Cada poder debe tener como minimo 3 letras'),
      
    body('planetaOrigen')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .trim()
        .isLength({min:3, max:60})
        .withMessage('El valor debe tener al menos 3 caracteres'),
    
    body('debilidad')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .trim()
        .isLength({min:3, max:60})
        .withMessage('El valor debe tener al menos 3 caracteres')
]; 


