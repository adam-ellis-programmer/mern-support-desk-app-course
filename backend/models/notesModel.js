const mongoose = require('mongoose')

// ticket needts to have a relationship to the user
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // nnow related to the users object id
      required: true,
      ref: 'User',
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId, //  to know which ticket the note is related to
      required: true,
      ref: 'Ticket',
    },
    text: {
      type: String,
      required: [true, 'please add some text'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
