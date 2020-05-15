const router = require('express').Router()
const user = require('../controllers/auth')

router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)

module.exports = router