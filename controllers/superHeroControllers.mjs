

/** 
 * Paso 5 = Controlador
   _______________________________________________________

 * Gestiona las solicitudes HTTP. 

 * Se comunica con el servicio, para revisar la lógica de negocio
  Por ejemplo: si en el servidor, el cliente ingresa un id para 
  buscar un superheroe, el servicio es el intermediario entre el 
  controlador y el repositorio (y el modelo)
 
 * La ruta envía el/los dato/s (id, atributo y/o valor, todos los superheroes, 
  los mayores de 30 años) al controlador. 
  El controlador utiliza las funciones importadas del servicio, para 
  comunicarse con el repositorio y obtener la informacion. 
  - Si todo sale bien (codigo 200 OK), se utilizan las funciones de la vista para
  "formatear" o mostrar el/los superheroe/s. 
  - Si sale mal: 
       - error (codigo 404) => no se encontro el superheroe o los superheroes
       - error (codigo 500) => hay un problema que no esta especificado, y puede 
      venir del codigo, de la DB, o de la configuracion

  * El try ... catch es un bloque de instrucciones a intentar (try), que 
   tiene especificado una respuesta si se produce una excepcion (catch). 
      - try => codigo 200 y codigo 404
      - catch => codigo 500

*/

import {
  obtenerSuperheroePorId, obtenerTodosLosSuperheroes, obtenerSupeheroesMayoresDe30,
  buscarSuperheroePorAtributo, actualizarSuperheroe, crearSuperheroe,
  eliminarSuperheroePorId, eliminarSuperheroePorSuNombre
} from "../services/superheroesService.mjs";

// la vista se realiza en el paso 6
import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs"


// --------------------- Metodo GET -------------------------------
// 1) OBTENER SUPERHEROES POR ID
// Para Postman — devuelve JSON
export async function obtenerSuperheroePorIdController(req, res) {

  try {

    // se extrae el id de los parametros
    const id = req.params.id;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {

      /** 
        
        El error 404 ("Not Found") es un código de estado HTTP que indica 
        que el navegador pudo conectarse al servidor, pero no encontró la 
        página o recurso solicitado.

      */
      return res.status(404).send({ mensaje: `Superhéroe no encontrado` });
    }

    // VISTA -------------------------------------------------
    // utiliza una funcion de la capa vista
    // const superheroeFormateado = renderizarSuperheroe(superheroe);
    // // la respuesta esta en funcion del status. si es OK, se muestra el superheroe
    // res.status(200).json(superheroeFormateado);
    res.render('dashboard', { superheroes });

  }

  catch (error) {

    /** 
      
      El error 500 (Internal Server Error) es un código de estado HTTP que indica
      que el servidor web ha encontrado una condición inesperada que le impide 
      cumplir con la solicitud del usuario.

      No se puede especificar cuál es el problema exacto. Puede ser un fallo en 
      el código, en la configuración o en la base de datos del sitio web.

    */
    res.status(500).send({ mensaje: `Error al obtener el superhéroe`, error: error.message });

  }

}


// 2) OBTENER TODOS LOS SUPERHEROES
// Para Postman — devuelve JSON
export async function obtenerTodosLosSuperheroesController(req, res) {

  try {

    const superheroes = await obtenerTodosLosSuperheroes();
    // const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    // res.status(200).json(superheroesFormateados);
    res.render('dashboard', { superheroes });
    // no faltaria el error 404???

  }

  catch (error) {
    // la respuesta esta en funcion del status, aqui es el codigo error 500
    res.status(500).send({ mensaje: `Error al obtener los superhéroes`, error: error.message });
  }

}



// 3) BUSCAR SUPERHEROES POR ATRIBUTO
// Para Postman — devuelve JSON
export async function buscarSuperheroesPorAtributoController(req, res) {

  try {

    /* 

      destructuring = se extraen propiedades de objetos, en este caso, cada 
      superheroe en la base de datos, que posee como esquema a la 
      clase superHeroSchema en la capa de modelo

    */
    const { atributo, valor } = req.params;

    const superheroes = await buscarSuperheroePorAtributo(atributo, valor);

    if (superheroes.length === 0) {

      return res.status(404).send({ mensaje: `No se encontraron superheroes con ese atributo` });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);

    res.status(200).json(superheroesFormateados);
  }

  catch (error) {

    res.status(500).send({ mensaje: `Error al buscar los superhéroes`, error: error.message });
  }

}


// 4) OBTENER SUPERHEROES MAYORES DE 30 AÑOS
// Para Postman — devuelve JSON
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

  try {

    const superheroes = await obtenerSupeheroesMayoresDe30();

    // la longitud del string superheroes debe ser mayor a 0
    if (superheroes.length === 0) {

      /* 
        la respuesta esta en funcion del status. En este caso, si no hay superheroes
        mayores a 30, se muestra el mensaje dado
      */
      res.status(404).send({ mensaje: `No se encontraron superhéroes mayores de 30 años` });

    }

    // si hay un superheroe que mostrar, se utiliza la funcion de la capa de vista
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);

  }

  catch (error) {

    res.status(500).send({ mensaje: `Error al obtener superhéroes mayores de 30, controlador`, error: error.message });

  }
}

