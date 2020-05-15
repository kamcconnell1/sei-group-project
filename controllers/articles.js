const Article = require('../models/article')


//* function to get all articles of clothing
async function articlesIndex(req, res) {
  try {
    const articles = await Article.find().populate('user')
    if (!articles) throw new Error('Not Found')
    res.status(200).json(articles)
  } catch (err) {
    res.json(err)
  }
}

//* function to create an article of clothing
async function articlesCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const createdArticle = await Article.create(req.body)
    res.status(201).json(createdArticle)
  } catch (err) {
    res.json(err)
  }
}

//* function to show single article of clothing
async function articlesShow(req, res) {
  const articleId = req.params.id
  try {
    const article = await Article.findById(articleId)
    if (!article) throw new Error('Not found')
    res.status(200).json(article)
  } catch (err) {
    res.json(err)
  }
}

//* function to update single article of clothing
async function articlesUpdate(req, res) {
  const articleId = req.params.id
  try {
    const article = await Article.findById(articleId)
    if (!article) throw new Error('Not found')
    if (!article.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    Object.assign(article, req.body)
    await article.save()
    res.status(202).json(article)
  } catch (err) {
    res.json(err)
  }
}

//* function to delete an article of clothing by id
async function articlesDelete(req, res) {
  const articleId = req.params.id
  try {
    const articleToDelete = await Article.findById(articleId)
    if (!articleToDelete) throw new Error('Not found')
    if (!articleToDelete.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await articleToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}

//* export
module.exports = {
  index: articlesIndex,
  create: articlesCreate,
  single: articlesShow,
  update: articlesUpdate,
  delete: articlesDelete

}