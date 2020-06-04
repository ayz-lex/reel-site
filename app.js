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
app.use('/api/movie', require('./api/movie'))
app.use('/api/register', require('./api/auth/register'))
app.use('/api/login', require('./api/auth/login'))
app.use('/api/logout', require('./api/auth/logout'))
app.use('/api/checkLogin', require('./api/auth/checkLogin'))

app.get('/', (req, res) => {
  res.send('hello')
})
//port
app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})