const requiredEnvs = [
  'RESEND_API_KEY',
  'NEXT_PUBLIC_SITE_URL',
  'CSRF_SECRET'
] as const

export function validateEnv() {
  const missingEnvs = requiredEnvs.filter(env => !process.env[env])
  
  if (missingEnvs.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvs.join(', ')}`)
  }
} 