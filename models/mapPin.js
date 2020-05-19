const mongoose = require('mongoose')


//* Schema for map pins

const mapPinSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  place: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  note: { type: String, maxlength: 300 },
  photo: { type: String }
})

module.exports = mongoose.model('MapPin', mapPinSchema)
//* EXAMPLE
// title: 'Jewel for mum´s birthday',
// place: 'Tiffanny´s',
// location: '13 James St, Covent Garden, London', //* how do we deal with this? lon/lat
// user: - user who pins it, currentUser -,
// note: 'cute little pendant with heart shape',
// photo: - a pic uploaded from the user camera files

