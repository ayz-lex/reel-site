const express = require('express')
const router = express.Router()
const User = require('../../databases/models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

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
      watched: []
    }).catch(err => {
        res.status(500).json({
        error: 'Internal Error'
      })
    })    

    const payload = {username: user.username}

    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: '1h'
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }).sendStatus(200)

  } else {
    res.status(401).json({
      error: 'Username already exists'
    })
  }
})

module.exports = router