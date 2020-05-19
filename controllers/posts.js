//! Required
const Post = require('../models/post')
const { notFound, unauthorized } = require('../lib/errorMessages')

<<<<<<< HEAD
//* show all posts (from all users)
//? WORKING tested
//! ERROR not tested 
=======
//? Show all Posts (from all users)
//* WORKING tested
//* ERROR tested
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
async function postsIndex(req, res, next) {
  try {
    const posts = await Post.find().populate('user').populate('comments.user')
    if (!posts) throw new Error(notFound)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

<<<<<<< HEAD
//* add a post
//? WORKING tested
//! ERROR not tested 
=======
//? Add a Post
//* WORKING tested
//* ERROR tested
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
async function postsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdPost = await Post.create(req.body)
    res.status(201).json(createdPost)
  } catch (err) {
    next(err)
  }
}

<<<<<<< HEAD
//* show single post
//? WORKING tested
//! ERROR not tested 
=======
//? Show single Post
//* WORKING tested
//* ERROR tested
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
async function postsShow(req, res, next) {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error(notFound)
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

<<<<<<< HEAD
//* update post
//? WORKING tested
//! ERROR not tested 
=======
//? Update a Post
//* WORKING tested
//* ERROR tested
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
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

<<<<<<< HEAD
//* delete post
//? WORKING tested
//! ERROR not tested 
=======
//? Delete a Post
//* WORKING tested
//* ERROR tested
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
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


<<<<<<< HEAD
//* POST COMMENTS CONTROLLERS

//* create a comment on a post
//? WORKING tested
//! ERROR not tested 
=======
//? POST COMMENTS CONTROLLERS
//? Create a Comment on a Post
//* WORKING tested
//* ERROR tested 
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
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

<<<<<<< HEAD
//* delete comment from post
//? WORKING tested
//! ERROR not tested 
=======
//? Delete Comment from Post
//* WORKING tested
//* ERROR tested 
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
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