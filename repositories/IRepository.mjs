/** 
 * Paso 3 - a) = Capa de persistencia
 * Interfaz CRUD
   ______________________________________________
 * Esta interfaz define los metodos CRUD estandar, en este caso,
   obtenerPorId(), obtenerTodos(), buscarPorAtributo(). 
 
 *  Solamente los "declaramos", y le ponemos un mensaje de alerta. 
    La lógica de estos metodos, va a estar en la capa de implementacion
    Entonces, si se intenta aplicar uno de estos metodos, 
    y en la implementacion no esta la logica, el programa
    lanzara el  por ejemplo: "throw new Error (`Método 'obtenerPorId()' 
    no implementado`); ". Esto permite marcar los lugares donde podrian 
    haber errores, facilitando su busqueda y correccion. 
    
 * Nota: Sin el "throw new Error", si el programa falla, Node.js entregaria un 
   mensaje de error genérico como: "TypeError: Cannot read property 'nombre' 
   of undefined"
 * 
*/


class IRepository {


    // primer metodo
    obtenerPorId(id) {

        /** 
         * se detecta un nuevo error y se interrumpe la ejecucion
         * del codigo 
        */
        throw new Error(`Método 'obtenerPorId()' no implementado`);
    }

    // segundo metodo
    obtenerTodos() {

        throw new Error(`Método 'obtenerTodos()' no implementado`);
    }

    // tercer metodo
    buscarPorAtributo() {

        throw new Error(`Método 'buscarPorAtributo()' no implementado`);
    }

    // cuarto metodo
    obtenerMayoresDe30() {

        throw new Error(`Método 'obtenerMayoresDe30()' no implementado`);
    }


    // __________________________________________________________________________
    //         SPRINT 3 - TRABAJO PRACTICO N°1
    // __________________________________________________________________________

    // quinto metodo --- POST
    crearHeroe() {
        throw new Error(`Método 'crearHeroe()' no implementado`);
    }

    // sexto metodo a) --- PUT
    actualizarHeroe() {

        throw new Error(`Método 'actualizarHeroe()' no implementado`);
    }

    // sexto metodo b) --- GET
    editarHeroe() {

        throw new Error(`Método 'editarHeroe()' no implementado`);
    }

    // septimo metodo --- DELETE
    eliminarHeroe() {

        throw new Error(`Método 'eliminarHeroe()' no implementado`);
    }

    // octavo método --- DELETE por nombre
    eliminarHeroePorNombre() {
        throw new Error(`Método 'eliminarHeroePorNombre()' no implementado`);
    }

}


export default IRepository;








// ##################################################################################################################################

/*
    CLASES VS FUNCIONES
    ___________________________________________________________
   
   * Clases => son funciones especiales que admiten herencia. Son estructuras
    para crear objetos que guardan o agrupan propiedades y métodos. 
    Pueden ser declaradas o expresadas.
        * Declaradas: 
           - class IRepository { ... }
        * Expresadas: 
           -  let IRepository = class { ... }; // la clase toma el nombre de la variable que la guarda
           -  let IRepository = class Repo { ... }; // la clase posee un nombre propio

    ** NOTA : "extends" se usa para crear una subclase o clase hija. 
    Por ejemplo: 
        - class superHeroRepository extends IRepository { ... }

   (ver capa de implementacion) 
    --------------------------------------------------------------------------
   
   * Funciones => es un procedimiento reutilizable que posee una o varias instrucciones, 
    que devuelven un resultado o valor, es decir, realiza una tarea especifica. Las 
    funciones deben ser declaradas, con calculos o instrucciones lógicas, retornar 
    un valor y ser invocadas (junto con los datos que seran procesados). 

    Por ejemplo: 
    *** declarar una funcion
    function square(number) {
        return number * number    
    }

    *** invocarla
    generica: square(number)
    con datos: square(2)

    --------------------------------------------------------------------------

    ** Diferencias
    
    1) las clases admiten herencias, las funciones no.
    2) las funciones ejecutan tareas pequeñas, o especificas que no necesitan
    herencia. Mientras que las clases se usan para estructurar datos de forma compleja, 
    se requiera herencia, o se necesite gestionar el estado de la estructura (datos
    y metodos). 

*/
