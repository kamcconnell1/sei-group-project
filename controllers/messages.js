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
    const message = await Message.findById(req.params.id)
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

// async function messagesIndex(req, res, next) {
//   try {
// const messages = await Message.find()
//   } catch (err) {
//     next(err)
//   }
// }

module.exports = {
  createMessage,
  sendResponse
}

// if (!article.user.equals(req.currentUser._id)) throw new Error(unauthorized)

//* -> secureRoute - only registered can create message