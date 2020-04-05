const express = require('express')
const router = express.Router()
const User = require('../databases/models/users')
const bcrypt = require('bcrypt')


router.get('/login', async (req, res) => {
    await res.render('login')
})

router.post('/login', async (req, res) => {
    await User.findOne({where: {username: req.body.username}}).then((user) => {
        if (user !== null) {
            //username does exist
            bcrypt.compare(req.body.password, element.password).then((result) => {
                if (result) {
                    //right password
                    res.redirect('/home')
                } else {
                    //wrong password
                    res.redirect('/login')
                }
            })
        } else {
            //username doesn't exist
        }
    })
})