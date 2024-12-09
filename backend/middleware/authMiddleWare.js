const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModal')

// function to protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log(req.headers.authorization)
      // verify Token - needs the secret to verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)

      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user)
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }
