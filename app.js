const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//let frontend connect with backend apis
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser())

//api routes
app.use('/api/search', require('./api/search'))
app.use('/api/register', require('./api/auth/register'))
app.use('/api/login', require('./api/auth/login'))
app.use('/api/logout', require('./api/auth/logout'))
app.use('/api/checkLogin', require('./api/auth/checkLogin'))
app.use('/api/movie', require('./api/movie'))

//port
app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})