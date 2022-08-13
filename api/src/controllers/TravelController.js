const { Travel, Country } = require('../db');

const TravelController = {
    getAll: async (req, res) => {
        let travels = await Travel.findAll({include: [Country]});
        if (travels.length === 0) {
            return res.status(404).json({message: 'Aun no se registra ninguna actividad'})
        }
        res.json(travels);
    },
    newActivity: async (req, res) => {
        let { name, dificultad, duracion, temporada, code } = req.body;
        console.log(req.body);
        let args = { name, dificultad, duracion, temporada };
        if (!name, !duracion, !temporada, !code) return res.status(400).json({ message: 'Faltan datos necesarios' });
        let country = await Country.findByPk(code.toUpperCase());
        if (!country) return res.status(400).json({ message: 'País no encontrado' });
        try {
            let newActivity = await country.createTravel(args);
            res.status(201).json(newActivity);
        } catch (error) {
            res.json({ error: error.message, message: 'Error al guardar nueva actividad' });
        }
    }
}

module.exports = TravelController;