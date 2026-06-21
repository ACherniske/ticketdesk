import type { TicketPayload, SubmitResponse } from '@ticketdesk/shared'

const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com'
const TOKEN   = process.env.GITHUB_TOKEN

function buildBody(payload: TicketPayload): string {
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

function generateReference(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TKT-${stamp}-${rand}`
}

export async function submitIssue(payload: TicketPayload): Promise<SubmitResponse> {
  if (!TOKEN) throw new Error('GITHUB_TOKEN is not set')
  if (payload.destination.kind !== 'issue') throw new Error('Invalid destination kind')

  const { owner, repo } = payload.destination

  const res = await fetch(`${API_URL}/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title: payload.title,
      body: buildBody(payload),
      labels: [payload.type, payload.priority],
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${error}`)
  }

  const data = await res.json() as { html_url: string }

  return {
    reference: generateReference(),
    url: data.html_url,
  }
}
