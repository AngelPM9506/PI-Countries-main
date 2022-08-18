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
        if (!Array.isArray(req.body)) return res.status(400).json({ message: 'Datos no compatibles' });
        let datas = req.body;
        let responces = []
        for (const data of datas) {
            let { name, code } = data;
            if (!name || name === '' || !code || code === '') {
                responces.push({ message: 'Faltan datos necesarios', data });
            } else {
                let country = await Country.findByPk(code.toUpperCase());
                let travel = await Travel.findOne({ where: { name: name } });
                if (!country) {
                    responces.push({ message: `Codigo ${code} no encontrado`, data });
                } else {
                    try {
                        let newActivity;
                        if (!travel) {
                            newActivity = await country.createTravel(data);
                        } else {
                            newActivity = await country.addTravel(travel);
                        }
                        if (newActivity) {
                            responces.push({
                                status: 'success',
                                message: `Exito al crear/agregar ${name} al codigo ${code}`,
                                travel: travel ? travel : '',
                                newActivity
                            });
                        } else {
                            responces.push({
                                status: 'error',
                                message: `Esta actividad ya esta agregada al codigo ${code}`,
                                data
                            });
                        }

                    } catch (error) {

                        responces.push({
                            status: 'error',
                            error: error.message,
                            message: 'Error al guardar nueva actividad'
                        });
                    }
                }
            }


        }
        res.status(201).json(responces);
    }
}

module.exports = TravelController;