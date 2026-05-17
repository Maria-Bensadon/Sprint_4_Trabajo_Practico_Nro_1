
import {
  obtenerSuperheroePorId, obtenerTodosLosSuperheroes, obtenerSupeheroesMayoresDe30,
  buscarSuperheroePorAtributo, actualizarSuperheroe, crearSuperheroe,
  eliminarSuperheroePorId, eliminarSuperheroePorSuNombre
} from "../services/superheroesService.mjs";
import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs"


// Metodo GET
export async function obtenerSuperheroePorIdController(req, res) {

  try {

    const id = req.params.id;
    const superheroes = await obtenerSuperheroePorId(id);

    if (!superheroes) {
      return res.status(404).send({ mensaje: `Superhéroe no encontrado` });
    }
    res.render('dashboard', { superheroes });

  }

  catch (error) {
    res.status(500).send({ mensaje: `Error al obtener el superhéroe`, error: error.message });
  }

}


export async function obtenerTodosLosSuperheroesController(req, res) {

  try {

    const superheroes = await obtenerTodosLosSuperheroes();
    res.render('dashboard', { superheroes });

  }

  catch (error) {
    res.status(500).send({ mensaje: `Error al obtener los superhéroes`, error: error.message });
  }

}

export async function buscarSuperheroesPorAtributoController(req, res) {

  try {

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


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

  try {

    const superheroes = await obtenerSupeheroesMayoresDe30();

    if (superheroes.length === 0) {
      res.status(404).send({ mensaje: `No se encontraron superhéroes mayores de 30 años` });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);

  }

  catch (error) {
    res.status(500).send({ mensaje: `Error al obtener superhéroes mayores de 30, controlador`, error: error.message });
  }
}

// Metodo POST 
export async function crearSuperheroeController(req, res) {

  try {

    const datos = req.body;

    if (typeof datos.poderes === "string") {
      datos.poderes = datos.poderes.split(",").map(p => p.trim());
    }

    if (typeof datos.aliados === "string") {
      datos.aliados = datos.aliados.split(",").map(p => p.trim());
    }

    if (typeof datos.enemigos === "string") {
      datos.enemigos = datos.enemigos.split(",").map(p => p.trim());
    }

    const superheroe = await crearSuperheroe(datos);
    console.log('Superhéroe creado:', superheroe);

    if (!superheroe) {

      return res.status(404).send({ mensaje: `No se pudo crear el supehéroe` });

    }

    res.redirect('/api');
  }

  catch (error) {
    res.status(500).send({ mensaje: `Error al crear el superhéroe`, error: error.message });
  }
}

// Metodo PUT 
export async function actualizarSuperheroeController(req, res) {

  try {

    const id = req.params.id;
    const datosActualizados = req.body;

    if (typeof datosActualizados.poderes === "string") {
      datosActualizados.poderes = datosActualizados.poderes.split(",").map(p => p.trim());
    }

    if (typeof datosActualizados.aliados === "string") {
      datosActualizados.aliados = datosActualizados.aliados.split(",").map(p => p.trim());
    }

    if (typeof datosActualizados.enemigos === "string") {
      datosActualizados.enemigos = datosActualizados.enemigos.split(",").map(p => p.trim());
    }

    const superheroe = await actualizarSuperheroe(id, datosActualizados);

    if (!superheroe) {
      return res.status(404).send({ mensaje: `No se encontro el superheroe para actualizar` });
    }

    res.redirect('/api');

  } catch (error) {
    res.status(500).send({ mensaje: `Error al actualizar el superhéroe`, error: error.message });
  }

}

export async function obtenerSuperheroePorIdEditarController(req, res) {
  try {
    const id = req.params.id;
    const superheroe = await obtenerSuperheroePorId(id);

    res.render('editSuperhero', { superheroe });
  }

  catch (error) {
    res.status(500).send({ mensaje: `Error al crear el superhéroe`, error: error.message });
  }
}

// Metodo DELETE 
export async function eliminarSuperheroePorIdController(req, res) {

  try {

    const id = req.params.id;
    const superheroe = await eliminarSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).send({ mensaje: `No se pudo eliminar el superheroe` });
    }

    res.redirect('/api');

  } catch (error) {
    res.status(500).send({ mensaje: `Error al intentar eliminar superheroe`, error: error.message });
  }

}

export async function eliminarSuperheroePorSuNombreController(req, res) {

  try {

    const { valor } = req.params;
    const superheroe = await eliminarSuperheroePorSuNombre(valor);

    if (!superheroe) {
      return res.status(404).send({ mensaje: `No se pudo eliminar el superheroe` });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe)
    res.status(200).json(superheroeFormateado);

  } catch (error) {
    res.status(500).send({ mensaje: `Error al interntar eliminar un superheroe por su nombre`, error: error.message });
  }
}




