const { Travel, Country } = require('../db');

const TravelController = {
    /**obtener todas las actividades */
    getAll: async (req, res) => {
        let travels = await Travel.findAll({ include: [Country] });
        if (travels.length === 0) {
            return res.status(404).json({ message: 'Aun no se registra ninguna actividad' })
        }
        res.status(200).json(travels);
    },
    /**Crear nueva actividad */
    newActivity: async (req, res) => {
        let { name, dificultad, duracion, temporada, code } = req.body;
        let args = { name, dificultad, duracion, temporada };
        let newActivity;
        if (!name, !duracion, !temporada, !code) return res.status(400).json({ message: 'Faltan datos necesarios' });
        let country = await Country.findByPk(code.toUpperCase());
        let travel = await Travel.findOne({ where: { name: name } });
        if (!country) return res.status(400).json({ message: 'País no encontrado' });
        try {
            if (!travel) {
                newActivity = await country.createTravel(args);
            } else {
                newActivity = await country.addTravel(travel);
            }
            if (newActivity) {
                res.status(201).json(newActivity);
            } else {
                res.status(202).json({ message: `Esta actividad ya esta agregada al codigo ${code}` });
            }
            
        } catch (error) {
            res.json({ error: error.message, message: 'Error al guardar nueva actividad' });
        }
    }
}

module.exports = TravelController;