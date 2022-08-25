/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(server);
const country = {
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
};

describe('Country routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Country.sync({ force: false })
    .then(() => Country.create(country)));
    
  describe('GET /countries', () => {
    it('should get 200', () => agent.get('/countries').then(resp => console.log(resp)));//agent.get('/countries').then(res => console.log(res)));
  });
});
