const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')

router.post('/', express.json(), async (req, res) => {
  await User.findOne({where: {username: req.body.username}}).then((user) => {
    if (user !== null) {
      //username does exist
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          //right password
          req.session.username = user.username
          req.session.data = {occupation: user.occupation, age: user.age, watched: user.watched}
          res.send('OK')
        } else {
          //wrong password
          res.send('No Password')
        }
      })
    } else {
      //username doesn't exist
      res.send('NO Username')
    }
  })
})

module.exports = router