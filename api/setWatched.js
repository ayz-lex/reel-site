const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')

router.post('/api/setWatched', authChecker, express.json(), async (req, res) => {
  const token = req.cookies.token
  const decoded = jwt.decode(token)
  const username = decoded.username

  const user = await User.findOne({where: {username: username}}).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })

  user.watched.push(req.body.id)

  await user.save().catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  
  res.sendStatus(200)
})