const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')
const Movie = require('../databases/models/movies')

const createMovie = async (value) => {
    const [movie, created] = await Movie.findOrCreate({
        where: {movie: value},
        defaults: {popularity: 0}
    })
    movie.popularity++
}

const createUser = async (body) => {
    const [user, created] = await User.findOrCreate({
        where: {username: body.username},
        defaults: {
            password: body.password,
            occupation: body.occupation,
            age: body.age
        }
    })
    if (created) {
        alert('Username Taken')
    }
}

router.get('/', async (req, res) => {
    await res.render('register')
})

router.post('/', express.urlencoded({extended: true}), async (req, res) => {
    
    createUser(req.body)
    createMovie(req.body.movie1)
    createMovie(req.body.movie2)
    createMovie(req.body.movie3)
    res.redirect('/')
})

module.exports = router