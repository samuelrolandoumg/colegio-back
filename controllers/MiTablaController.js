const MiTabla = require('../models/MiTabla');

//ruta obtener todos los registros
const getAllData = async (req, res) => {
    try {
      const registros = await MiTabla.findAll({
        order: [['id_version', 'ASC']],
      });
      res.status(200).json(registros); // Devuelve los registros como JSON
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ message: 'Error al obtener los datos.' });
    }
  };

module.exports = {getAllData};