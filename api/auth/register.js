const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const Movie = require('../../databases/models/movies')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const upsertMovie = async (value) => {
  let movie = await Movie.findOne({where: {movie: value}}).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  if (movie === null) {
    await Movie.create({movie: value, popularity: 1}).catch(err => {
      res.status(500).json({
        error: 'Internal Error'
      })
    })
  } else {
    ++movie.popularity
    await movie.save().catch(err => {
      res.status(500).json({
        error: 'Internal Error'
      })
    })
  }
}

router.post('/', express.json(), async (req, res) => {
  let user = await User.findOne({where: {username: req.body.username}}).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })

  if (user === null) {
    const {
      username, 
      password, 
      occupation, 
      age, 
      movie1, 
      movie2, 
      movie3
    } = req.body

    const hash = await bcrypt.hash(password, 12).catch(err => {
      if (err) {
        res.status(500).json({
          error: 'Internal Error'
        })
      }
    })  
    
    user = await User.create({
      username: username, 
      password: hash, 
      occupation: occupation, 
      age: age, 
      watched: [movie1, movie2, movie3]}).catch(err => {
        res.status(500).json({
        error: 'Internal Error'
      })
    })

    await upsertMovie(req.body.movie1)
    await upsertMovie(req.body.movie2)
    await upsertMovie(req.body.movie3) 
    
    const payload = {username: user.username}

    const token = jwt.sign(payload, 'secret', {
      expiresIn: '1h'
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: false
    }).sendStatus(200)

  } else {
    res.status(401).json({
      error: 'Username Taken'
    })
  }
})

module.exports = router