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
const port = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:4200', // Permitir la URL del front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Configurar CORS
// Middleware global para CORS y configuración de encabezados
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Permitir tu frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Responder de inmediato a las solicitudes preflight
    }
    next();
});

app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

//middleware
app.use(express.json());
app.options('*', cors());

// Swagger Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//rutas
app.use('/api/mitabla', MiTablaRoutes);
app.use('/api/entregas', entregasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tareas', tareasRoutes); 
app.use('/api/profesor', profesorRoutes);
app.use('/api/notas', notasRoutes);

// Sincronización de modelos y arranque del servidor
(async function startServer() {
    await sequelize.authenticate();
    app.listen(port, () => {
    });
})();
