const User = require('../models/user')
const secret = 'benga Smells'

//* require login features
const jwt = require('jsonwebtoken')

//* function for user creation
async function register(req, res) {
  try {
    const user = await User.create(req.body)
    console.log(req.body)
    res.status(201).json({ message: `Welcome ${user.username}, please login to confirm registration.` })
  } catch (err) {
    console.log(err)
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error()
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ message: `Hello ${user.username}`, token })
  } catch (err) {
    console.log(err)
  }
}


//* export controller functions.
module.exports = {
  register,
  login
}