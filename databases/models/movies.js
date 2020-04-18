const sequelize = require('../database')
const DataTypes = require('sequelize')

module.exports = sequelize.define('movies', {
  movie: {
    type: DataTypes.STRING
  },
  popularity: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
})