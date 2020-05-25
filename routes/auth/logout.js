const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
  req.session.destroy((err) => {
    if (err) throw err
  })
})

module.exports = router