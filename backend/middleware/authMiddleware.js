import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id, { _id: 1, name: 1, email: 1, isAdmin: 1 })
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin)  {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
})

export { protect, adminOnly }
