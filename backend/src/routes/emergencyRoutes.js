import { Router } from 'express'

const router = Router()

const HELPLINES = {
  US: { name: 'Crisis Text Line', number: 'Text HOME to 741741', url: 'https://www.crisistextline.org' },
  UK: { name: 'Samaritans', number: '116 123', url: 'https://www.samaritans.org.uk' },
  IN: { name: 'AASRA', number: '9820466726', url: 'https://www.aasra.info' },
}

router.get('/helplines', (req, res) => {
  const { country = 'US' } = req.query
  const helpline = HELPLINES[country] || HELPLINES.US
  
  res.json({
    country,
    helpline,
    disclaimer: 'This is not a substitute for professional medical help. In case of emergency, contact local authorities.',
  })
})

export default router
