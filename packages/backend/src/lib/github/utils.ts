import type { TicketPayload } from '@ticketdesk/shared'

export function buildBody(payload: TicketPayload): string {
  return [
    `### Submitted by`,
    `**Name:** ${payload.name}`,
    `**Email:** ${payload.email}`,
    ``,
    `### Details`,
    `**Type:** ${payload.type}`,
    `**Priority:** ${payload.priority}`,
    ``,
    `### Description`,
    payload.description,
  ].join('\n')
}

export function generateReference(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TKT-${stamp}-${rand}`
}
