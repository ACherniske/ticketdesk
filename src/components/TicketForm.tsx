import React, { useState } from 'react';
import { portalConfig } from '../portal.config';
import { ChevronDown } from 'lucide-react';
import type { TicketPayload } from '../types/ticket';

export const TicketForm: React.FC = () => {
  const [formData, setFormData] = useState<TicketPayload>({
    name: '',
    email: '',
    targetId: portalConfig.targets[0]?.id || '',
    type: 'bug',
    priority: 'medium',
    title: '',
    description: ''
  });

  const selectedTarget = portalConfig.targets.find(t => t.id === formData.targetId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Payload Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto text-left space-y-6 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Your Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@company.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 mb-1">Target Project / Area</label>
        <div className="relative w-full">
          <select
            name="targetId"
            value={formData.targetId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 appearance-none pr-10 cursor-pointer"
          >
            {portalConfig.targets.map(target => (
              <option key={target.id} value={target.id}>
                {target.label} ({target.type === 'repo' ? 'Repository' : 'Board'})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {selectedTarget?.info && (
          <p className="mt-2 text-xs text-gray-700 bg-gray-100 p-2 border border-gray-300 rounded">
            {selectedTarget.info}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Ticket Type</label>
          <div className="relative w-full">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 appearance-none pr-10 cursor-pointer"
            >
              {portalConfig.types.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Urgency / Priority</label>
          <div className="relative w-full">
            <select
              name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-transparent focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 appearance-none pr-10 cursor-pointer"
              >
                {portalConfig.priorities.map(p => (
                  <option key={p.value} value={p.value} style={{ color: '#0f172a' }}>{p.label}</option>
                ))}
            </select>

            <div className="absolute left-0 top-0 w-full h-full px-3 py-2 flex items-center pointer-events-none">
              <span className="text-slate-900">
                {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1).toLowerCase()}
              </span>
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-300">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Short Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Briefly describe the core issue or request"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">Detailed Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide explicit context, reproduction steps, or details to help maintainers review this ticket efficiently..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 resize-y"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button type="submit" className="px-6 py-2 bg-cyan-500 text-white font-medium rounded-md hover:opacity-90 active:scale-98 transition duration-150 cursor-pointer shadow-md">
          Submit Ticket
        </button>
      </div>
    </form>
  );
};

