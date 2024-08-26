const {DataTypes} = require('sequelize')

const sequelize = require('../config/database')

const Skills = sequelize.define('skills', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});


module.exports = Skills;