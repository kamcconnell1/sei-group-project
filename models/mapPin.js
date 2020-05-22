const mongoose = require('mongoose')

//! MAIN PIN SCHEMA
const mapPinSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  place: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  note: { type: String, maxlength: 300 },
  photo: { type: String }
})

module.exports = mongoose.model('MapPin', mapPinSchema)


