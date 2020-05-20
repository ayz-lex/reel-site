const redirectOther = (req, res, next) => {
  if (req.session) {
    res.redirect('/home')
  } else {
    next()
  }
}

module.exports = redirectOther