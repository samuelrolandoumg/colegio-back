
const Entregas = require('../models/Entregas');

exports.calificarEntrega = async (req, res) => {
    const { id_tarea, id_entrega, id_alumno, punteo } = req.params;
    console.log('id_tarea:', id_tarea);
    console.log('id_entrega:', id_entrega);
    console.log('id_alumno:', id_alumno);
    
    try {
        const entrega = await Entregas.findOne({
            where: { 
                id_entrega
            }
        });

        if (!entrega) {
            return res.status(404).json({ message: 'Entrega no encontrada' });
        }

        // Actualizamos la calificación
        entrega.calificado = true;
        entrega.punteo = parseFloat(punteo); // Convertimos el punteo a número
        await entrega.save();

        return res.status(200).json({
            message: 'Calificación actualizada correctamente.',
            entrega: {
                id_entrega: entrega.id_entrega,
                id_tarea: entrega.id_tarea,
                id_alumno: entrega.id_alumno,
                punteo: entrega.punteo,
                calificado: entrega.calificado
            }
        });
    } catch (error) {
        console.error('Error al calificar la entrega:', error);
        return res.status(500).json({ message: 'Error al calificar la entrega' });
    }
};

exports.obtenerPunteoActual = async (req, res) => {
    const { id_tarea, id_entrega, id_alumno } = req.params;

    try {
        const entrega = await Entregas.findOne({
            where: { 
                id_entrega
            }
        });

        if (!entrega) {
            return res.status(404).json({ message: 'Entrega no encontrada' });
        }

        return res.json({
            message: 'Punteo obtenido exitosamente',
            punteo: entrega.punteo
        });
    } catch (error) {
        console.error('Error al obtener el punteo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
