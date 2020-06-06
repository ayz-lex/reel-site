const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', express.json(), async (req, res) => {
  let user = await User.findOne({where: {username: req.body.username}}).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  if (user !== null) {
    let result = await bcrypt.compare(req.body.password, user.password).catch(err => {
      res.status(500).json({
        error: 'Internal Error'
      })
    })
    if (result) {
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
        error: 'Incorrect Password'
      })
    }
  } else {
    res.status(401).json({
      error: 'Incorrect Username'
    })
  }
})

module.exports = router