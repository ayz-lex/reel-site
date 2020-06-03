const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const Movie = require('../../databases/models/movies')
const bcrypt = require('bcrypt')

const upsertMovie = async (value) => {
  let movie = await Movie.findOne({where: {movie: value}})
  if (movie === null) {
    await Movie.create({movie: value, popularity: 1})
  } else {
    ++movie.popularity
    element.save()
  }
}

const createUser = async (req) => {
  let user = await User.findOne({where: {username: req.body.username}})
  if (user === null) {
    const {username, password, occupation, age, movie1, movie2, movie3} = req.body
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) throw err
      req.session.data = await User.create({username: username, password: hash, occupation: occupation, age: age, watched: [movie1, movie2, movie3]})
    })
    return false
  } else {
    return true
  }
}

router.post('/', express.json(), async (req, res) => {
  let checkCreated = await createUser(req)
  if (!checkCreated) {
    await upsertMovie(req.body.movie1)
    await upsertMovie(req.body.movie2)
    await upsertMovie(req.body.movie3)
    res.send(res.sessionID)
  } else {
    res.send('NO')
  }
})

module.exports = router