##### Diplomatura Universitaria en Desarrollo Web Full Stack con JavaScript
##### Módulo 3 - BackEnd con node.js

--- 

# Sprint 3 - Trabajo Práctico Nro 3: Dashboard Dinámico

### Requerimientos básicos generales
1. Levantar un servidor Express en el puerto 3005.
2. El servidor debe escuchar varias rutas GET:
    - /superheroes/id/:id: Recibe un ID de superhéroe y devuelve los datos de ese 
    superhéroe o un mensaje si no fue encontrado.
    - /superheroes/atributo/:atributo/:valor: Recibe un atributo (por ejemplo, 
    nombre o poder) y devuelve una lista de superhéroes que cumplen con ese criterio.
    - /superheroes/edad/mayorA30: Devuelve una lista de superhéroes mayores de 30 años
    que además sean del planeta Tierra y tengan al menos 2 poderes.

### Requerimientos Específicos del Trabajo Práctico N°3


<details>

### Requerimientos Específicos del Trabajo Práctico N°2
Este practico se enfoca en agregar validaciones para proteger del servidor de errores 
y equivocaciones de los usuarios, volviendolo mas robusto.

 - nombreSuperheroe debe validarse que sea requerido, no tenga espacios 
 en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60

 - nombreReal debe validarse que sea requerido, no tenga espacios en 
 blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60

 - edad debe validarse que sea requerido, que sea un numero, no tenga espacios 
 en blanco(trim), valor minimo 0 (no admite edad negativa)

 - poderes debe validarse que sea requerido, que sea un array de string cuyo 
 tamaño no sea 0, cada elemento no tenga espacios en blanco, cada elemento una 
 longitud minima de 3 caracteres y una longitud maxima de 60

 </details>

### Flujo

<details> 
SPRINT 3 - TP NRO 2 ---------------------------------------------------------------------
Se aplica el Middleware Express-Validator en los métodos PUT y POST, para
asegurarnos que la información que ingrese a la base de datos tengan el formato adecuado 
y cumplan con las reglas establecidas. 

 1) "validationRules.mjs"  => se define la funcion "validarHeroe()" como un array con las 
 reglas antes mencionadas, y se ejecuta antes de que la request llegue al controlador. Analiza 
 cada propiedad en el body de la request, y si alguno no cumple al menos una de las reglas 
 antes mencionadas, express-validator guardara en el campo correspondiente dentro de la request, 
 un mensaje de error que explicara porque la regla falla (.withMessage).

 2) "handleValidationErrors.mjs" => La funcion "handleValidationErrors" leera la request y buscara 
 los mensajes de error utilizando "validationResult(req)". En el momento que encuente al menos una 
 regla incumplida devuelve el error (400), mostrando la propiedad correspondiente con su mensaje 
 de error. En caso de que no haya errores, el flujo de trabajo continua (next()).

Dentro del flujo general, podemos decir que el middleware se ejecuta entre Routes y Controller. Por 
lo que si la informacion es correcta y tiene el formato correspondiente, el controller recibe la 
request. En caso contrario, el flujo se interrumpe para mostrar que la informacion es inválida, 
utilizando los mensajes de error que explicaran cual fue el fallo para facilitar la correcion.

SPRINT 2 ---------------------------------------------------------------------------------------
Mediante las rutas, el cliente accede a una peticion especifica o request consultando un recurso 
(método GET). Este request, vuelve al backend del servidor para gestionar el pedido y poder 
devolver una respuesta o response.
El controlador es quien recibe la solicitud y extrae los parametros de la ruta. A continuacion, se 
comunica con la capa de Servicios que sirve como intermediario con la capa de Repositorio. Dentro de 
esta ultima capa, tenemos una interfaz (donde declamos los métodos a utilizar), y una implementacion 
(donde definimos la logica de dichos metodos). Para que el repositorio obtenga los datos, debe 
conectarse con la capa de Modelo, que mediante el esquema (schema) y el modelo (modelo) obtiene el 
lugar y el tipo de dato que necesita buscar en la base de datos. 
Obtenido el o los dato/s, estos se devuelven al controlador quien utiliza funciones de la vista, que 
estructuran como va a ser visualizada la respuesta por el cliente o usuario. 
</details>


### Estructura del Trabajo Práctico

Sprint_3_TP_Nro_3/
    ├── config/
    │   └── dbConfig.mjs             # Configuración y conexión a la base de datos 
    ├── controllers/
    │   └── superHeroControllers.mjs  # Gestión de solicitudes HTTP y respuestas 
    ├── models/
    │   └── superHero.mjs            # Definición del esquema de Mongoose 
    ├── node_modules/                # Dependencias instaladas (npm)
    ├── repositories/
    │   ├── IRepository.mjs          # Interfaz / Clase base para el repositorio
    │   └── superHeroRepository.mjs  # Lógica de acceso a datos
    ├── routes/
    │   └── superHeroRoutes.mjs      # Definición de endpoints y rutas API
    ├── services/
    │   └── superheroesService.mjs   # Lógica de negocio e intermediario 
    ├── validation/
    │   └── validationRules.mjs      # Reglas de validacion
    ├── validationResults/
    │   └── handleValidationErrors.mjs   # Resultado de la validacion realizada 
    ├── views/
    │   └── responseView.mjs         # Formateo de salida de datos para el cliente
    |   └── dashboard.ejs            # Vista Principal de salida de datos para el cliente
    |   └── addSuperhero.ejs         # Formulario para agregar superheroes
    |   └── editSuperhero.ejs        # Formulario para editar superheroes 
    ├── .gitignore                   # Archivos y carpetas excluidos de Git
    ├── package-lock.json            # Historial exacto de versiones de dependencias
    ├── package.json                 # Configuración del proyecto y scripts
    ├── README.md                    # Documentación general del proyecto
    ├── server.mjs                   # Punto de entrada y arranque del servidor 
    └── Sprint 3 Documentacion V1.0.1.pdf  # Documentación

*** La numeracion de los pasos, corresponde al orden de desarrollo del trabajo practico realizado.

<details> 
En el Trabajo Práctico Nro 1, ampliamos la funcionalidad del servidor mediante la adicion 
de los siguientes endpoints: 

    - POST => esta ruta permite crear e insertar un nuevo superheroe en la base de datos, y 
    devolver el superheroe creado
    - PUT => este tipo de peticion sirve para actualizar un superheroe en la base de datos, 
    y devolver el superheroe modificado.
    - DELETE => Aqui, el request sirve para borrar un superheroe por ID en la base de datos. 
    La response, será el superheroe borrado
             => en este caso, se borrara un superheroe por NOMBRE, y la responde mostrara al mismo. 

Desarrollamos un servidor que se conecta a la colección "NodeMod3Cohorte5" en la base de datos MongoDB. 
Usando el Modelo MVC (+ capa de servicios, repositorio, rutas, y configuracion del MongoDB) armamos el 
proyecto de forma que las diferentes actividades esten ordenadas y sean independientes, permitiendo 
mejorar su escalabilidad y mantenibilidad.

</details>


###### María Gabriela Centeno Bensadón
###### Año 2026










