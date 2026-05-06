

/** 
   * Paso 7 = Rutas API para superHero
     _________________________________________________

   *  
*/

import express from "express";
import {
  actualizarSuperheroeController,
  buscarSuperheroesPorAtributoController, crearSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorSuNombreController,
  obtenerSuperheroePorIdController, obtenerSuperheroePorIdEditarController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerTodosLosSuperheroesController
} from '../controllers/superHeroControllers.mjs';

// se importa validarHeroe -------------------------
import { validarHeroe } from "../validation/validationRules.mjs";
import { handleValidationErrors, handleValidationErrorsAgregar } from "../validationResults/handleValidationErrors.mjs";


const router = express.Router();

/** 
 * Endpoints GET
*/
// http://localhost:3000/api/heroes
router.get('/heroes', obtenerTodosLosSuperheroesController);


// http://localhost:3000/api/heroes/mayores-30
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

// GET - AGREGAR —> muestra el formulario vacío
router.get('/heroes/agregar', (req, res) => {
  res.render('addSuperhero');
});

// GET - EDITAR —> recibe los datos de la request
router.get('/heroes/:id/editar', obtenerSuperheroePorIdEditarController);

// http://localhost:3000/api/heroes/:id
router.get('/heroes/:id', obtenerSuperheroePorIdController);

// http://localhost:3000/api/heroes/buscar/:atributo/:valor
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);



// __________________________________________________________________________
//         SPRINT 3 - TRABAJO PRACTICO N°1
// __________________________________________________________________________

/** 
 * Endpoint POST
*/
// http://localhost:3000/api/heroes/agregar
router.post('/heroes/agregar', (req, res, next) => {
  console.log('POST recibido:', req.body);
  next();
}, validarHeroe(), handleValidationErrorsAgregar, crearSuperheroeController);

/** 
 * Endpoint PUT
*/
// http://localhost:3000/api/heroes/:id/editar
router.put('/heroes/:id/editar', (req, res, next) => {
  console.log(`PUT recibido: `, req.body);
  next();
}, validarHeroe(), handleValidationErrors, actualizarSuperheroeController);

/** 
 * Endpoints DELETE
*/

// http://localhost:3000/api/heroes/nombre/:valor
router.delete('/heroes/nombre/:valor', eliminarSuperheroePorSuNombreController);
// no es '/heroes/buscar/nombre/:valor' se superpondria con la ruta get de buscarPorAtributo
// 


// por id
// http://localhost:3000/api/heroes/:id
router.delete('/heroes/:id', eliminarSuperheroePorIdController);



export default router;




















/*
[
  {
        "nombreSuperHeroe": "Spiderman",
        "nombreReal": "Peter Parker",
        "edad": 25,
        "planetaOrigen": "Tierra",
        "debilidad": "Radioactiva",
        "poderes": ["Trepar paredes", "Sentido arácnido", "Super fuerza", "Agilidad"],
        "aliado": ["Ironman"],
        "enemigo": ["Duende Verde"]
    },

    {
    "nombreSuperHeroe": "Bruja-Escarlata",
    "nombreReal": "Wanda Maximoff",
    "edad": 36,
    "planetaOrigen": "Tierra",
    "debilidad": "inestabilidad emocional",
    "poderes": ["manipulación de probabilidades", "telequinesis", "telepatía", "vuelo"], 
    "aliados": ["Vision", "Quicksilver", "Vengadores"],
    "enemigos": ["Ultrón", "Thanos", "Agatha Harkness"],
    "creador": "Stan Lee"
  },

  {
    "nombreSuperHeroe: "Moon-Knight",
    "nombreReal: "Marc Spector",
    "edad: 40,
    "planetaOrigen: "Tierra",
    "debilidad: "inestabilidad mental", // o "TID"
    "poderes: ["Resistencia física", "fuerza superior", "inmortalidad condicionada"], 
    "aliados: ["Konshu", "Jean-Paul Duchamp"],
    "enemigos: ["Black Spectre", "Arthur Harrow"],
    "creador: "Don Perlin"

  },
  
  {
    "nombreSuperHeroe": "Daredevil",
    "nombreReal": "Matt Murdock",
    "edad": 40,
    "planetaOrigen": "Tierra",
    "debilidad": "Sobrecarga Sensorial",
    "poderes": ["Sentidos Aumentados", "Sentido Radar"], 
    "aliados": ["Karen Page", "Foggy Nelson", "White Tiger", "Punisher" ],
    "enemigos": ["Kingpin", "Bullseye"],
    "creador": "Stan Lee"

  }, 

  {
        "nombreSuperHeroe": "Botoxman",
        "nombreReal": "Peter Bower",
        "edad": 49,
        "planetaOrigen": "Tierra",
        "debilidad": "plantas",
        "poder": ["vision rayos x", "superfuerza"],
        "aliado": ["Spiderman"],
        "enemigo": ["Duende Verde"]
    }, 

    {
        "nombreSuperHeroe": "El Superviviente",
        "nombreReal": "Kelsier",
        "edad": 42,
        "planetaOrigen": "Scadrial",
        "debilidad": "Impulsividad",
        "poder": alomancia,
        "aliado": ["Rebeldes", ""],
        "enemigo": ["Duende Verde"]
    }
]
  
*/

















