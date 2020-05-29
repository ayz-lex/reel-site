const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')

router.post('/', express.json(), async (req, res) => {
  let user = await User.findOne({where: {username: req.body.username}})
  if (user !== null) {
    let result = await bcrypt.compare(req.body.password, user.password)
    if (result) {
      //create session
      req.session.data = user
      res.send('OK')
    } else {
      res.send('No Password')
    }
  } else {
    res.send('No Username')
  }
})

module.exports = router