export type TicketDestination =
  | { kind: 'issue'; owner: string; repo: string }
  | { kind: 'project'; owner: string; projectNumber: number; fieldId?: string; optionId?: string }

export interface TargetOption {
  id: string;
  label: string;
  type: 'issue' | 'project';
  destination: TicketDestination;
  info?: string;
}

export interface TicketPayload {
  name: string;
  email: string;
  type: 'bug' | 'feature' | 'question' | 'other';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  destination: TicketDestination;
}

export interface PortalConfig {
  title: string;
  subtitle: string;
  apiUrl: string;
  targets: TargetOption[];
  types: { value: TicketPayload['type']; label: string }[];
  priorities: { value: TicketPayload['priority']; label: string }[];
}

export interface SubmitResponse {
  reference: string;
  url?: string;
}
