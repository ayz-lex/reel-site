const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.send(req.session ? 'OK' : 'NO')
})

module.exports = router