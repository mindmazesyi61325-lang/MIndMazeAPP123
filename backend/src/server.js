import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDatabase } from './models/database.js'
import { errorHandler } from './middleware/auth.js'
import authRoutes from './routes/authRoutes.js'
import moodRoutes from './routes/moodRoutes.js'
import emergencyRoutes from './routes/emergencyRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/moods', moodRoutes)
app.use('/emergency', emergencyRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MindMaze backend is running' })
})

// Error handling
app.use(errorHandler)

// Initialize and start
async function start() {
  try {
    await initializeDatabase()
    app.listen(PORT, () => {
      console.log(`🚀 MindMaze backend running on http://localhost:${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/health`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
