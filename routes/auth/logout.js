const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(500)
    }
  })
})

module.exports = router