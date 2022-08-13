const axios = require('axios').default;

/**buscar ciudades en la base de datos */
async function findCountries() {
    let newCountries;
    await axios.get('https://restcountries.com/v3/all').then(resp => newCountries = [...resp.data]);
    let toSavedCountries = newCountries.map(country => {
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
    return toSavedCountries;
}

module.exports = {
    findCountries
}