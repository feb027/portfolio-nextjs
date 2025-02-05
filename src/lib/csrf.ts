import { createHash, randomBytes } from 'crypto'

const SECRET = process.env.CSRF_SECRET || randomBytes(32).toString('hex')

export function generateToken(): string {
  const salt = randomBytes(8).toString('hex')
  const hash = createHash('sha256')
    .update(salt + SECRET)
    .digest('hex')
  return `${salt}.${hash}`
}

export function validateToken(token: string): boolean {
  const [salt, hash] = token.split('.')
  if (!salt || !hash) return false
  
  const expectedHash = createHash('sha256')
    .update(salt + SECRET)
    .digest('hex')
  
  return hash === expectedHash
} 