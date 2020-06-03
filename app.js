const express = require('express')
const app = express()
const MAXAGE = 1000 * 60 * 60
const PORT = 8080
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const pgSession = require('connect-pg-simple')(session)
const pg = require('pg')
require('dotenv').config()

//let frontend connect with backend apis
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser())

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

//sessions
app.use(session({
  cookie: {
    maxAge: MAXAGE,
    sameSite: true,
    secure: false, //change when production
  },
  store: new pgSession({
    pool: pool,
    schemaName: 'public'
  }),
  secret: 'secret',
  resave: true,
  unset: 'destroy',
  saveUninitialized: false,
}));

//api routes
app.use('/api/movie', require('./api/movie'))
app.use('/api/register', require('./api/auth/register'))
app.use('/api/login', require('./api/auth/login'))
app.use('/api/logout', require('./api/auth/logout'))
app.use('/api/checkLogin', require('./api/auth/checkLogin'))

//port
app.listen(PORT, () => {console.log(`currently listening to port ${PORT}`)})