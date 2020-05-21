//! Require
const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')
const Article = require('../models/article')
const Post = require('../models/post')
const userData = require('./data/users')
const articleData = require('./data/articles')
const postData = require('./data/posts')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)

    try {
      await db.dropDatabase()

      //? SEED USERS
      const users = await User.create(userData)
      console.log(`${'😃 '.repeat(users.length)} users created `)


      //? SEED ARTICLES

      // * Add random user to each article 
      const articlesWithUsers = articleData.map(article => {
        return { ...article, user: users[Math.floor(Math.random() * users.length)]._id }
      }) 

      const articles = await Article.create(articlesWithUsers)
      console.log(`${'👘 '.repeat(articles.length)} clothes created `)


      //? SEED POSTS
      // * Add a random user to each post
      const postsWithUsers = postData.map(post => {
        return { ...post, user: users[Math.floor(Math.random() * users.length)]._id }
      })
      const posts = await Post.create(postsWithUsers)
      console.log(`${'📄🧒🏻 '.repeat(posts.length)} posts created `)


      await mongoose.connection.close()

      console.log('bye')

    } catch (err) {
      console.log(err)
    }
  })

