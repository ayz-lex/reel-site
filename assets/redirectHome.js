const redirectHome = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = redirectHome