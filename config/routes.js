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



//*****************************/

router.route('/favourites/art')
  .post(secureRoute, user.favsArt)

router.route('/favourites/friends')
  .post(secureRoute, user.favsFriend)

router.route('/favourites/posts')
  .post(secureRoute, user.favsPost)

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
  .put(secureRoute, user.updateUser)

//* user ratings
router.route('/profile/:id/rating')
  .post(secureRoute, user.ratingCreate)

// router.route('/profile/:id/rating/:ratingId')
//   .delete(secureRoute, user.ratingDelete)

router.route('/profile/:id/comments')
  .post(secureRoute, user.commentCreate)

router.route('/profile/:id/comments/:commentId')
  .delete(secureRoute, user.commentDelete)

//* exports
module.exports = router