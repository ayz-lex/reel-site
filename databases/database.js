const Sequalize = require('sequelize')

require('dotenv').config()

DATABASE_URL = 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME

module.exports = new Sequalize(DATABASE_URL)