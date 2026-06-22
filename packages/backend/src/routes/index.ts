import { Hono } from 'hono'
import type { TicketPayload } from '@ticketdesk/shared'
import { submitIssue } from './submitIssue'
import { submitProject } from './submitProject'

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

  try {
    if (body.destination.kind === 'issue') {
      return c.json(await submitIssue(body))
    } else if (body.destination.kind === 'project') {
      return c.json(await submitProject(body))
    } else {
      return c.json({ error: 'destination.kind must be "issue" or "project"' }, 400)
    }
  } catch (err) {
    console.error('Submission failed:', err)
    return c.json({ error: 'Failed to submit ticket. Try again later.' }, 502)
  }
})
