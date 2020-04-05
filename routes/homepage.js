const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.redirect('/home')
})

router.get('/home', async (req, res) => {
    
})