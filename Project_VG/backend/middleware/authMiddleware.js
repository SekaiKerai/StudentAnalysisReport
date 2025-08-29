const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, name, email, role } = decoded
    
    // Verify user still exists and is active
    const user = await User.findById(id)
    if (!user || !user.isActive) {
      throw new UnauthenticatedError('User not found or account deactivated')
    }
    
    req.user = { id, name, email, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')//401
  }
}

module.exports = authenticationMiddleware
