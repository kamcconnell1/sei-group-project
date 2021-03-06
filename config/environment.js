//! Consts
const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/clothes'
const secret = process.env.SECRET || 'yellowflower'

//! Exports
module.exports = {
  dbURI,
  port,
  secret
}