const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app');
const { conn, Country } = require('../../src/db');
const { findCountries } = require('../../src/functios');


//const agent = require('supertest-session')(require('../../src/app'));
const agent = session(app);

// const dataCountry = {
//   "code": "MEX",
//   "name": "Mexico",
//   "capital": "Mexico City",
//   "continente": "Americas",
//   "subregion": "North America",
//   "image": [
//     "https://flagcdn.com/mx.svg",
//     "https://flagcdn.com/w320/mx.png"
//   ].join('|;|'),
//   "timezones": [
//     "UTC-08:00",
//     "UTC-07:00",
//     "UTC-06:00"
//   ].join('|;|'),
//   "area": 1964375,
//   "poblacion": 128932753,
//   "maps": "https://goo.gl/maps/s5g7imNPMDEePxzbA"
// };

describe('Countries Routes', () => {

  before(() => {
    conn.authenticate()
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      });
  });

  beforeEach(() => {
    conn.sync({ force: true })
      .then(async () => {
        await findCountries();
      });
  });

  describe('GET / , pruebua', () => {

    it('Obtener estatus 200', async () => 
       agent.get('/').expect(function (resp) {
        console.log(resp.body);
        expect(resp.statusCode).to.equal(200);
      })
    );
  });
  
  describe('GET /countries', () => {

    it('Obtener estatus 200', async () => 
       agent.get('/countries').expect(function (resp) {
        console.log(resp.body);
        expect(resp.statusCode).to.equal(200);
      })
    );

  });

});

// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Country, conn } = require('../../src/db.js');

// const agent = session(app);
// const country = {
//   name: 'Argentina',
// };

// describe('Country routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Country.sync({ force: true })
//     .then(() => Country.create(pokemon)));
//   describe('GET /countries', () => {
//     it('should get 200', () =>
//       agent.get('/countries').expect(200)
//     );
//   });
// });