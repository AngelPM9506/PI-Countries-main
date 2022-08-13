const { Country, Travel, Op } = require('../db');
const { findCountries } = require('../functios');

const CountryController = {
    /**obtener todos o cargar la base de datos */
    getAll: async (req, res) => {
        let { name } = req.query;
        let condicion = { attributes: ['code', 'name', 'image', 'continente'] };
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
    }
}

module.exports = CountryController;

