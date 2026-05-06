/**
 * Paso 2 = Modelo de datos
 * Modelo SuperHero
 * _____________________________________________
 * Establece la estructura y las reglas de validacion
   para los documentos que seran almacenados en 
   MongoDB. Por ejemplo: nombre del superheroe, nombre real, 
   edad del superheroe, debilidad, etc. 
 
 * Permite un control de calidad sobre los datos, 
   asi se garantiza que cada documento cumpla 
   con los requisitos del esquema (tipos de datos
   y campos obligatorios)

 * Los repositorios utilizan el esquema y el modelo para buscar
   la informacion correspondiente en MongoDB. Por ejemplo: mediante
   el modelo se "lee" la estructura para saber donde y que tipo de datos 
   para la funcion obtenerMayoresDe30() en la coleccion Grupo-05. 
  
 */

import mongoose from "mongoose";

const superHeroSchema = new mongoose.Schema(

  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: {type: String, default: 'Desconocido'},
    
    // sin corchetes = 1 solo valor
    debilidad: String,
    
    // con corchetes = 2+ valores
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador: String,
    createdAt: { type: Date, default: Date.now }
  }
);

/**
    Modelo = 'superHero'
    Esquema = superHeroSchema
    Coleccion = 'Grupo-05'
 */
const superHero = mongoose.model('superHero', superHeroSchema, 'Grupo-05');
export default superHero;

