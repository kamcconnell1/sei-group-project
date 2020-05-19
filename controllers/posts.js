//! Required
const Post = require('../models/post')
const { notFound, unauthorized } = require('../lib/errorMessages')

//? Show all Posts (from all users)
//* WORKING tested
//* ERROR tested
async function postsIndex(req, res, next) {
  try {
    const posts = await Post.find().populate('user').populate('comments.user')
    if (!posts) throw new Error(notFound)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

//? Add a Post
//* WORKING tested
//* ERROR tested
async function postsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdPost = await Post.create(req.body)
    res.status(201).json(createdPost)
  } catch (err) {
    next(err)
  }
}

//? Show single Post
//* WORKING tested
//* ERROR tested
async function postsShow(req, res, next) {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId).populate('user')
    if (!post) throw new Error(notFound)
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

//? Update a Post
//* WORKING tested
//* ERROR tested
async function postsUpdate(req, res, next) {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error(notFound)
    if (!post.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(post, req.body)
    await post.save()
    res.status(202).json(post)
  } catch (err) {
    next(err)
  }
}

//? Delete a Post
//* WORKING tested
//* ERROR tested
async function postsDelete(req, res, next) {
  const postId = req.params.id
  try {
    const postToDelete = await Post.findById(postId)
    if (!postToDelete) throw new Error(notFound)
    if (!postToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await postToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


//? POST COMMENTS CONTROLLERS
//? Create a Comment on a Post
//* WORKING tested
//* ERROR tested 
async function postCommentCreate (req, res, next) {
  try {
    req.body.user = req.currentUser
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post) throw new Error(notFound)
    post.comments.push(req.body)
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

//? Delete Comment from Post
//* WORKING tested
//* ERROR tested 
async function postCommentDelete (req, res, next) {
  console.log(req)
  try {
    req.body.user = req.currentUser
    const postId = req.params.id
    const commentId = req.params.commentId
    const post = await Post.findById(postId)
    if (!post) throw new Error(notFound)
    const commentToDelete = post.comments.id(commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await commentToDelete.remove()
    await post.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//! Exports
module.exports = {
  index: postsIndex,
  create: postsCreate,
  single: postsShow,
  update: postsUpdate,
  delete: postsDelete,
  commentCreate: postCommentCreate,
  commentDelete: postCommentDelete
}