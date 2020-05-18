const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  text: { type: String, maxlength: 200, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const messengerSchema = new mongoose.Schema({
  text: { type: String, maxlength: 200, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  response: [responseSchema]
})


module.exports =
  mongoose.model('Messages', messengerSchema)