const Post = require('../models/post')

async function postsIndex(req, res) {
  try {
    const posts = await Post.find().populate('user').populate('comments.user')
    res.status(200).json(posts)
  } catch (err) {
    res.json(err)
  }
}

async function postsCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const createdPost = await Post.create(req.body)
    res.status(201).json(createdPost)
  } catch (err) {
    res.json(err)
  }
}

async function postsShow(req, res) {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error('Not found')
    res.status(200).json(post)
  } catch (err) {
    res.json(err)
  }
}

async function postsUpdate(req, res) {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error('Not found')
    if (!post.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    Object.assign(post, req.body)
    await post.save()
    res.status(202).json(post)
  } catch (err) {
    res.json(err)
  }
}

async function postsDelete(req, res) {
  const postId = req.params.id
  try {
    const postToDelete = await Post.findById(postId)
    if (!postToDelete) throw new Error('Not found')
    if (!postToDelete.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await postToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}


//* POST COMMENTS CONTROLLERS

async function postCommentCreate (req, res) {
  try {
    req.body.user = req.currentUser
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post) throw new Error('Not found')
    //* push comment to specific post
    post.comments.push(req.body)
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    console.log(err)
  }
}


async function postCommentDelete (req, res) {
  console.log(req)
  try {
    req.body.user = req.currentUser
    const postId = req.params.id
    const commentId = req.params.commentId
    console.log(req.currentUser)
    const post = await Post.findById(postId)
    if (!post) throw new Error('Not Found')
    const commentToDelete = post.comments.id(commentId)
    if (!commentToDelete) throw new Error('Not found')
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
    await commentToDelete.remove()
    await post.save()
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  index: postsIndex,
  create: postsCreate,
  single: postsShow,
  update: postsUpdate,
  delete: postsDelete,
  commentCreate: postCommentCreate,
  commentDelete: postCommentDelete
}