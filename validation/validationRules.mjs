
/** 
    Paso 9 -  Validaciones
    ---------------------------------------------------------
    * Se crea una funcion la cual esta formada por un
    arreglo o array con diferentes reglas de validacion, 
    y buscara en el body de cada solicitud PUT Y POST
    mediante express-validator las siguientes propiedades: 
        1) nombreSuperheroe
        2) nombreReal
        3) edad
        4) poderes
    Dentro de cada propiedad se buscara que cumplan
    ciertas condiciones minimas. Por ejemplo, que el 
    campo no este vacio, en el caso de la edad el valor 
    deber ser un numero mayor a 0, o tambien eliminar los
    espacios en blanco al inicio y al final (trim()). 
    En caso de que alguna regla falle, express-validator
    almacena el error en .withMessage()

    Este middleware es exportado a superHeroRoutes.mjs
    como validarHeroe() para poder aplicarlos a las solicitudes
    correspondientes. 

    Como el body se extrae del request, en el controller
    los errores serán leidos por validationResult(req) y 
    guardados en una constante "errores". Si esta constante
    posee errores acumulados, se devuelve el error 400 
    con un array que muestre todos los .withMessage correspondientes
    a cada error. 
    
    --------------------------------
    Flujo
    * validarHeroe() => array con las reglas y mensajes
    * express-validator => acumula los mensajes de los errores
    con .withMessage() dentro del request
    * validationResult(req) => leer el request, es decir, los
    mensajes acumulados de validarHeroe() y los muestra en el controller
    
*/

import { body } from 'express-validator';


export const validarHeroe = () => [

    /**
        nombreSuperheroe debe validarse que sea requerido, 
        no tenga espacios en blanco(trim), una longitud 
        minima de 3 caracteres y una longitud maxima de 60
 */
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El superheroe debe tener un nombre')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

    /*
        nombreReal debe validarse que sea requerido, 
        no tenga espacios en blanco(trim), una longitud 
        minima de 3 caracteres y una longitud maxima de 60
    */
    body('nombreReal')
        .notEmpty().withMessage('El campo esta vacio')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

    /**
        edad debe validarse que sea requerido, que sea un
        numero, no tenga espacios en blanco(trim), valor 
        minimo 0 (no admite edad negativa)
     */
    body('edad')
        .notEmpty().withMessage('Debe indicar la edad del superheroe')
        .trim()
        .isInt({ min: 0 }).withMessage('La edad no puede ser negativa'), // es un numero

    /*
        poderes debe validarse que sea requerido, que sea un array de 
        string cuyo tamaño no sea 0, cada elemento no tenga espacios 
        en blanco, cada elemento una longitud minima de 3 caracteres 
        y una longitud maxima de 60
    */
    // se aplica a todo el array
    // body('poderes')
    //     .isArray({ min: 1 })
    //     .withMessage('El array debe tener al menos un elemento'),

    // valida cada elemento del array
    body('poderes')
        .notEmpty()
        .withMessage('El superheroe debe tener al menos 1 poder')
        .trim() // elimina los espacion en blanco al inicio y al final
        .isLength({ min: 3, max: 60 })
        .withMessage('Cada poder debe tener como minimo 3 letras'),

    //------------------------------------------------------------------------------------
      
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