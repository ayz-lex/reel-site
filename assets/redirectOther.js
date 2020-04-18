const redirectOther = (req, res, next) => {
  if (req.session.userID) {
    res.redirect('/home')
  } else {
    next()
  }
}

module.exports = redirectOther