import React from 'react';
/* import wordmark from '../assets/Wordmark.svg'; */
import logo from '../assets/Logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="max-w-2xl w-full mb-8">
      <div className="flex flex-row flex-nowrap items-center justify-left gap-3 text-left">
        {/* Logo Asset */}
        <img
          src={logo}
          alt="Aiden Cherniske"
          className="h-8 w-auto shrink-0 brightness-0 invert"
        />

        {/* Decorative Divider */}
        <div className="h-8 w-px shrink-0 bg-text/20" aria-hidden="true" />

        {/* Dynamic Theme Heading */}
        <h1 className="whitespace-nowrap text-3xl sm:text-4xl font-bold tracking-tight text-text-h">
          TicketDesk
        </h1>
      </div>
    </header>
  );
};
