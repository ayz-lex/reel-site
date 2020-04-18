const express = require('express')
const router = express.Router()

router.get('/logout', async(req, res) => {
  req.session.destroy((err) => {
    if (err) throw err
  })
  res.redirect('/login')
})

module.exports = router