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

      //* Articles by John
      const articlesFromJohn = articleData.slice(0, 9).map(article => {
        return { ...article, user: users[1]._id }
      })
      const articlesJohn = await Article.create(articlesFromJohn)
      console.log(`${'👗🧒🏻 '.repeat(articlesJohn.length)} articles created `)


      //* Articles By Mary
      const articlesForMary = articleData.slice(9, 17).map(article => {
        return { ...article, user: users[2]._id }
      })
      const articlesMary = await Article.create(articlesForMary)
      console.log(`${'👗👩🏾‍🦰 '.repeat(articlesMary.length)} articles created `)


      //* Articles By Paul
      const articlesForPaul = articleData.slice(17).map(article => {
        return { ...article, user: users[3]._id }
      })
      const articlesPaul = await Article.create(articlesForPaul)
      console.log(`${'👗🧔🏼 '.repeat(articlesPaul.length)} articles created `)


      //? SEED POSTS

      //* Posts for John
      const postsForJohn = postData.slice(0, 3).map(post => {
        return { ...post, user: users[1]._id }
      })
      const postsJohn = await Post.create(postsForJohn)
      console.log(`${'📄🧒🏻 '.repeat(postsJohn.length)} posts created `)



      //* Posts by Mary
      const postsForMary = postData.slice(4, 6).map(post => {
        return { ...post, user: users[2]._id }
      })
      const postsMary = await Post.create(postsForMary)
      console.log(`${'📄👩🏾‍🦰 '.repeat(postsMary.length)} posts created `)

      //* Posts by Paul
      const postsForPaul = postData.slice(6, 8).map(post => {
        return { ...post, user: users[3]._id }
      })
      const postsPaul = await Post.create(postsForPaul)
      console.log(`${'📄🧔🏼 '.repeat(postsPaul.length)} posts created `)



      await mongoose.connection.close()

      console.log('bye')

    } catch (err) {
      console.log(err)
    }
  })

