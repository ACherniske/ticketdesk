import { Context, Next } from 'hono'

const requests = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000  // 1 minute
const MAX_REQUESTS = 5    // per IP per window

export async function rateLimiter(c: Context, next: Next) {
  const ip =
    c.req.header('x-forwarded-for') ??
    c.req.header('x-real-ip') ??
    'unknown'

  const now = Date.now()
  const record = requests.get(ip)

  if (!record || now > record.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return next()
  }

  if (record.count >= MAX_REQUESTS) {
    return c.json({ error: 'Too many requests. Try again in a minute.' }, 429)
  }

  record.count++
  return next()
}
