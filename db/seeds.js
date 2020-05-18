const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')
const Article = require('../models/article')
const Post = require('../models/post')
const userData = require('./data/users')
const articleData = require('./data/articles')
const postData = require('./data/posts')
// const commentsData = require('./data/comments')


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

      //* articles for john
      const articlesFromJohn = articleData.slice(0, 3).map(article => {
        return { ...article, user: users[1]._id }
      })
      const articlesJohn = await Article.create(articlesFromJohn)
      console.log(`${'👗🧒🏻 '.repeat(articlesJohn.length)} articles created `)

      // const commentsArticleMtoJ = commentsData.slice(9, 12).map(comment => {
      //   return { ...comment, user: users[2]}
      // })

      // const commentsJohnsArt = await 

      
      //* articles for mary
      const articlesForMary = articleData.slice(4, 6).map(article => {
        return { ...article, user: users[2]._id }
      })
      const articlesMary = await Article.create(articlesForMary)
      console.log(`${'👗👩🏾‍🦰 '.repeat(articlesMary.length)} articles created `)


      //* articles for paul
      const articlesForPaul = articleData.slice(6, 8).map(article => {
        return { ...article, user: users[3]._id }
      })
      const articlesPaul = await Article.create(articlesForPaul)
      console.log(`${'👗🧔🏼 '.repeat(articlesPaul.length)} articles created `)


      //* SEED POSTS

      //* posts for john
      const postsForJohn = postData.slice(0, 3).map(post => {
        return { ...post, user: users[1]._id }
      })
      const postsJohn = await Post.create(postsForJohn)
      console.log(`${'📄🧒🏻 '.repeat(postsJohn.length)} posts created `)



      //* posts for mary
      const postsForMary = postData.slice(4, 6).map(post => {
        return { ...post, user: users[2]._id }
      })
      const postsMary = await Post.create(postsForMary)
      console.log(`${'📄👩🏾‍🦰 '.repeat(postsMary.length)} posts created `)

      //* posts for paul
      const postsForPaul = postData.slice(6, 8).map(post => {
        return { ...post, user: users[3]._id }
      })
      const postsPaul = await Post.create(postsForPaul)
      console.log(`${'📄🧔🏼 '.repeat(postsPaul.length)} posts created `)


      // //* SEED COMMENTS

      // //* seeds comment articles
      // const commentsArticleJtoM = commentsData.slice(0, 3).map(comment => {
      //   return users[2].articlesPosted[0].push(comment)
      // })
      // //* seeds comment articles
      // //* seeds comment articles



      await mongoose.connection.close()

      console.log('bye')

    } catch (err) {
      console.log(err)
    }
  })

