import { verifyToken } from '../utils/auth.js'

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  req.userId = decoded.userId
  next()
}

export function errorHandler(err, req, res, next) {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
}
