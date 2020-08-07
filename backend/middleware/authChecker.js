const jwt = require('jsonwebtoken')

require('dotenv').config({path: '../.env'})

const checkAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: token expired'
    })
  } else {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Unauthorized: token invalid'
        }) 
      } else {
        next()
      }
    })
  }
}

module.exports = checkAuth