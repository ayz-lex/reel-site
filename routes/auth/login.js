const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')

router.post('/api/login', async (req, res) => {
  await User.findOne({where: {username: req.body.username}}).then((user) => {
    if (user !== null) {
      //username does exist
      bcrypt.compare(req.body.password, element.password).then((result) => {
        if (result) {
          //right password
          req.session.username = user.username
          req.session.data = {occupation: user.occupation, age: user.age, watched: user.watched}
          res.send('success')
        } else {
          //wrong password
          res.send('wrong password')
        }
      })
    } else {
      //username doesn't exist
      res.send('wrong username')
    }
  })
})

module.exports = router