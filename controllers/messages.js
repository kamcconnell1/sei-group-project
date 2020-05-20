//! Require
const User = require('../models/user')
const Message = require('../models/message')
const { unauthorized, notFound } = require('../lib/errorMessages')

//? Function for creating a message.
//* WORKING tested
//* ERROR tested
async function createMessage(req, res, next) {
  try {
    req.body.user = await User.findById(req.currentUser)
    req.body.owner = await User.findById(req.params.userid)
    if (!req.body.owner) throw new Error(notFound)
    const message = await Message.create(req.body)
    console.log(message)
    await message.save()
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}

//? Function for sending response to intial Message
//* WORKING tested
//* ERROR tested
async function sendResponse(req, res, next) {
  try {
    const message = await Message.findById(req.params.id).populate('user').populate('owner')
    if (!message) throw new Error(notFound)
    if (!message.user.equals(req.currentUser._id) && !message.owner.equals(req.currentUser._id)) throw new Error(unauthorized)
    const response = req.body
    message.response.push(response)
    await message.save()
    console.log(message)
    res.json(message)

  } catch (err) {
    next(err)
  }
}

//? Get single message with all responses
//* WORKING tested
//* ERROR tested
async function getMessage(req, res, next) {
  try {
    const message = await Message.findById(req.params.id)
    if (!message) throw new Error(notFound)
    if (!message.user.equals(req.currentUser._id) && !message.owner.equals(req.currentUser._id)) throw new Error(unauthorized)
    res.json(message)
  } catch (err) {
    next(err)
  }
}

//? Get all messages sent to rent
//* WORKING tested
//* ERROR tested
async function getSentMessages(req, res, next) {
  try {
    const messages = await Message.find()
    const messagestwo = await Message.find()
    const filtered = await messages.filter(message => message.owner.equals(req.currentUser._id))
    const filteredtwo = await messages.filter(message => message.user.equals(req.currentUser._id))
    console.log(filtered, filteredtwo)
    res.status(201).json(filteredtwo)
  } catch (err) {
    next(err)
  }
}

//? Get all messages received to rent
//* WORKING tested
//* ERROR tested
async function getReceivedMessages(req, res, next) {
  try {
    const messages = await Message.find().populate('user').populate('owner')
    const filtered = await messages.filter(message => message.owner.equals(req.currentUser._id))
    res.status(201).json(filtered)
  } catch (err) {
    next(err)
  }
}

//! Export
module.exports = {
  createMessage,
  sendResponse,
  getMessage,
  getSentMessages,
  getReceivedMessages
}