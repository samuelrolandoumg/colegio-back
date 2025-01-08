const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'railway', // Nombre de la base de datos
  'root',    // Usuario
  'GCoZjnUxQukenDbUQppPwaNmioRgxgYb', // Contraseña
  {
    host: 'mysql.railway.internal',
    port: 3306,
    dialect: 'mysql',
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