// __________________________________________________________________________
//         SPRINT 3 - TRABAJO PRACTICO N°1
// __________________________________________________________________________

// ---------------------- Metodo POST --------------------------------

// 5) METODO PARA CREAR UN SUPERHEROE
export async function crearSuperheroeController(req, res) {

  try {

    console.log('Body recibido:', req.body); // agregá esto

    const datos = req.body;

    /*
      la informacion llega como texto (String), la funcion split()
      separa las palabras por "," y el metodo map elimina los espacios 
      en blanco (.trim()); 
    */
    if (typeof datos.poderes === "string") {
      datos.poderes = datos.poderes.split(",").map(p => p.trim());
    }

    if (typeof datos.aliados === "string") {
      datos.aliados = datos.aliados.split(",").map(p => p.trim());
    }

    if (typeof datos.enemigos === "string") {
      datos.enemigos = datos.enemigos.split(",").map(p => p.trim());
    }

    // Se busca el superheroe
    const superheroe = await crearSuperheroe(datos);
    console.log('Superhéroe creado:', superheroe);

    // error 404
    if (!superheroe) {

      return res.status(404).send({ mensaje: `No se pudo crear el supehéroe` });

    }

    // redirige al dashboard despues de actualizar
    res.redirect('/api/heroes');
  }

  catch (error) {

    // error 500
    res.status(500).send({ mensaje: `Error al crear el superhéroe`, error: error.message });

  }
}

// ----------------------- Metodo PUT ---------------------------------

// 6) a) (PUT) - METODO PARA ACTUALIZAR UN SUPERHEROE
export async function actualizarSuperheroeController(req, res) {

  try {

    const id = req.params.id;
    const datosActualizados = req.body;

    /*
      la informacion llega como texto (String), la funcion split()
      separa las palabras por "," y el metodo map elimina los espacios 
      en blanco (.trim()); 
    */
    if (typeof datosActualizados.poderes === "string") {
      datosActualizados.poderes = datosActualizados.poderes.split(",").map(p => p.trim());
    }

    if (typeof datosActualizados.aliados === "string") {
      datosActualizados.aliados = datosActualizados.aliados.split(",").map(p => p.trim());
    }

    if (typeof datosActualizados.enemigos === "string") {
      datosActualizados.enemigos = datosActualizados.enemigos.split(",").map(p => p.trim());
    }
    // const datos = req.body; 

    const superheroe = await actualizarSuperheroe(id, datosActualizados);

    // error 404 por no encontrar id
    if (!superheroe) {
      return res.status(404).send({ mensaje: `No se encontro el superheroe para actualizar` });
    }

    // redirige al dashboard despues de actualizar
    res.redirect('/api/heroes');

  } catch (error) {

    res.status(500).send({ mensaje: `Error al actualizar el superhéroe`, error: error.message });

  }

}
// 6) b) (GET) - BUSQUEDA DEL SUPERHEROE POR ID PARA EL MOSTRAR EL FORMULARIO PRECARGADO 

export async function obtenerSuperheroePorIdEditarController(req, res) {
  try {
    // se extrae el id de los parametros
    const id = req.params.id;
    const superheroe = await obtenerSuperheroePorId(id);

    res.render('editSuperhero', { superheroe });
  }

  catch (error) {

    // error 500
    res.status(500).send({ mensaje: `Error al crear el superhéroe`, error: error.message });

  }
}

// ---------------------- Metodo DELETE ---------------------------------

// 7) METODO PARA ELIMINAR UN SUPERHEROE POR ID
export async function eliminarSuperheroePorIdController(req, res) {

  try {

    const id = req.params.id;
    const superheroe = await eliminarSuperheroePorId(id);

    // 404
    if (!superheroe) {

      return res.status(404).send({ mensaje: `No se pudo eliminar el superheroe` });

    }
    // ---------------------------------------------------------------------------------

    res.redirect('/api/heroes');


  } catch (error) {

    // error 500
    res.status(500).send({ mensaje: `Error al intentar eliminar superheroe`, error: error.message });

  }

}

// 8) METODO PARA ELIMINAR UN SUPERHEROE POR SU NOMBRE
export async function eliminarSuperheroePorSuNombreController(req, res) {

  try {

    const { valor } = req.params;

    const superheroe = await eliminarSuperheroePorSuNombre(valor);

    if (!superheroe) {

      // error 404
      return res.status(404).send({ mensaje: `No se pudo eliminar el superheroe` });

    }
    // ---------------------------------------------------------------------------------

    //200 OK - lista sin superheroe ---------------------------------------
    const superheroeFormateado = renderizarSuperheroe(superheroe)
    res.status(200).json(superheroeFormateado);

    // ---------------------------------------------------------------------------------


  } catch (error) {

    res.status(500).send({ mensaje: `Error al interntar eliminar un superheroe por su nombre`, error: error.message });

  }
}









// 200 OK - lista sin superheroe ---------------------------------------
// const listaSuperheroeFormateado = renderizarListaSuperheroes(superheroe)
// res.status(200).json(listaSuperheroeFormateado); // devuelve todos los superheroes sin el eliminado

// 200 OK - superheroe eliminado ---------------------------------------
// const superheroeFormateado = renderizarSuperheroe(superheroe);
// res.status(200).json(superheroeFormateado);


