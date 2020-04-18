const express = require('express')
const router = express.Router()
const redirect = require('../assets/redirectHome')

router.get('/', async (req, res) => {
  res.redirect('/home')
})

router.get('/home', redirect, async (req, res) => {
  res.render('home')
})

module.exports = router