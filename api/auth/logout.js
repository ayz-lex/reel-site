const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
  //delete session
  req.session.destroy(err => {
    if (err) throw err
  })
  res.send('OK')
})

module.exports = router