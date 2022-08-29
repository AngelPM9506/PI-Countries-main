const { Country, conn } = require('../../src/db.js');
const { findCountries } = require('../../src/functios');
const { expect } = require('chai');


var dataCountry = {
    "code": "MEX",
    "name": "Mexico",
    "capital": "Mexico City",
    "continente": "Americas",
    "subregion": "North America",
    "image": [
        "https://flagcdn.com/mx.svg",
        "https://flagcdn.com/w320/mx.png"
    ].join('|;|'),
    "timezones": [
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00"
    ].join('|;|'),
    "area": 1964375,
    "poblacion": 128932753,
    "maps": "https://goo.gl/maps/s5g7imNPMDEePxzbA"
}

describe('\nCountry model test\n', () => {

    /**iniciando conexion a la BD */
    before(() => {
        conn.authenticate()
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });
    });

    /**primeras pruebas sync y tablas */
    describe('Inicialización de la tabla\n', () => {
        beforeEach(async () => {
            await Country.sync({ force: true })
        });
        /**Comprobar estado inicial */
        describe('Estado inicial de la base de datos Countries:', () => {

            it('Verificar que retorna un array al buscar', async () => {
                var allCountries = await Country.findAll();
                expect(allCountries).to.be.an('array');
            });

            it('Verificar que no retorna inmediatamente despues de ser creada', async () => {
                var allCountries = await Country.findAll();
                expect(allCountries.length).to.be.equal(0);
            });
        });
    });

    /**almacenamiento de datos y validacion */
    describe('\nValidar y guardar datos\n', () => {
        beforeEach(async () => {
            await Country.sync({ force: true });
        });
        /**gardar datos de forma correcta */
        describe('validar y almacenar datos: ', () => {

            it('Retornar errors si hace falta el atributo code', async () => {
                let deleteName = {};
                for (const key in dataCountry) {
                    if (key !== 'code') {
                        deleteName[key] = dataCountry[key]
                    }
                }
                let { errors: [ValidationErrorItem] } = await Country.create(deleteName).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'country.code cannot be null' });
            });

            it('Retornar errors si hace falta el atributo nombre', async () => {
                let deleteName = {};
                for (const key in dataCountry) {
                    if (key !== 'name') {
                        deleteName[key] = dataCountry[key]
                    }
                }
                let { errors: [ValidationErrorItem] } = await Country.create(deleteName).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'country.name cannot be null' });
            });

            it('Retornar errors si hace falta el atrubuto image', async () => {
                let deleteName = {};
                for (const key in dataCountry) {
                    if (key !== 'image') {
                        deleteName[key] = dataCountry[key]
                    }
                }
                let { errors: [ValidationErrorItem] } = await Country.create(deleteName).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'country.image cannot be null' });
            });

            it('Retornar errors si hace falta el atrubuto continente', async () => {
                let deleteName = {};
                for (const key in dataCountry) {
                    if (key !== 'continente') {
                        deleteName[key] = dataCountry[key]
                    }
                }
                let { errors: [ValidationErrorItem] } = await Country.create(deleteName).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'country.continente cannot be null' });
            });

            it('Retornar errors si hace falta el atrubuto capital', async () => {
                let deleteName = {};
                for (const key in dataCountry) {
                    if (key !== 'capital') {
                        deleteName[key] = dataCountry[key]
                    }
                }
                let { errors: [ValidationErrorItem] } = await Country.create(deleteName).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'country.capital cannot be null' });
            });

            it('Hasta el Momento no se debe de guardar ningun dato enviado', async () => {
                let countries = await Country.findAll();
                expect(countries.length).equal(0);
            });

            it('Guardar un nuevo país datos correctos', async () => {
                let newCountry = await Country.create(dataCountry);
                let countries = await Country.findAll();
                expect(newCountry.dataValues)
                    .to.be.an('object')
                    .to.deep.include(dataCountry);
                expect(countries.length).equal(1);
            });
        })
    });
    /**retornar datos guardados */
    describe('\nObtener datos guardados\n', () => {
        beforeEach(async () => {
            await Country.sync({ force: true }).then(() => findCountries())
        });
        describe('Corroborar todos los datos obtenidos de la api', () => {
            it('Verificar los 250 países que debe encontrar la app', async () => {
                var allCountries = await Country.findAll();
                expect(allCountries).to.be.an('array');
                expect(allCountries.length).to.be.equal(250);
            });
        });
    });
});
