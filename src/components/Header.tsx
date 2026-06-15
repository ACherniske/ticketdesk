import React from 'react';
import logo from '../assets/Logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="max-w-2xl w-full mb-8">
      <div className="flex flex-row flex-nowrap items-center justify-start gap-3 text-left">
        {/* Logo Asset: Native dark in light mode, dynamically inverted in dark mode */}
        <img
          src={logo}
          alt="Aiden Cherniske"
          className="h-8 w-auto shrink-0 dark:invert transition-all duration-200"
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
