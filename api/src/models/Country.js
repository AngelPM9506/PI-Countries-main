const { DataTypes } = require('sequelize');
const { get } = require('../routes/CountryRoutes');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('country', {
    code: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      // get(){
      //   let value = this.getDataValue('code');
      //   return value ? `API-${value}`: null;
      // }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        let value = this.getDataValue('image');
        return value.split('|;|');
      }
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER
    },
    poblacion: {
      type: DataTypes.INTEGER
    },
    maps: {
      type: DataTypes.STRING
    },
    timezones: {
      type: DataTypes.STRING,
      get() {
        let value = this.getDataValue('timezones');
        return value.split('|;|');
      }
    }
  });
};
