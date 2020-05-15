const mongoose = require('mongoose')

//* schema for rating
const ratingSchema = new mongoose.Schema({
  articleRating: { type: Number, required: true, min: 1, max: 5 }, //* rating specific to article
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } //* the user who made the rating
}, {
  timestamps: true
})


//* schema for clothing
const articleOfClothingSchema = new mongoose.Schema({
  title: { type: String, required: true }, //* title of clothing
  category: { type: String, required: true }, //* category of clothing (skirt, shirt etc)
  genderCategory: { type: String, require: true, enum: ['Woman', 'Man'] }, //* Man or woman
  size: { type: String, required: true },//* size of clothing
  color: { type: String, required: true },//* color of clothing. in an array for different color options.
  rentalPrice: { type: Number, required: true }, //* rental price in number.
  image: [{ type: String, required: true }], //* url image of clothing in array to add front and back pictures if desired
  rating: [ratingSchema],//* reference to rating schema (which gets user who rated clothing)
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }//* grabs the user who added clothing ( which will provide location etc.)
})


module.exports = mongoose.model('Article', articleOfClothingSchema)