const User = require('../models/user')
const { secret } = require('../config/environment')

//* require login features
const jwt = require('jsonwebtoken')

//* function for user creation--- tested
async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}, please login to confirm registration.` })
  } catch (err) {
    console.log(err)
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
    const user = await User.findById(req.currentUser._id).populate('createdArticles').populate('createdPosts').populate('comments')
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
//* comment on user profile.--- NOT WORKING!!!
async function userCommentCreate(req, res) {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('Not found')
    console.log(req)
    user.comments.push(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
}

//* cant test until above works!!!!!!!!!!
async function userCommentDelete(req, res) {
  console.log(req)
  try {
    const commentId = req.params.commentId
    const user = await User.findById(commentId)
    if (!user) throw new Error('Not Found')
    const commentToDelete = user.comments.id(commentId)
    if (!commentToDelete) throw new Error('Not found')
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
    await commentToDelete.remove()
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}

//* Ratings
async function userRatingCreate(req, res) {
  try {
    const rating = req.body
    const user = await User.findById(req.currentUser)
    if (!user) throw new Error()
    user.ratings.push(rating)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
}

async function userRatingUpdate(req, res) {
  const userId = req.params.id
  const ratingId = req.params.ratingId
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error('Not found')
    if (!user.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    const ratingToUpdate = user.ratings.id(ratingId)
    Object.assign(ratingToUpdate, req.body)
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function userRatingDelete(req, res) {
  console.log(req)
  try {
    req.body.user = req.currentUser
    const userId = req.params.id
    const ratingId = req.params.ratingId
    const user = await User.findById(userId)
    if (!user) throw new Error('Not Found')
    const ratingToDelete = user.ratings.id(ratingId)
    if (!ratingToDelete) throw new Error('Not found')
    if (!ratingToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
    await ratingToDelete.remove()
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
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
  ratingDelete: userRatingDelete,
  ratingUpdate: userRatingUpdate
}