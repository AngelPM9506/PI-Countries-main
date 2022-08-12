const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('travel', {
        name: {
            type: DataTypes.STRING
        },
        dificultad: {
            type: DataTypes.INTEGER
        },
        duration: {
            type: DataTypes.STRING
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    });
}