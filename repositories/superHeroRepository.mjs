

import superHero from "../models/superHero.mjs";
import IRepository from "./IRepository.mjs";


class superHeroRepository extends IRepository {

  // Metodo GET 
  async obtenerPorId(id) {
    return await superHero.findById(id);
  }

  async obtenerTodos(id) {
    return await superHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const consulta = { [atributo]: valor };
    return await superHero.find(consulta);
  }

  async obtenerMayoresDe30(valor) {

    return await superHero.find({

      edad: { $gt: 30 },
      planetaOrigen: "Tierra",
      "poderes.1": { $exists: true }

    });

  }

  // Metodo POST
  async crearHeroe(datos) {
    return await superHero.create(datos);
  }

  // Metodo PUT 
  async actualizarHeroe(id, datosActualizados) {
    return await superHero.findByIdAndUpdate(id, datosActualizados);
  }

  async editarHeroePorId(id) {
    return await superHero.findById(id);
  }

  // Metodos DELETE 
  async eliminarHeroe(id) {
    return await superHero.findByIdAndDelete(id);
  }

  async eliminarHeroePorNombre(valor) {
    return await superHero.findOneAndDelete({ nombreSuperHeroe: valor });
  }

}

export default new superHeroRepository();


