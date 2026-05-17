
import mongoose from 'mongoose';
import { setServers } from 'node:dns/promises';
setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Conexión exitosa a MongoDB`);
    }

    catch (error) {
        console.error(`Error al conectar a MongoDB:`, error);
        process.exit(1);
    }
}




