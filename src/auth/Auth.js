// Global imports
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    const message = `You did not provide an authentication token. Please add one in the request header.`
    return res.status(401).json({ message })
  }

  const token = authorizationHeader.split(' ')[1] // Get token without 'Bearer' string
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `The user is not authorized to access this resource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `The user ID is invalid.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}