const express = require('express')
const router = express.Router()
const authChecker = require('../../middleware/authChecker')

router.get('/', authChecker, async (req, res) => {
  res.sendStatus(200)
})

module.exports = router