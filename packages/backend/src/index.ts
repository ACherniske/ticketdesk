import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config'

const app = new Hono()

app.use('*', cors({
  origin: process.env.ALLOWED_ORIGIN ?? '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.get('/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }))

const port = Number(process.env.PORT ?? 3000)
console.log(`Backend running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
