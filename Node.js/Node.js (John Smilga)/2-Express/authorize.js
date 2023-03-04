const authorize = (req, res, next) => {
  const { user } = req.query

  if (user === 'kedar') {
    req.user = { name: 'kedar', id: 1 }
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
  //console.log('authorize')
  //next()
}

module.exports = authorize
