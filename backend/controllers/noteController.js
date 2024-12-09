const asyncHandler = require('express-async-handler')

const User = require('../models/userModal')
const Note = require('../models/notesModel')
const Ticket = require('../models/ticketModel')

// @desc get notes for a ticket
// @route GET/api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
  // get user using the id in the jwt - req.user set through middleware
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc create ticket note
// @route GET/api/tickets/:ticketId/notes
// @access private
const addNote = asyncHandler(async (req, res) => {
  // get user using the id in the jwt - req.user set through middleware
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
