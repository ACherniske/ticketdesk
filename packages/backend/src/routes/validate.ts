import { Hono } from 'hono'
import { validateAndProvisionProject } from '../lib/github/projectFields'

export const validateRoute = new Hono()

validateRoute.post('/validate', async (c) => {
  let body: { owner: string; projectNumber: number }

  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body.' }, 400)
  }

  const { owner, projectNumber } = body

  if (!owner || !projectNumber) {
    return c.json({ error: 'Missing required fields: owner, projectNumber' }, 400)
  }

  try {
    const result = await validateAndProvisionProject(owner, projectNumber)
    return c.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Validation failed'
    console.error('Project validation failed:', message)
    return c.json({ error: message }, 400)
  }
})
