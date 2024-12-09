const express = require('express')
const router = express.Router({ mergeParams: true }) // merge is property on yher router
const { getNotes, addNote } = require('../controllers/noteController') // 2
const { protect } = require('../middleware/authMiddleWare')

router.route('/').get(protect, getNotes).post(protect, addNote) // 1

module.exports = router
