require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./Database/db');
const MiTablaRoutes = require('./routes/MiTablaRoutes');
const entregasRoutes = require('./routes/entregasRoutes');
const authRoutes = require('./routes/authRoutes');
const clasesRoutes = require('./routes/clasesRoutes');
const gruposRoutes = require('./routes/gruposRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const notasRoutes = require('./routes/notasRoutes');

require('./Database/relations');
const cors = require('cors');

const app = express();
//const port = process.env.PORT || 3000;
const { PORT } = require("./Database/db.config"); // Ruta corregida para importar la configuración
// Log de variables de entorno
console.log('Variables de entorno:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);
//const port = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:8080', 'https://colegio-front-production.up.railway.app'], // Agrega todos los dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Middleware global para CORS y configuración de encabezados
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'https://colegio-front-production.up.railway.app', 'http://localhost:8080'); // Permitir tu frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Responder de inmediato a las solicitudes preflight
    }
    next();
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Middleware
app.use(express.json());
app.options('*', cors());

// Swagger Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/mitabla', MiTablaRoutes);
app.use('/api/entregas', entregasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/profesor', profesorRoutes);
app.use('/api/notas', notasRoutes);

//Sincronización de modelos y arranque del servidor
// (async function startServer() {
//     try {
//         console.log('Intentando conectar a la base de datos...');
//         await sequelize.authenticate();
//         console.log('Conexión exitosa a la base de datos.');
        
//         app.listen(port, () => {
//             console.log(`Servidor corriendo en http://localhost:${port}`);
//         });
//     } catch (error) {
//         console.error('No se pudo conectar a la base de datos: ', error.message);
//         console.error('Stack trace:', error.stack);
//     }
// })();

sequelize.sync()
  .then(() => {
    console.log("Conexión exitosa y base de datos sincronizada.");
  })
  .catch((err) => {
    console.error("Error al conectar y sincronizar la base de datos: ", err.message);
  });
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
  });
