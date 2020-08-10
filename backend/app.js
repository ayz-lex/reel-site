const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//let frontend connect with backend apis
app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(cookieParser())

//api routes
app.use('/watched', require('./api/watched'))
app.use('/register', require('./api/auth/register'))
app.use('/login', require('./api/auth/login'))
app.use('/logout', require('./api/auth/logout'))
app.use('/checkLogin', require('./api/auth/checkLogin'))
app.use('/movie', require('./api/movie'))
app.use('/recommendations', require('./api/recommendations'))
app.use('/setWatched', require('./api/setWatched'))
app.use('/getWatchedData', require('./api/getWatchedData'))

//port
app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})