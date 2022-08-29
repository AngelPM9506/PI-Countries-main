const { Travel, conn } = require('../../src/db');
const { expect } = require('chai');

const dataTravel = {
    name: "Cañon del sumidero",
    dificultad: 3,
    duracion: '1 Día',
    temporada: 'Invierno',
}

describe('Travel model test', () => {
    before(() => {
        conn.authenticate()
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });
    });

    describe('Inicialización de la tabla\n', () => {
        beforeEach(async () => {
            await Travel.sync({ force: true });
        });
        /**Comprobar estado inicial */
        describe('Estado inicial de la base de datos Travel:', () => {

            it('Verificar que retorna un array al buscar', async () => {
                var allCountries = await Travel.findAll();
                expect(allCountries).to.be.an('array');
            });

            it('Verificar que no retorna inmediatamente despues de ser creada', async () => {
                var allCountries = await Travel.findAll();
                expect(allCountries.length).to.be.equal(0);
            });
        });

        /**Almacenamiento de datos y validacion */
        describe('Validar datos', () => {

            it('Retornar errors si hace falta el atributo name', async () => {
                let deleteItem = {};
                for (const key in dataTravel) {
                    if (key !== 'name') {
                        deleteItem[key] = dataTravel[key];
                    }
                }
                let { errors: [ValidationErrorItem] } = await Travel.create(deleteItem).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'travel.name cannot be null' });
            });

            it('Retornar errors si la dificultad es mayor a 5', async () => {
                let deleteItem = {};
                for (const key in dataTravel) {
                    if (key === 'dificultad') {
                        deleteItem[key] = 7;
                    } else {
                        deleteItem[key] = dataTravel[key];
                    }
                }
                let { errors: [ValidationErrorItem] } = await Travel.create(deleteItem).catch(error => error);
                //console.log(ValidationErrorItem);
                expect(ValidationErrorItem).to.deep.include({ message: 'Validation max on dificultad failed' });
            });

            it('Retornar errors si la dificultad es menor a 1', async () => {
                let deleteItem = {};
                for (const key in dataTravel) {
                    if (key === 'dificultad') {
                        deleteItem[key] = 0;
                    } else {
                        deleteItem[key] = dataTravel[key];
                    }
                }
                let { errors: [ValidationErrorItem] } = await Travel.create(deleteItem).catch(error => error);
                //console.log(ValidationErrorItem);
                expect(ValidationErrorItem).to.deep.include({ message: 'Validation min on dificultad failed' });
            });

            it('Retornar errors si hace falta el atributo duracion', async () => {
                let deleteItem = {};
                for (const key in dataTravel) {
                    if (key !== 'duracion') {
                        deleteItem[key] = dataTravel[key];
                    }
                }
                let { errors: [ValidationErrorItem] } = await Travel.create(deleteItem).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'travel.duracion cannot be null' });
            });

            it('Retornar errors si hace falta el atributo temporada', async () => {
                let deleteItem = {};
                for (const key in dataTravel) {
                    if (key !== 'temporada') {
                        deleteItem[key] = dataTravel[key];
                    }
                }
                let { errors: [ValidationErrorItem] } = await Travel.create(deleteItem).catch(error => error);
                expect(ValidationErrorItem).to.deep.include({ message: 'travel.temporada cannot be null' });
            });

            it('No Tener ningun dato almacenado despues de estas pruebas', async () => {
                let allTravels = await Travel.findAll();
                expect(allTravels).to.be.an('array');
                expect(allTravels.length).to.be.equal(0);
            });
        });

        describe('Almacenar datos', () => {
            it('Gardar nuevo travel si se tienen todos los datos correctos', async () => {
                let newTravel = await Travel.create(dataTravel);
                expect(newTravel).to.deep.include(dataTravel);
            });

            it('No gardar si el nombre se repite en la base de datos', async () => {
                let newTravel = await Travel.create(dataTravel);
                let newTravel2 = await Travel.create(dataTravel).catch(error => error);
                let { name } = newTravel2
                expect(name).to.deep.include('SequelizeUniqueConstraintError');
            })

            it('Si no se manda el parametro dificultad se debe almacenar por defecto con el valor 5', async () => {
                let dataItem = {}
                for (const key in dataTravel) {
                    if (key !== 'dificultad') {
                        dataItem[key] = dataTravel[key];
                    }
                }
                let newTravel = await Travel.create(dataItem);
                expect(newTravel).to.deep.include({ dificultad: 5 });
            })
        });
    });
});