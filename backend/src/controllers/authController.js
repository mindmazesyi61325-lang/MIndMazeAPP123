import { pool } from '../models/database.js'
import { generateToken } from '../utils/auth.js'
import { generateAnonymousId, validateAge } from '../utils/helpers.js'

export async function createAnonymousUser(req, res) {
  try {
    const userId = generateAnonymousId()
    const { age } = req.body

    if (!validateAge(age)) {
      return res.status(400).json({ error: 'Invalid age' })
    }

    await pool.query('INSERT INTO users (id, age) VALUES ($1, $2)', [userId, parseInt(age)])

    const token = generateToken(userId)
    res.json({ userId, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

export async function verifyUserAge(req, res) {
  try {
    const { age } = req.body

    if (!validateAge(age)) {
      return res.status(400).json({ error: 'Age must be between 13-19' })
    }

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' })
  }
}
