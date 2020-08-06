const sequelize = require('../database')
const DataTypes = require('sequelize')

module.exports = sequelize.define('users', {
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.TEXT
  },
  watched: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  }
}, {
  timestamps: false
})