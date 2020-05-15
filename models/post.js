const mongoose = require('mongoose')

// const tagSchema = new mongoose.Schema({
//  text: { type: String } 
// })
//* schema for comments on post
const postCommentsSchema = new mongoose.Schema({
  text: [ { type: String, maxlength: 200 } ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})
//* schema for posts (news/post feed)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  text: { type: String, required: true, maxlength: 1000 },
  photo: { type: String }, //* we allow 1 photo

  // tags: [tagSchema],

  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, //* creator of comment
  comments: [postCommentsSchema] //* array of comments
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)