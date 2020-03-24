const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')
const Movie = require('../databases/models/movies')

router.get('/', async (req, res) => {
    await res.render('register')
})

router.post('/', express.urlencoded({extended: true}), async (req, res) => {
    
    const username = req.body.username
    const password = req.body.password
    const occupation = req.body.occupation
    const age = req.body.age
    console.log(username)
    await User.create({username: username, password: password, occupation: occupation, age: age})

    const movie1 = req.body.movie1
    const movie2 = req.body.movie2
    const movie3 = req.body.movie3
    await Movie.create({movie: movie1})
    res.redirect('/')
})

module.exports = router