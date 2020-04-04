const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')
const Movie = require('../databases/models/movies')

const upsertMovie = async (value) => {
    await Movie.findOne({where: {movie: value}}).then(async (element) => {
        if (element === null) {
            await Movie.create({movie: value, popularity: 1})
        } else {
            element.popularity++
            await element.save()
        }
    })
}

const createUser = async (body) => { 
    return await User.findOne({where: {username: body.username}}).then(async (element) => {
        if (element === null) {
            await User.create({username: body.username, password: body.password, occupation: body.occupation, age: body.age}).then(user => console.log("user created"))
            return false
        } else {
            return true
        }
    })
}

router.get('/', async (req, res) => {
    await res.render('register')
})

router.post('/', express.urlencoded({extended: true}), async (req, res) => {
    await createUser(req.body).then(async (bool) => {
        if (!bool) {
            await upsertMovie(req.body.movie1)
            await upsertMovie(req.body.movie2)
            await upsertMovie(req.body.movie3)
        }
    })
    res.redirect('/')
})

module.exports = router