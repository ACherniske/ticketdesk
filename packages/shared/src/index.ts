export type TicketType = 'bug' | 'feature' | 'question' | 'other'
export type TicketPriority = 'low' | 'medium' | 'high'

export type TicketDestination =
  | { kind: 'issue'; owner: string; repo: string }
  | { kind: 'project'; owner: string; projectNumber: number; fieldId?: string; optionId?: string }

export interface TicketPayload {
  name: string
  email: string
  type: TicketType
  priority: TicketPriority
  title: string
  description: string
  destination: TicketDestination
}

export interface SubmitResponse {
  reference: string
  url?: string
}
