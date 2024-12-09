const mongoose = require('mongoose')

// ticket needts to have a relationship to the user
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // now related to the users object id
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad', 'test'],
    },
    description: {
      type: String,
      required: [true, 'please add a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
