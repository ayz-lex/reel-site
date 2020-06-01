const express = require('express')
const app = express()
const MAXAGE = 3600000
const PORT = 8080
const cors = require('cors')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(session({
  cookie: {
    maxAge: MAXAGE,
    sameSite: true,
    secure: false, //change when production
  },
  name: 'name',
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
}));

app.use('/api/movie', require('./api/movie'))
app.use('/api/register', require('./api/auth/register'))
app.use('/api/login', require('./api/auth/login'))
app.use('/api/logout', require('./api/auth/logout'))
app.use('/api/checkLogin', require('./api/auth/checkLogin'))

app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})