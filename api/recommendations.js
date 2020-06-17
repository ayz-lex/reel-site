const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
  let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c39010c8ce89b2f71c0f37373a68bfc8').catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })

  let data = await response.json().catch(err => {
    res.status(500).json({
      error: 'Internal Error'
    })
  })

  let movieArray = data.results.filter(movie => {
    return movie.popularity >= 29
  })

  res.send(movieArray)
})

module.exports = router