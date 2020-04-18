const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const Movie = require('../../databases/models/movies')
const bcrypt = require('bcrypt')
const redirect = require('../../assets/redirectOther')

const upsertMovie = async (value) => {
  await Movie.findOne({ where: { movie: value } }).then(async (element) => {
    if (element === null) {
      await Movie.create({ movie: value, popularity: 1 })
    } else {
      element.popularity++
      await element.save()
    }
  })
}

const createUser = async (req) => {
  return await User.findOne({ where: { username: req.body.username } }).then((element) => {
    if (element === null) {
      bcrypt.hash(req.body.password, 12, async (err, hash) => {
        if (err) throw err
        await User.create({ username: req.body.username, password: hash, occupation: req.body.occupation, age: req.body.age, watched: [req.body.movie1, req.body.movie2, req.body.movie3] }).then(user => console.log("user created"))
      })
      req.session.username = req.body.username
      req.session.data = {occupation: req.body.occupation, age: req.body.age, watched: [req.body.movie1, req.body.movie2, req.body.movie3]}
      return false
    } else {
      return true
    }
  })
}

router.get('/register', redirect, async (req, res) => {
  await res.render('register')
})

router.post('/register', express.urlencoded({ extended: true }), async (req, res) => {
  await createUser(req).then(async (bool) => {
    if (!bool) {
      await upsertMovie(req.body.movie1)
      await upsertMovie(req.body.movie2)
      await upsertMovie(req.body.movie3)
      res.redirect('/home')
    } else {
      //password is already in use.
      res.redirect('/register')
    }
  })
})

module.exports = router