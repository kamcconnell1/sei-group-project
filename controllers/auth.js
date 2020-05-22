//! Required
const User = require('../models/user')
const { secret } = require('../config/environment')
const { unauthorized } = require('../lib/errorMessages')
const jwt = require('jsonwebtoken')


//! REGISTER a User
//* WORKING tested
//* ERROR tested 
async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}, please login to confirm registration.` })
  } catch (err) {
    next(err)
  }
}

//! LOGIN
//* WORKING tested
//* ERROR tested 
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized)
    await axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ message: `Hello ${user.username}`, token })
  } catch (err) {
    next(err)
  }
}

//! Exports.
module.exports = {
  register,
  login
}