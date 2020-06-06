const jwt = require('jsonwebtoken')
const secret = 'secret'

const checkAuth = (req, res, next) => {
  const token = req.cookies.token
  console.log(token)
  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: no token'
    })
  } else {
    jwt.verify(token, secret, (err, decoded) => {
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