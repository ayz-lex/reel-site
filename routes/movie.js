const express = require('express')
const router = express.Router()
const Movie = require('../databases/models/movies')

router.get('/', async (req, res) => {
  let val = await Movie.findByPk(1).then(movie => {
    return {name: movie.movie, popularity: movie.popularity}
  })
  res.send(val)
})

module.exports = router