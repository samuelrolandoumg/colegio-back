const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API del Colegio',
            version: '1.0.0',
            description: 'Documentación de la API del sistema del colegio',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./routes/*.js'], // Indica dónde buscar las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
