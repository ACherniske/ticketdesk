export type TicketType = 'bug' | 'feature' | 'question' | 'other'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface TicketPayload {
  name: string
  email: string
  area: string
  type: TicketType
  priority: TicketPriority
  title: string
  description: string
}

export interface SubmitResponse {
  reference: string
}
