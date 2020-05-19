//! Required
const User = require('../models/user')
const { secret } = require('../config/environment')
<<<<<<< HEAD
const { notFound, unauthorized, duplicate } = require('../lib/errorMessages')
const Article = require('../models/article')
const Posts = require('../models/post')

//* require login features
const jwt = require('jsonwebtoken')

//? register a user
=======
const { unauthorized } = require('../lib/errorMessages')
const jwt = require('jsonwebtoken')


//? Register a User
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
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

<<<<<<< HEAD
//? function for user login
=======
//? Function for User Login
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
//* WORKING tested
//* ERROR tested 
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized)
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ message: `Hello ${user.username}`, token })
  } catch (err) {
    next(err)
<<<<<<< HEAD
  }
}

//? Show currentUser Profile -> user's own dashboard
//* WORKING tested
//* ERROR tested
async function currentUserProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdArticles').populate('createdPosts').populate('comments.user').populate('favourites.favArticles').populate('favourites.favUsers').populate('favourites.favPosts')
    if (!user) throw new Error(unauthorized)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

//! Show another user's profile -> other's dashboards
async function getProfile(req, res, next) {
  try {
    const user = req.params.id
    const userProfile = await User.findById(user).populate()
    console.log(userProfile)
    if (!userProfile) throw new Error(unauthorized)
    res.status(200).json(userProfile)
  } catch (err) {
    next(err)
  }
}

//* update details on user profile
//? WORKING tested
//! ERROR not tested 
async function userUpdate(req, res, next) {
  try {
    const userId = req.currentUser
    const updatedProfile = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
    if (!updatedProfile) throw new Error('Not found')
    res.status(202).json(updatedProfile)
  } catch (err) {
    next(err)
  }
}

//* Comments 
//* comment on user profile
//? WORKING tested
//! ERROR not tested 
async function userCommentCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const userReceivingId = await req.params.id
    const userReceiving = await User.findById(userReceivingId)
    console.log(userReceiving)
    // if (!userCommenting) throw new Error('Not found')
    userReceiving.comments.push(req.body)
    await userReceiving.save()
    res.status(201).json(userReceiving)
  } catch (err) {
    next(err)
  }
}

//* delete a comment if you're the user who posted it
//? WORKING tested
//! ERROR not tested 
async function userCommentDelete(req, res, next) {
  try {
    const userId = req.params.id
    const commentId = req.params.commentId
    const user = await User.findById(userId)
    if (!user) throw new Error('Not Found user')
    const commentToDelete = user.comments.id(commentId)
    console.log(commentToDelete.user)
    if (!commentToDelete) throw new Error('Not found comment')
    console.log(req.currentUser._id)
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
    await commentToDelete.remove()
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//* RATINGS

//* add a rating on a user
//? WORKING tested
//! ERROR not tested 
async function userRatingCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const userToRate = req.params.id
    const rating = req.body
    const user = await User.findById(userToRate)
    if (!user) throw new Error()
    user.ratings.push(rating)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

// async function userRatingDelete(req, res) {
//   console.log(req)
//   try {
//     req.body.user = req.currentUser
//     const userId = req.params.id
//     const ratingId = req.params.ratingId
//     const user = await User.findById(userId)
//     if (!user) throw new Error('Not Found')
//     const ratingToDelete = user.ratings.id(ratingId)
//     if (!ratingToDelete) throw new Error('Not found')
//     if (!ratingToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
//     await ratingToDelete.remove()
//     await user.save()
//     res.sendStatus(204)
//   } catch (err) {
//     console.log(err)
//   }
// }

//* FAVOURITES

//* Add an article to your favourites
//? WORKING tested
//! ERROR not tested 
async function addArticleToFavourites(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const article = await Article.findById(req.body.item)
    console.log(article)
    if (!article) throw new Error(notFound)
    if (user.favourites.favArticles.includes(article._id)) throw new Error(duplicate)
    if (!user.favourites.favArticles.includes(article._id))
      user.favourites.favArticles.push(article)
    console.log(user.favourites)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* Add a user to your favourites -> friends
//? WORKING tested
//! ERROR not tested 
async function addUserToFavourites(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const friend = await User.findById(req.body.friend)
    console.log(req.body.friend)
    if (!friend) throw new Error(notFound)
    if (user.favourites.favUsers.includes(friend._id)) throw new Error(duplicate)
    if (!user.favourites.favUsers.includes(friend._id))
      user.favourites.favUsers.push(friend)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* add a post to your favourites
//? WORKING tested
//! ERROR not tested 
async function addPostToFavourites(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const post = await Posts.findById(req.body.posts)
    if (!post) throw new Error(notFound)
    if (user.favourites.favPosts.includes(post._id)) throw new Error(duplicate)
    if (!user.favourites.favPosts.includes(post._id))
      user.favourites.favPosts.push(post)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* remove article from your favs
//! WORKING tested
//! ERROR not tested 

async function removeArticleFromFavs(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const articleToRemove = req.params.id
    await user.favourites.favArticles.remove(articleToRemove)
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//* remove user from your friends favs
//! WORKING tested
//! ERROR not tested 
async function removeUserFromFavs(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const friendToRemove = req.params.id
    await user.favourites.favUsers.remove(friendToRemove)
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//* remove posts from your posts favs
//! WORKING tested
//! ERROR not tested 
async function removePostsFromFavs(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const postToRemove = req.params.id
    await user.favourites.favPosts.remove(postToRemove)
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



//* export controller functions.
module.exports = {
  register,
  login,
  updateUser: userUpdate,
  profile: currentUserProfile,
  getProfile,
  commentCreate: userCommentCreate,
  commentDelete: userCommentDelete,
  ratingCreate: userRatingCreate,
  favsArticle: addArticleToFavourites,
  favsFriend: addUserToFavourites,
  favsPost: addPostToFavourites,
  favArticlesRemove: removeArticleFromFavs,
  favFriendsRemove: removeUserFromFavs,
  favPostsRemove: removePostsFromFavs

  // ratingDelete: userRatingDelete
=======
  }
}

//! Exports.
module.exports = {
  register,
  login
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
}