const Article = require('../models/article')
const { notFound, unauthorized } = require('../lib/errorMessages')


//* function to get all articles of clothing
//* tested
async function articlesIndex(req, res, next) {
  try {
    const articles = await Article.find().populate('user').populate('comments.user').populate('ratings.user').populate('user.article')
    if (!articles) throw new Error(notFound)
    res.status(200).json(articles)
  } catch (err) {
    next(err)
  }
}

//* function to create an article of clothing
//* tested
async function articlesCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdArticle = await Article.create(req.body)
    res.status(201).json(createdArticle)
  } catch (err) {
    next(err)
  }
}

//* function to show single article of clothing
//* tested
async function articlesShow(req, res, next) {
  const articleId = req.params.id
  try {
    const anArticle = await Article.findById(articleId).populate('user')
    console.log(anArticle)
    if (!anArticle) throw new Error('Not Found')
    res.status(200).json(anArticle)
  } catch (err) {
    next(err)
  }
}

//* function to update single article of clothing
//* tested
async function articlesUpdate(req, res, next) {
  try {
    const article = await Article.findById(req.params.id)
    console.log(req.params)
    if (!article) throw new Error(notFound)
    if (!article.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(article, req.body)
    await article.save()
    res.status(202).json(article)
  } catch (err) {
    console.log(err.message)
    next(err)
  }
}

//* function to delete an article of clothing by id
//* tested
async function articlesDelete(req, res) {
  req.body.user = req.currentUser
  try {
    const articleId = req.params.id
    const articleToDelete = await Article.findById(articleId)
    if (!articleToDelete) throw new Error(notFound)
    if (!articleToDelete.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await articleToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}

//* COMMENTS
//* tested
async function articleCommentCreate (req, res) {
  try {
    req.body.user = req.currentUser
    const articleId = req.params.id
    const article = await Article.findById(articleId)
    if (!article) throw new Error('Not found')
    console.log(req.body)
    //* push comment to specific article of clothing
    article.comments.push(req.body)
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    console.log(err)
  }
}

//* tested
async function articleCommentDelete (req, res) {
  try {
    req.body.user = req.currentUser
    const articleId = req.params.id
    const commentId = req.params.commentId
    console.log(req.currentUser)
    const article = await Article.findById(articleId)
    if (!article) throw new Error('Not found')
    const commentToDelete = article.comments.id(commentId)
    if (!commentToDelete) throw new Error('Not found')
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error('unauthorized')
    await commentToDelete.remove()
    await article.save()
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}

//* RATING
//* tested
async function articleRatingCreate (req, res) {
  try {
    req.body.user = req.currentUser
    const rating = req.body
    const articleId = req.params.id
    const article = await Article.findById(articleId)
    if (!article) throw new Error()
    article.ratings.push(rating)
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    console.log(err)
  }
}

//* export
module.exports = {
  index: articlesIndex,
  create: articlesCreate,
  single: articlesShow,
  update: articlesUpdate,
  delete: articlesDelete,
  commentCreate: articleCommentCreate,
  commentDelete: articleCommentDelete,
  rating: articleRatingCreate

}