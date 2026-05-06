

// Paso 10: error Middleware
// ---------------------------

import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {

    // las validaciones que no hayan funcionado, las guardo en una constante
    const errores = validationResult(req);

    // si esta constante NO esta vacia
    if (!errores.isEmpty()) {
        // devolvemos el error 400 => solicitud con datos inválidos o malformados
        /* 
          Accedemos al array y le aplicamos el metodo map, devolviendo un
          array con los mensajes de error correspondientes a cada elemento
          explicando cual fue el fallo.
          Esto permitira registrar el error y facilitar su corrección
        */
        return res.status(400).json({
            errors: errores.array().map(error =>
            ({
                // indica cual propiedad en el body no fue valido
                field: error.path,
                // es el mensaje guardado en .withMessage()
                message: error.msg,
            }))
        });
    }
    next();
}

export const handleValidationErrorsAgregar = (req, res, next) => {

    // las validaciones que no hayan funcionado, las guardo en una constante
    const errores = validationResult(req);

    // si esta constante NO esta vacia
    if (!errores.isEmpty()) {
        // devolvemos el error 400 => solicitud con datos inválidos o malformados
        /* 
          Accedemos al array y le aplicamos el metodo map, devolviendo un
          array con los mensajes de error correspondientes a cada elemento
          explicando cual fue el fallo.
          Esto permitira registrar el error y facilitar su corrección
        */
        return res.render('addSuperhero', {
            errors: errores.array().map(error =>
            ({
                // indica cual propiedad en el body no fue valido
                field: error.path,
                // es el mensaje guardado en .withMessage()
                message: error.msg,
            }))
        });
    }
    next();
}

