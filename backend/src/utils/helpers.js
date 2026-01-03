import { v4 as uuidv4 } from 'uuid'

export function generateAnonymousId() {
  return `user_${uuidv4()}`
}

export function validateAge(age) {
  const ageNum = parseInt(age)
  return !isNaN(ageNum) && ageNum >= 13 && ageNum <= 19
}

export function normalizeMood(mood) {
  const valid = ['happy', 'sad', 'anxious', 'angry', 'neutral', 'excited', 'calm']
  return valid.includes(mood) ? mood : 'neutral'
}
