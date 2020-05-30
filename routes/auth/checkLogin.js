const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.send(req.session.data ? 'OK' : 'NO')
})

module.exports = router