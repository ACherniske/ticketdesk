import { Hono } from 'hono'
import type { TicketPayload } from '@ticketdesk/shared'
import { submitIssue } from './submitIssue'

export const submitRoute = new Hono()

submitRoute.post('/submit', async (c) => {
  let body: TicketPayload

  try {
    body = await c.req.json<TicketPayload>()
  } catch {
    return c.json({ error: 'Invalid JSON body.' }, 400)
  }

  const required = ['name', 'email', 'type', 'priority', 'title', 'description', 'destination'] as const
  for (const field of required) {
    if (!body[field]) {
      return c.json({ error: `Missing required field: ${field}` }, 400)
    }
  }

  if (body.destination.kind !== 'issue') {
    return c.json({ error: 'Only "issue" destination is supported right now.' }, 400)
  }

  try {
    return c.json(await submitIssue(body))
  } catch (err) {
    console.error('Submission failed:', err)
    return c.json({ error: 'Failed to submit ticket. Try again later.' }, 502)
  }
})
