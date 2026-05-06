// archivo principal de la aplicacion

/** 
 * Paso 8 = Configuración del Servidor
   __________________________________________________________________
 
 * Centraliza la conexion a MongoDB y a las rutas necesarias

*/

import express from 'express'; 
import {connectDB} from './config/dbConfig.mjs';

// revisar esto ----------------------------------------
import superHeroRoutes from './routes/superHeroRoutes.mjs';  
// -----------------------------------------------------

import methodOverride from 'method-override';


const server = express(); 

/**
  process.env.PORT: variable de entorno
  || 3000`: valor por defecto (fallback)
 */
const PORT = process.env.PORT || 3000; 

// -------------------------------------------


//--------------------------------------------
// Paso 11: Se establece el motor de plantillas ejs
server.set('view engine','ejs');
// -------------------------------------------

// Middleware para parsear JSON
server.use(express.json()); 

// recibe el texto y lo convierte a un objeto javascript
server.use(express.urlencoded({ extended: true }));

/*
    method-override permite usar métodos HTTP como PUT y DELETE
    desde formularios HTML, que solo soportan GET y POST nativamente.
    
    Cuando el formulario envía un POST con ?_method=PUT en la URL,
    method-override intercepta la solicitud y la convierte en PUT
    antes de que llegue al router.
    
    Ejemplo:
    - El formulario envía: POST /api/heroes/123?_method=PUT
    - method-override lo convierte en: PUT /api/heroes/123
    - El router lo recibe como PUT y ejecuta router.put()
*/
server.use(methodOverride('_method'));

// para saber si llegan las peticiones
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// configuracion de rutas
/** 
  Se define el prefijo "/api". Por lo que todas las rutas
  llevaran este prefijo. por ejemplo: 
  - http://localhost:3000/api/heroes/:id
*/
server.use('/api', superHeroRoutes); 

// conexion a MongoDB
connectDB(); 

// Manejo de errores para rutas no encontradas
server.use((req, res) => {

    res.status(404).send({mensaje: `Ruta no encontrada`});
}); 


// iniciar el servidor
server.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`); 
}); 

