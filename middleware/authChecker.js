const jwt = require('jsonwebtoken')
const secret = 'secret'

const checkAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.sendStatus(401).json({
      error: 'Unauthorized: token invalid'
    })
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.sendStatus(401).json({
          error: 'Unauthorized: token invalid'
        }) 
      } else {
        req.data = decoded.data
        next()
      }
    })
  }
}

module.exports = checkAuth