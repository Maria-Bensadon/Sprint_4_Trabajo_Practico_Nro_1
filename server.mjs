
import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';
import 'dotenv/config';


const server = express();

const PORT = process.env.PORT || 3000;

server.set('view engine', 'ejs');// Motor de plantillas ejs
server.use(expressLayouts);// Configurar express-ejs-layout
server.set('layout', 'layout'); // archivo base de layout
server.use(express.static('public'));// carpeta publica
server.use(express.json());// Middleware para parsear JSON
server.use(express.urlencoded({ extended: true }));// recibe el texto y lo convierte a un objeto javascript
server.use(methodOverride('_method'));
server.get('/', (req, res) => {
    res.redirect('/api');
});
server.use('/api', superHeroRoutes);
connectDB();

server.use((req, res) => {
    res.status(404).send({ mensaje: `Ruta no encontrada` });
});


server.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

