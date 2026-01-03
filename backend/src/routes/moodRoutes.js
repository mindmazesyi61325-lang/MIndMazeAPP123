import { Router } from 'express'
import { addMood, getMoodsByUser, getMoodStats } from '../controllers/moodController.js'

const router = Router()

router.post('/', addMood)
router.get('/:userId', getMoodsByUser)
router.get('/:userId/stats', getMoodStats)

export default router
