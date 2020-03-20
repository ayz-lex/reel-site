const sequelize = require('../database')
const DataTypes = require('sequelize')

module.exports = sequelize.define('users', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.TEXT
    },
    occupation: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
})