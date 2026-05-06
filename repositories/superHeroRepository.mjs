

/** 
 * Paso 3 - b) = Capa de persistencia
 * Implementacion CRUD de SuperHero
   ________________________________________________________________
 * Implementa los metodos definidos por la interfaz. 
   Si por ejemplo, se llama al metodo obtenerPorId(), esta 
   interactua en directo con MongoDB a traves de Mongoose
   para buscar el superheroe correspondiente al id dado. 
 
 * 
*/

// consultar esta linea

// ---------------------------------------------
import superHero from "../models/superHero.mjs";
import IRepository from "./IRepository.mjs";


class superHeroRepository extends IRepository {

  // ---------------- Metodo GET --------------------------
  // metodo para obtener superheroes por id
  async obtenerPorId(id) {

    return await superHero.findById(id);
  }

  // metodo para obtener todos los superheroes
  async obtenerTodos(id) {

    return await superHero.find({});
  }

  // metodo para buscar superheroes por atributo
  async buscarPorAtributo(atributo, valor) {

    /**
     * Propiedad Computada: se refiere a la posibilidad de tener nombres de propiedades de objetos 
       cuyos nombres se pueden determinar en tiempo de ejecución. 
       Por ejemplo: 
       - let nombrePropiedadDinamica = "nombre";
       - let objeto = { [nombrePropiedadDinamica]: "Pepito Grillo"}
 
     */
    const consulta = { [atributo]: valor };
    return await superHero.find(consulta);
  }

  // metodo para obtener los superheroes mayores a 30
  async obtenerMayoresDe30(valor) {

    /**
       defino el metodo para obtener todos los supers y lo guardo 
       en una constante. MongoDB devuelve un array con todos los 
       superheroes, por lo que ya se puede aplicar filter.
       El await va en el primer metodo, porque si no 
       obtengo todos los superheroes, no puedo filtrarlos.

       ### Requerimientos
        - /superheroes/edad/mayorA30: Devuelve una lista de 
        superhéroes mayores de 30 años que además sean del 
        planeta Tierra y tengan al menos 2 poderes.

    */

    // como le entendi
    // const todosSuperheroes = await superHero.find({});
    // return todosSuperheroes.find(hero => ((hero.edad > 30) && (hero.planetaOrigen === "Tierra") && (hero.poderes.length>=2)));

    // IA
    return await superHero.find({
      /* CONDICIÓN 1: La edad debe ser mayor a 30.
           $gt significa "Greater Than" (>). 
           Buscamos en el campo 'edad' valores que superen los 30.
        */
      edad: { $gt: 30 },

      /* CONDICIÓN 2: El planeta debe ser exactamente "Tierra".
         Al ser una comparación de igualdad directa, se escribe 
         el campo y el valor sin operadores especiales.
      */
      planetaOrigen: "Tierra",

      /* CONDICIÓN 3: Debe tener al menos 2 poderes.
         Consultamos si existe algo en el índice 1 del array (la segunda posición).
         Si el índice 1 tiene datos, significa que el array tiene 2 elementos o más.
      */
      "poderes.1": { $exists: true }
    });

  }


  // ------------------------------------------------------


  // __________________________________________________________________________
  //         SPRINT 3 - TRABAJO PRACTICO N°1
  // __________________________________________________________________________

  // ---------------- Metodo POST --------------------------

  async crearHeroe(datos) {

    //console.log(`se crea un superheroe`); 
    return await superHero.create(datos);

  }

  // ------------------------------------------------------

  // ---------------- Metodo PUT --------------------------

  async actualizarHeroe(id, datosActualizados) {

    //console.log(`Se actualiza a:`, id); 
    return await superHero.findByIdAndUpdate(id, datosActualizados);

  }

  async editarHeroePorId (id) {
    return await superHero.findById(id);
  }
  // ------------------------------------------------------

  // ---------------- Metodo DELETE -----------------------

  // metodo para eliminar un superheroe por id
  async eliminarHeroe(id) {
    //console.log(`Se elimina a:`, id); 
    return await superHero.findByIdAndDelete(id);
  }


  // metodo para eliminar un superheroe por nombre
  async eliminarHeroePorNombre(valor) {

    //console.log(`Se elimina a:`, valor); 
    return await superHero.findOneAndDelete({ nombreSuperHeroe: valor });
  }


}

export default new superHeroRepository();










// ----------------------------------------------------------------

// Errores
/**
    const encontrarSuperheroes = IRepository.obtenerTodos(); 
    superHero.filter(hero => hero.edad > 30 );

    const encontrarSuperheroe = superHero.obtenerTodos(); 
    superHero.filter(hero => hero.edad > 30 );

   * no se puede porque justamente estoy armando la logica, 
    por tanto no puedo implementar el metodo
    _____________________________________________
 
    superHero.filter(hero => hero.edad > 30 );
    ------------------------------------------
    ("error":"superHero.filter is not a function") 
    
    * significa que filter se utiliza para arrays. Y superHero no
    es un array. 
  --------------------------------------------
*/
