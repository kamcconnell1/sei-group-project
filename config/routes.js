//* require router, secureRoute and controllers 
const router = require('express').Router()
const user = require('../controllers/auth')
const articles = require('../controllers/articles')
const posts = require('../controllers/posts')
const secureRoute = require('../lib/secureRoute')

//* CLOTHES
//* main route for get and post
router.route('/clothes')
  .get(articles.index)
  .post(secureRoute, articles.create)

//* route for unique id get, delete and update
router.route('/clothes/:id')
  .get(articles.single)
  .put(secureRoute, articles.update)
  .delete(secureRoute, articles.delete)

//* Comments on clothing id
router.route('/clothes/:id/comments')
  .post(secureRoute, articles.commentCreate)

router.route('/clothes/:id/comments/:commentId')
  .delete(secureRoute, articles.commentDelete)

//*****************************/

//* POSTS
router.route('/posts')
  .get(posts.index)
  .post(secureRoute, posts.create)

router.route('/posts/:id')
  .get(posts.single)
  .put(secureRoute, posts.update)
  .delete(secureRoute, posts.delete)

router.route('/posts/:id/comments')
  .post(secureRoute, posts.commentCreate)

router.route('/posts/:id/comments/:commentId')
  .delete(secureRoute, posts.commentDelete)

//*****************************/

//* Ratings

//* Rating for articles
router.route('/clothes/:id/rating')
  .post(secureRoute, articles.rating)



//* Rating for users

router.route('users/:id/rating')
  .post(secureRoute, user.ratingCreate)

router.route('users/:id/rating/:ratingId')
  .put(secureRoute, user.ratingUpdate)
  .delete(secureRoute, user.ratingDelete)

//*****************************/

//* AUTH

//* register
router.route('/register')
  .post(user.register)

//* login
router.route('/login')
  .post(user.login)

//* show single user
router.route('/profile')
  .get(secureRoute, user.profile)


//   //* user comments
// router.route('/users')
//   .get()

router.route('/users/:id/comments')
  .post(user.commentCreate)

router.route('/users/:id/comments/:commentId')
  .delete(user.commentDelete)

//* exports
module.exports = router