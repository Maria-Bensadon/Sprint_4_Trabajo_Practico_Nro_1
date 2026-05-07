
/** 
 * Paso 1 = Configuracion de la base de datos
 * Conexión a MongoDB
   ________________________________________________
 * Es la única instancia de conexión que puede ser utilizada 
   en cualquier parte del proyecto
 
   
*/

import mongoose from 'mongoose';

// ----------------------------------------------------------------------------------
import { setServers } from 'node:dns/promises';

setServers(["1.1.1.1", "8.8.8.8"]);
// -----------------------------------------------------------------------------------

export async function connectDB() {

    try {
        /**
            Hardcodear significa escribir un valor fijo directamente en el código, 
            en lugar de guardarlo en una variable o archivo de configuración.

            await mongoose.connect('mongodb+srv://grupo-05:grupo-05@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');

            * process.env.MONGODB_URI = es donde va esa URL, el server lee la direccion desde el archivo .env 
            * process.env = es un objeto de Node.js que contiene todas las variables de entorno. 
            * MONGODB_URI = es el nombre de la variable dentro de ese objeto.
        */
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Conexión exitosa a MongoDB`);
    }

    catch (error) {

        console.error(`Error al conectar a MongoDB:`, error);

        /** 
         * process es el proceso actual, 
         * .exit() es el metodo para terminarlo
         * 1 es el estandar internacional para avisar que hubo un error
         * ---------------------------------------------
         * significa que el proceso tuvo un fallo, indica al
         * sistema operativo o a la terminal que la ejecucion
         * no finalizo correctamente
        */
        process.exit(1);

    }
}


