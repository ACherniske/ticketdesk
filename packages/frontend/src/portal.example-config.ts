import type { PortalConfig } from './types/ticket';

export const portalConfig: PortalConfig = {
  title: "Ticket Portal",
  subtitle: "Submit bug reports, features, or questions directly to our engineering teams.",

  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',

  targets: [
    {
      id: 'example-repo',
      label: 'Example Repository',
      type: 'issue',
      destination: {
        kind: 'issue',
        owner: 'example-owner',
        repo: 'example-repo'
      },
      info: 'Opens an issue directly on the Example Repository.'
    }
  ],

  types: [
    { value: 'bug',      label: 'Bug Report' },
    { value: 'feature',  label: 'Feature Request' },
    { value: 'question', label: 'Question / Clarification' },
    { value: 'other',    label: 'Other Task' }
  ],

  priorities: [
    { value: 'low',    label: 'Low (Nice to have / minor issues)' },
    { value: 'medium', label: 'Medium (Standard request / non-blocking bug)' },
    { value: 'high',   label: 'High (Blocking bug / severe regression)' }
  ]
};
