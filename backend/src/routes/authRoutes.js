import { Router } from 'express'
import { createAnonymousUser, verifyUserAge } from '../controllers/authController.js'

const router = Router()

router.post('/anonymous', createAnonymousUser)
router.post('/verify-age', verifyUserAge)

export default router
