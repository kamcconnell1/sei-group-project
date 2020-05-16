const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')
const Article = require('../models/article')
const Post = require('../models/post')
const userData = require('./data/users')
const articleData = require('./data/articles')
const postData = require('./data/posts')
// const userCommentsData = require('./data/userComments')
// const articleCommentsData = require('./data/articleComments')
// const postCommentsData = require('./data/postComments')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)
 
    try {
      await db.dropDatabase()

      //* SEED USERS
      const users = await User.create(userData)
      console.log(`${'😃 '.repeat(users.length)} users created `)

      //* SEED ARTICLES
      // const articlesWithUserOne = articleData.slice(1,4).map(article => {
      //   return { ...article, user: users[1]._id }
      // })
      // const articlesWithUserTwo = articleData.slice(4,7).map(article => {
      //   return { ...article, user: users[2]._id }
      // })
      // const articlesWithUserThree = articleData.slice(6,8).map(article => {
      //   return { ...article, user: users[3]._id }
      // })

      const articlesWithUsers = articleData.map(article => {
        return { ...article, user: users[1]._id }
      })
      const articles = await Article.create(articlesWithUsers)
      console.log(`${'👗 '.repeat(articles.length)} articles created `)


      //* SEED POSTS
      const postsWithUsers = postData.map(post => {
        return { ...post, user: users[1]._id }
      })
      const posts = await Post.create(postsWithUsers)
      console.log(`${'📄 '.repeat(posts.length)} posts created `)



      await mongoose.connection.close()

      console.log('Goodbye 👋')

    } catch (err) {
      console.log(err)
    }

  })