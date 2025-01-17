const asyncHandler = require('express-async-handler')

const User = require('../models/userModal')
const Ticket = require('../models/ticketModel')

// @desc get user tickets
// @route GET/api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc get user ticket
// @route GET/api/ticket/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // limit to user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.deleteOne()

  res.status(200).json({ success: true })
})

// @desc update ticket
// @route PUT/api/ticket/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // limit to user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTicket)
})

// @desc create user tickets
// @route POST/api/tickets/
// @access private
const createTicket = asyncHandler(async (req, res) => {
  //  send body data
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // find the user by the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
