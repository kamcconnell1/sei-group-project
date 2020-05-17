const MapPin = require('../models/mapPin')
const { notFound, unauthorized } = require('../lib/errorMessages')


//* function to get all pins of a user
//! WORKING tested
//! ERROR not tested 
async function mapPinsIndex(req, res, next) {
  req.body.user = req.currentUser
  try {
    const mapPins = await MapPin.find()
    if (!mapPins) throw new Error(notFound)
    console.log(mapPins[0].user)
    if (!mapPins[0].user.equals(req.currentUser._id)) throw new Error(unauthorized)
    res.status(200).json(mapPins)
  } catch (err) {
    next(err)
  }
}

//* function to create a map pin
//! WORKING tested
//! ERROR not tested 
async function mapPinsCreate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const createdMapPin = await MapPin.create(req.body)
    res.status(201).json(createdMapPin)
  } catch (err) {
    next(err)
  }
}

//* function to get single map pin
//! WORKING tested
//! ERROR not tested 
async function mapPinShow(req, res, next) {
  req.body.user = req.currentUser
  try {
    const mapPinId = req.params.id
    const mapPin = await MapPin.findById(mapPinId)
    if (!mapPinId) throw new Error('Not Found')
    if (!mapPin.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    res.status(200).json(mapPin)
  } catch (err) {
    next(err)
  }
}


//* function to update a map pin
//! WORKING tested
//! ERROR not tested 
async function mapPinUpdate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const mapPin = await MapPin.findById(req.params.id)
    if (!mapPin) throw new Error(notFound)
    if (!mapPin.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(mapPin, req.body)
    await mapPin.save()
    res.status(202).json(mapPin)
  } catch (err) {
    next(err)
  }
}


//* function to delete a map pin
//! WORKING tested
//! ERROR not tested 
async function mapPinDelete(req, res, next) {
  try {
    const mapPinId = req.params.id
    const mapPinToDelete = await MapPin.findById(mapPinId)
    if (!mapPinToDelete) throw new Error(notFound)
    if (!mapPinToDelete.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await mapPinToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  index: mapPinsIndex,
  create: mapPinsCreate,
  single: mapPinShow,
  update: mapPinUpdate,
  delete: mapPinDelete
}