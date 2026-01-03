import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret')
  } catch (err) {
    return null
  }
}
