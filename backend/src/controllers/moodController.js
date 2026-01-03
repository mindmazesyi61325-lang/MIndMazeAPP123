import { pool } from '../models/database.js'
import { normalizeMood } from '../utils/helpers.js'

export async function addMood(req, res) {
  try {
    const { userId, mood, notes } = req.body

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' })
    }

    const normalizedMood = normalizeMood(mood)

    const result = await pool.query(
      'INSERT INTO mood_entries (user_id, mood, notes) VALUES ($1, $2, $3) RETURNING *',
      [userId, normalizedMood, notes || null]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add mood' })
  }
}

export async function getMoodsByUser(req, res) {
  try {
    const { userId } = req.params

    const result = await pool.query(
      'SELECT * FROM mood_entries WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100',
      [userId]
    )

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch moods' })
  }
}

export async function getMoodStats(req, res) {
  try {
    const { userId } = req.params

    // Total moods
    const totalResult = await pool.query(
      'SELECT COUNT(*) as count FROM mood_entries WHERE user_id = $1',
      [userId]
    )

    // Last 7 days
    const weekResult = await pool.query(
      `SELECT COUNT(*) as count FROM mood_entries 
       WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days'`,
      [userId]
    )

    // Mood distribution
    const distributionResult = await pool.query(
      `SELECT mood, COUNT(*) as count FROM mood_entries 
       WHERE user_id = $1 GROUP BY mood`,
      [userId]
    )

    res.json({
      total: parseInt(totalResult.rows[0].count),
      lastWeek: parseInt(weekResult.rows[0].count),
      distribution: distributionResult.rows,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}
