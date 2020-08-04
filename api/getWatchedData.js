const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const User = require('../databases/models/users')
const jwt = require('jsonwebtoken')
const authChecker = require('../middleware/authChecker')

router.get('/', authChecker, async(req, res) => {
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

    const movieList = await Promise.all(watchedList.map(async movie => {

      const response = await fetch(`http://localhost:8080/api/movie/${movie}`).catch(err => {
          res.status(500).json({
              error: 'Internal Error'
          })
      })

      const movieData = await response.json().catch(err => {
          res.status(500).json({
              error: 'Internal Error'
          })
      })

      return {
        img: `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`,
        title: movieData.title
      }

    }))

    res.send(movieList)
})


module.exports = router