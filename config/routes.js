//* require router, secureRoute and controllers 
const router = require('express').Router()
const user = require('../controllers/auth')
const articles = require('../controllers/articles')
const secureRoute = require('../lib/secureRoute')

//* main route for get and post
router.route('/clothes')
  .get(articles.index)
  .post(secureRoute, articles.create)

//* route for unique id get, delete and update
router.route('/clothes/:id')
  .get(articles.single)
  .put(secureRoute, articles.update)
  .delete(secureRoute, articles.delete)

//* register
router.route('/register')
  .post(user.register)

//* login
router.route('/login')
  .post(user.login)

//* exports
module.exports = router