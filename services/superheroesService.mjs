

/** 
  * Paso 4 = Capa de Servicio - Lógica de Negocio
  * Servicios de superHero
    _____________________________________________________________
 
  * Utiliza los métodos del repositorio (recuperar, buscar, 
    filtrar)
  
  * Esta capa es quien recibe la orden del controlador, y 
    se comunica con la capa de persistencia (Repositorios)
    para llamar a las funciones (interfaz), que buscaran 
    los datos en MongoDB (implementacion) utilizando el modelo
    (esquema y modelo).

*/

import superHero from "../models/superHero.mjs";
import superHeroRepository from "../repositories/SuperHeroRepository.mjs";

// ---------------- Metodo GET --------------------------

export async function obtenerSuperheroePorId(id) {

  return await superHeroRepository.obtenerPorId(id);

}

export async function obtenerTodosLosSuperheroes() {

  return await superHeroRepository.obtenerTodos();

}

export async function buscarSuperheroePorAtributo(atributo, valor) {

  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSupeheroesMayoresDe30() {

  return await superHeroRepository.obtenerMayoresDe30();
}

// ------------------------------------------------------


// __________________________________________________________________________
//         SPRINT 3 - TRABAJO PRACTICO N°1
// __________________________________________________________________________

// ---------------- Metodo POST --------------------------
export async function crearSuperheroe(datos) {

  return await superHeroRepository.crearHeroe(datos);

}

// ---------------- Metodo PUT --------------------------
export async function actualizarSuperheroe(id, datosActualizados) {

  return await superHeroRepository.actualizarHeroe(id, datosActualizados);

}

export async function obtenerIdParaEditar(id) {
  return await superHeroRepository.editarHeroe(id); 
}

// ---------------- Metodo DELETE -----------------------

// metodo para eliminar un superheroe por id
export async function eliminarSuperheroePorId(id) {

  return await superHeroRepository.eliminarHeroe(id);

}

// metodo para eliminar un superheroe por nombre
export async function eliminarSuperheroePorSuNombre(nombreSuperHeroe, valor) {

  return await superHeroRepository.eliminarHeroePorNombre(nombreSuperHeroe, valor);

}