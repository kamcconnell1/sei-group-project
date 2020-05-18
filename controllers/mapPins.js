<<<<<<< HEAD
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
=======
const User = require('../models/user')
const { notFound } = require('../lib/errorMessages')


// //? Function to create a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinsCreate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const user = await User.findById(req.currentUser)
    user.pins.push(req.body)
    user.save()
    res.status(201).json(user.pins)
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
  } catch (err) {
    next(err)
  }
}

<<<<<<< HEAD
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
=======
//? Function to get Single Map Pin
//* WORKING tested
//* ERROR tested 
async function mapPinShow(req, res, next) {
  req.body.user = req.currentUser
  try {
    const pinId = req.params.pinId
    console.log(pinId)
    const user = await User.findById(req.currentUser)
    const mapped = user.pins.id(pinId)
    console.log(mapped)
    if (!mapped) throw new Error(notFound)
    res.status(200).json(mapped)
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
  } catch (err) {
    next(err)
  }
}


<<<<<<< HEAD
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
=======
//? Function to Update a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinUpdate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const pinId = req.params.pinId
    console.log(pinId)
    const user = await User.findById(req.currentUser)
    const pinToUpdate = user.pins.id(pinId)
    if (!pinToUpdate) throw new Error(notFound)
    console.log(pinToUpdate) 
    Object.assign(pinToUpdate, req.body)
    await user.save()
    res.status(202).json(pinToUpdate)
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
  } catch (err) {
    next(err)
  }
}


<<<<<<< HEAD
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
=======
//? Function to Delete a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinDelete(req, res, next) {
  try {
    const pinId = req.params.pinId
    const user = await User.findById(req.currentUser)
    const pinDelete = user.pins.id(pinId)
    if (!user.pins.includes(pinDelete)) throw new Error(notFound)
    await pinDelete.remove()
    await user.save()
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

<<<<<<< HEAD

module.exports = {
  index: mapPinsIndex,
=======
module.exports = {
  // index: getPins,
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
  create: mapPinsCreate,
  single: mapPinShow,
  update: mapPinUpdate,
  delete: mapPinDelete
}