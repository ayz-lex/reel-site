const express = require('express')
const app = express()
const session = require('express-session')
const MAXAGE = 3600000
const PORT = 8080
const cors = require('cors')

app.set('view engine', 'ejs')

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
  //add store later
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/api/movie', require('./routes/movie'))
app.use('/api/register', require('./routes/auth/register'))

app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})