function logger(req, res, next) {
  console.log(`Incoming request ${req.method} to ${req.url}`)
  next()
}

module.exports = logger