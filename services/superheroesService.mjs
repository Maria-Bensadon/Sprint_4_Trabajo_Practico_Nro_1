

import superHero from "../models/superHero.mjs";
import superHeroRepository from "../repositories/superHeroRepository.mjs";

// Metodo GET 
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

// Metodo POST 
export async function crearSuperheroe(datos) {
  return await superHeroRepository.crearHeroe(datos);
}

// Metodo PUT 
export async function actualizarSuperheroe(id, datosActualizados) {
  return await superHeroRepository.actualizarHeroe(id, datosActualizados);
}

export async function obtenerIdParaEditar(id) {
  return await superHeroRepository.editarHeroePorId(id);
}

// Metodo DELETE

export async function eliminarSuperheroePorId(id) {
  return await superHeroRepository.eliminarHeroe(id);
}

export async function eliminarSuperheroePorSuNombre(nombreSuperHeroe, valor) {
  return await superHeroRepository.eliminarHeroePorNombre(nombreSuperHeroe, valor);
}

