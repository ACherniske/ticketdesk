import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { rateLimiter } from './middleware/rateLimiter'
import { submitRoute } from './routes/index'
import { validateRoute } from './routes/validate'

const app = new Hono()

app.use('*', cors({
  origin: process.env.ALLOWED_ORIGIN ?? '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.use('/api/*', rateLimiter)
app.route('/api', submitRoute)
app.route('/api', validateRoute)

app.get('/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }))

const port = Number(process.env.PORT ?? 3000)
console.log(`Backend running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
