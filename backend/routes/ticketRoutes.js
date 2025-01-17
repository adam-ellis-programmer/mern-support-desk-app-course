const express = require('express')
const router = express.Router()
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleWare')
// re-route into noteRouter
const noteRouter = require('./noteRoute')
router.use('/:ticketId/notes', noteRouter)

// getTickets function is in the controller
router.route('/').get(protect, getTickets).post(protect, createTicket)
router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)
module.exports = router
