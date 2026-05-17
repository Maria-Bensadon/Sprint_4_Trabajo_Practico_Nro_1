

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
import { validarHeroe } from "../validation/validationRules.mjs";
import { handleValidationErrors, handleValidationErrorsAgregar } from "../validationResults/handleValidationErrors.mjs";


const router = express.Router();

router.get('/heroes/agregar', (req, res) => {
  res.render('addSuperhero', { title: 'Agregar Superheroe' });
});

router.get('/heroes/editar/:id', (req, res) => {
  res.render('editSuperhero', { title: 'Editar Superheroe' });
});


// http://localhost:3000/api/heroes
router.get('/', obtenerTodosLosSuperheroesController);


// http://localhost:3000/api/heroes/mayores-30
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

router.get('/heroes/:id/editar', obtenerSuperheroePorIdEditarController);

// http://localhost:3000/api/heroes/:id
router.get('/heroes/:id', obtenerSuperheroePorIdController);

// http://localhost:3000/api/heroes/buscar/:atributo/:valor
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

// http://localhost:3000/api/heroes/agregar
router.post('/heroes/agregar', (req, res, next) => {
  console.log('POST recibido:', req.body);
  next();
}, validarHeroe(), handleValidationErrorsAgregar, crearSuperheroeController);

// http://localhost:3000/api/heroes/:id/editar
router.put('/heroes/:id/editar', (req, res, next) => {
  console.log(`PUT recibido: `, req.body);
  next();
}, validarHeroe(), handleValidationErrors, actualizarSuperheroeController);

// http://localhost:3000/api/heroes/nombre/:valor
router.delete('/heroes/nombre/:valor', eliminarSuperheroePorSuNombreController);

// http://localhost:3000/api/heroes/:id
router.delete('/heroes/:id', eliminarSuperheroePorIdController);



export default router;

