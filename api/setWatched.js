const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')
const sequelize = require('../databases/database')
const authChecker = require('../middleware/authChecker')
const jwt = require('jsonwebtoken')

router.post('/', authChecker, express.json(), async (req, res) => {
  const token = req.cookies.token
  const decoded = jwt.decode(token)
  const username = decoded.username

  //any better way of doing this?
  await User.update(
    {
      watched: sequelize.fn('array_append', sequelize.col('watched'), req.body.id)
    },
    {
      where: {
        username: username
      }
    }
  ).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  
  res.sendStatus(200)
})

module.exports = router