const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
  //delete session
  if (req.session) {
    req.session.destroy(err => {
      if (err) throw err
      req.session = null
    })
  }
  res.send('OK')
})

module.exports = router