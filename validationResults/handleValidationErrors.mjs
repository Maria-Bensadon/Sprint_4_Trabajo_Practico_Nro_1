

import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            errors: errores.array().map(error =>
            ({
                field: error.path,
                message: error.msg,
            }))
        });
    }
    next();
}

export const handleValidationErrorsAgregar = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.render('addSuperhero', {
            errors: errores.array().map(error =>
            ({
                field: error.path,
                message: error.msg,
            }))
        });
    }
    next();
}

