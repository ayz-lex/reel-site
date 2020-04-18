const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')
const redirect = require('../../assets/redirectOther')


router.get('/login', redirect, async (req, res) => {
  await res.render('login')
})

router.post('/login', async (req, res) => {
  await User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user !== null) {
      //username does exist
      bcrypt.compare(req.body.password, element.password).then((result) => {
        if (result) {
          //right password
          req.session.username = user.username
          req.session.data = {occupation: user.occupation, age: user.age, watched: user.watched}
          res.redirect('/home')
        } else {
          //wrong password
          res.redirect('/login')
        }
      })
    } else {
      //username doesn't exist
      res.redirect('/login')
    }
  })
})

module.exports = router