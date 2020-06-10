const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/:movie', async (req, res) => {
  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.params.movie}`).catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  let data = await response.json().catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })
  if (data.total_results === 0) {
    res.status(404).json({
      error: 'Movie Not Found'
    })
  }
  //need to manage this stream of data...
  res.send(data.results)
})

module.exports = router