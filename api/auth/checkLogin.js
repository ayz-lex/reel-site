const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.send(req.session ? req.sessionID : 'NO')
})

module.exports = router