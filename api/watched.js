const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const User = require('../databases/models/users')
const jwt = require('jsonwebtoken')
const authChecker = require('../middleware/authChecker')
require('dotenv').config()

router.get('/', authChecker, async (req, res) => {

  const token = req.cookies.token
  const decoded = jwt.decode(token)
  const username = decoded.username

  const user = await User.findOne({where: {username: username}}).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })

  if (user === null) {
    res.status(404).json({
      error: 'User not found'
    })
  }

  const watchedList = user.watched

  
  const watchedData = await Promise.all(watchedList.map(async movie_id => {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}`).catch(err => {
      res.status(500).json({
        error: 'Internal Error'
      })
    })

    let data = await response.json().catch(err => {
      res.status(500).json({
        error: 'Internal Error'
      })
    })
    return data.id
  }))
  

  res.send(watchedData)
})

module.exports = router