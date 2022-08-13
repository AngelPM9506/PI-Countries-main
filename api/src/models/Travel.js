const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('travel', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        dificultad: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        duracion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false
        }
    });
}