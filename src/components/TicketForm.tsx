import React, { useState } from 'react';
import { portalConfig } from '../portal.config';
import type { TicketPayload } from '../types/ticket';

export const TicketForm: React.FC = () => {
  // 1. Core form state typed to match our strict payload schema
  const [formData, setFormData] = useState<TicketPayload>({
    name: '',
    email: '',
    targetId: portalConfig.targets[0]?.id || '',
    type: 'bug',
    priority: 'medium',
    title: '',
    description: ''
  });

  // 2. Look up the active target to display its corresponding help text dynamically
  const selectedTarget = portalConfig.targets.find(t => t.id === formData.targetId);

  // 3. Centralized input handler mapping value changes to state by element name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Payload Submitted:', formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto text-left space-y-6 p-6 bg-bg border border-border rounded-xl shadow-sm transition-colors duration-200"
    >
      {/* SECTION 1: USER METADATA (NAME & REQUIRED EMAIL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-h mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-text-h placeholder-text/50 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-h mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@company.com"
            className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-text-h placeholder-text/50 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      {/* SECTION 2: DYNAMIC ROUTING TARGET MENU */}
      <div>
        <label className="block text-sm font-medium text-text-h mb-1">Target Project / Area</label>
        <div className="relative w-full">
          <select
            name="targetId"
            value={formData.targetId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text-h focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent appearance-none pr-10 cursor-pointer [&>option]:bg-bg [&>option]:text-text-h"
          >
            {portalConfig.targets.map(target => (
              <option key={target.id} value={target.id}>
                {target.label} ({target.type === 'repo' ? 'Repository' : 'Board'})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* Conditional helper prompt block based on chosen target option */}
        {selectedTarget?.info && (
          <p className="mt-2 text-xs text-text bg-code-bg p-2 border border-border rounded transition-all duration-150">
            {selectedTarget.info}
          </p>
        )}
      </div>

      {/* SECTION 3: CLASSIFICATIONS (TYPE & ACCENTED PRIORITY) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-h mb-1">Ticket Type</label>
          <div className="relative w-full">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text-h focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent appearance-none pr-10 cursor-pointer [&>option]:bg-bg [&>option]:text-text-h"
            >
              {portalConfig.types.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-h mb-1">Urgency / Priority</label>
          <div className="relative w-full">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              /* - text-transparent: Hides the native display text *only* inside the closed selection box frame.
                - [&>option]:text-text-h: Forces the text color inside the actual options window to remain fully visible.
              */
              className="w-full px-3 py-2 border border-border rounded-md bg-bg text-transparent focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent appearance-none pr-10 cursor-pointer [&>option]:bg-bg [&>option]:text-text-h"
            >
              {portalConfig.priorities.map(p => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            
            {/* TEXT OVERLAY MASK: Capitalizes the clean value token (e.g. "medium" -> "Medium") 
               and presents it inside the boundaries of the select container.
               pointer-events-none makes clicks fall directly through onto the underlying select element.
            */}
            <div className="absolute left-0 top-0 w-full h-full px-3 py-2 flex items-center pointer-events-none">
              <span className="text-text-h">
                {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
              </span>
            </div>
            
            {/* Custom SVG arrow icon overlay */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: CORE TICKET TEXT WRITING CONTROLS */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div>
          <label className="block text-sm font-medium text-text-h mb-1">
            Short Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Briefly describe the core issue or request"
            className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-text-h placeholder-text/50 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-h mb-1">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide explicit context, reproduction steps, or details to help maintainers review this ticket efficiently..."
            className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-text-h placeholder-text/50 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent resize-y"
          />
        </div>
      </div>

      {/* SECTION 5: ACTION FOOTER */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-white dark:text-black font-semibold rounded-md hover:opacity-90 active:scale-98 transition duration-150 cursor-pointer shadow-md"
        >
          Submit Ticket
        </button>
      </div>
    </form>
  );
};
