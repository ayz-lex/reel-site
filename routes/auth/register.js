const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const Movie = require('../../databases/models/movies')
const bcrypt = require('bcrypt')

const upsertMovie = async (value) => {
  await Movie.findOne({where: {movie: value}}).then(async (element) => {
    if (element === null) {
      await Movie.create({movie: value, popularity: 1})
    } else {
      element.popularity++
      element.save()
    }
  })
}

const createUser = async (req) => {
  return await User.findOne({where: {username: req.body.username}}).then((element) => {
    if (element === null) {
      const {username, password, occupation, age, movie1, movie2, movie3} = req.body
      bcrypt.hash(password, 12, async (err, hash) => {
        if (err) throw err
        await User.create({username: username, password: hash, occupation: occupation, age: age, watched: [movie1, movie2, movie3]})
      })
      req.session.username = username
      req.session.data = {occupation: occupation, age: age, watched: [movie1, movie2, movie3]}
      return false
    } else {
      return true
    }
  })
}

router.post('/', express.json(), async (req, res) => {
  await createUser(req)
    .then(async (bool) => {
      if (!bool) {
        await upsertMovie(req.body.movie1)
        await upsertMovie(req.body.movie2)
        await upsertMovie(req.body.movie3)
        res.send('OK')
      } else {
        res.send('User Taken')
      }
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

module.exports = router