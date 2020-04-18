const express = require('express')
const app = express()
const session = require('express-session')

const MAXAGE = 3600000
const PORT = 3000

app.use('/register', require('./routes/auth/register'))
app.use('/login', require('./routes/auth/login'))
app.use('/logout', require('./routes/auth/logout'))
app.use('/home', require('./routes/homepage'))
app.use('/movie', require('./routes/movie'))

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

app.set('view engine', 'ejs')

app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})

