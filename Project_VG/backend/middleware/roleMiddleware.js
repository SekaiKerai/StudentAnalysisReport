const { UnauthenticatedError } = require('../errors')

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthenticatedError('Authentication required')
    }
    
    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError('Access denied. Insufficient permissions')
    }
    
    next()
  }
}

const authorizeAdmin = authorizeRoles('admin')
const authorizeTutor = authorizeRoles('tutor', 'admin')
const authorizeStudent = authorizeRoles('student', 'tutor', 'admin')

module.exports = {
  authorizeRoles,
  authorizeAdmin,
  authorizeTutor,
  authorizeStudent
}
