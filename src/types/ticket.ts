export interface TargetOption {
    id: string;
    label: string;
    type: 'repo' | 'project';
    destination: string;
    info?: string;
}

export interface TicketPayload {
    name: string;
    email: string;
    targetId: string;
    type: 'bug' | 'feature' | 'question' | 'other';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
}

export interface PortalConfig {
    title: string;
    subtitle: string;
    targets: TargetOption[];
    types: { value: TicketPayload['type']; label: string }[];
    priorities: { value: TicketPayload['priority']; label: string }[];
}
