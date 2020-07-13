const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/:page_number', async (req, res) => {
  let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=${req.params.page_number}`).catch(err => {
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
    return movie.popularity >= 29 & movie.vote_count >= 3000
  })
  res.send(movieArray)
})

module.exports = router