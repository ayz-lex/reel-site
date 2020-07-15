const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/:image_url', async (req, res) => {
    const url = req.params.image_url
    let response = fetch('https://image.tmdb.org/t/p/w400/c8Ass7acuOe4za6DhSattE359gr.jpg')
    
})

module.exports = router