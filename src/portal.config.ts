import type { PortalConfig } from './types/ticket';

export const portalConfig: PortalConfig = {
  title: "Ticket Portal",
  subtitle: "Submit bug reports, features, or questions directly to our engineering teams.",
  
  targets: [
    {
      id: 'repo',
      label: 'example-repo',
      type: 'repo',
      destination: 'example-repo',
      info: 'Select this option for a repository issue. This will create a new issue in the example-repo repository.'
    },
    {
      id: 'project',
      label: 'example-project',
      type: 'project',
      destination: 'example-project',
      info: 'Select this option for a project task. This will create a new task in the example-project project board.'
    }
  ],

  types: [
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'question', label: 'Question / Clarification' },
    { value: 'other', label: 'Other Task' }
  ],

  priorities: [
    { value: 'low', label: 'Low (Nice to have / minor issues)' },
    { value: 'medium', label: 'Medium (Standard request / non-blocking bug)' },
    { value: 'high', label: 'High (Blocking bug / severe regression)' }
  ]
};