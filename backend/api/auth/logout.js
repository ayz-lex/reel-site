const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).json({
      error: 'Session expired'
    })
  } else {
    res.clearCookie('token').sendStatus(200)
  }
})

module.exports = router