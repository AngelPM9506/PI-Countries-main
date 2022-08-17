const { Country, Travel, Op } = require('../db');

const CountryController = {
    /**obtener todos o cargar la base de datos */
    getAll: async (req, res) => {
        let { name } = req.query;
        let condicion = {
            include: [Travel]
        };
        condicion.where = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
        /**si tenemos el query name se tiene que buscar por el valor proporcionado */
        try {
            let countries = await Country.findAll(condicion);
            if (countries.length === 0 && name) {
                return res.status(404).json({ message: `No se encontró ningúna coincidencia de país con: ${name}` });
            }
            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    /**obtener los continentes*/
    getContinents: async (req, res) => {
        try {
            let continents = [];
            let findedContinents = await Country.findAll({ attributes: ['continente'], group: 'continente' });
            findedContinents.forEach(conti => {
                continents.push(conti.continente)
            });
            res.status(200).json(continents);
        } catch (error) {
            console.log(error);
        }
    },
    /**encontrar uno en la base de datos */
    findByCode: async (req, res) => {
        let { code } = req.params;
        try {
            let country = await Country.findByPk(code.toUpperCase(), { include: [Travel] });
            if (country) {
                res.status(200).json(country);
            } else {
                res.status(404).json({ message: `El codigo ${code} no pertenece a ningún país registrado` });
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    /**filtrado */
    filterAndOrder: async (req, res) => {
        let { continent, travel, tyOrder, orderBy } = req.query;
        if (!tyOrder || tyOrder === '') tyOrder = 'ASC';
        if (!orderBy || orderBy === '') orderBy = 'name';
        let condicion = {
            where: continent ? { continente: continent } : {},
            order: [[orderBy, tyOrder]]
        }
        if (travel && travel !== '') condicion.include = { model: Travel, where: { name: travel } };
        try {
            let resp = await Country.findAll(condicion)
            res.status(200).json(resp);
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}

module.exports = CountryController;

