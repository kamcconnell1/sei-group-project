//! Require
const mongoose = require('mongoose')

//! COMMENTS Schema
const postCommentsSchema = new mongoose.Schema({
  text: [{ type: String, maxlength: 200 }], //* comments on post
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

//! MAIN POSTS SCHEMA
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 }, //* title of post
  text: { type: String, required: true }, //* content of post
  photo: { type: String }, //* we allow 1 photo
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, //* creator of comment
  comments: [postCommentsSchema] //* array of comments
}, {
  timestamps: true
})

//! Export
module.exports = mongoose.model('Post', postSchema)