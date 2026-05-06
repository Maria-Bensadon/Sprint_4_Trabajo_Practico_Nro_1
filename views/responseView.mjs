
/** 
    * Paso 6 = Vista
      __________________________________________________________________________

    * Define las funciones de presentación de los datos, organizando la 
      informacion de los superheroes en un formato estructurado.

*/

export function renderizarSuperheroe(superheroe) {

    return {

        // estructura de la vista
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos, 
        Creador: superheroe.creador

    };
}

export function renderizarListaSuperheroes(superheroes) {

    return superheroes.map(superheroe => renderizarSuperheroe(superheroe)); 
}


