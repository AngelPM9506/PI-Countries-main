const axios = require('axios').default;
const { Country } = require('../db.js');

/**buscar ciudades en la base de datos */
async function findCountries() {
    let newCountries;
    let toSavedCountries;
    try {
        await axios.get('https://restcountries.com/v3/all')
            .then(resp => newCountries = [...resp.data]);
        toSavedCountries = newCountries.map(country => {
            return ({
                code: country.cca3,
                name: country.name.common,
                image: country.flags.join('|;|'),
                continente: country.region,
                capital: country.capital ? country.capital[0] : 'Unknow',
                subregion: country.subregion,
                area: country.area,
                poblacion: country.population,
                maps: country.maps.googleMaps,
                timezones: country.timezones.join('|;|')
            })
        });
        await createCountries(toSavedCountries);
        console.log('exito al llenar DB');
    } catch (error) {
        //console.log(error);
    }
}

async function createCountries(countries = []) {
    try {
        await Country.bulkCreate(countries)
    } catch (error) {
        //console.log(error);
    }
}

module.exports = {
    findCountries
}