const User = require('../models/user')
const { secret } = require('../config/environment')
const { notFound, unauthorized, duplicate } = require('../lib/errorMessages')
const Article = require('../models/article')
const Posts = require('../models/post')

//* require login features
const jwt = require('jsonwebtoken')

//! function for user creation--- registers without all credentials!
async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}, please login to confirm registration.` })
  } catch (err) {
    next(err)
  }
}

//* function for user login--- tested
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

//* Show user's info for profile--- tested
async function userProfile(req, res) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdArticles').populate('createdPosts').populate('comments.user')
    res.status(200).json(user)
  } catch (err) {
    res.json(err)
  }
}


//* update details on user profile--- tested
async function userUpdate(req, res) {
  try {
    const userId = req.currentUser
    const updatedProfile = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
    if (!updatedProfile) throw new Error('Not found')
    res.status(202).json(updatedProfile)
  } catch (err) {
    console.log(err)
  }
}

//* Comments 
//* comment on user profile --- tested 
async function userCommentCreate(req, res) {
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
    console.log(err)
  }
}

//* delete a comment if you're the user who posted it --- tested
async function userCommentDelete(req, res) {
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
    console.log(err)
  }
}

//* Ratings--- tested
async function userRatingCreate(req, res) {
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
    console.log(err)
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

//* Add to favourites --- tested
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


//* export controller functions.
module.exports = {
  register,
  login,
  updateUser: userUpdate,
  profile: userProfile,
  commentCreate: userCommentCreate,
  commentDelete: userCommentDelete,
  ratingCreate: userRatingCreate,
  favsArt: addArticleToFavourites,
  favsFriend: addUserToFavourites,
  favsPost: addPostToFavourites
  // ratingDelete: userRatingDelete
}