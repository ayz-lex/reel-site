const express = require('express')
const router = express.Router()
const Movie = require('../databases/models/movies')

router.get('/:movie', async (req, res) => {
  console.log(req.params.movie)
  let val = await Movie.findOne({where: {movie: req.params.movie}})
  console.log(val)
  if (val === null) {
    res.send('Not Found')
  } else {
    res.send(val)
  }
})

module.exports = router