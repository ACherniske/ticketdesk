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
