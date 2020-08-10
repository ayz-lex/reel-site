const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/:movie_id', async (req, res) => {
  let response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movie_id}?api_key=${process.env.API_KEY}`).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  let data = await response.json().catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  if (data.status_code === 34) {
    res.status(404).json({
      error: data.status_message
    })
  }
  res.send(data)
})

module.exports = router