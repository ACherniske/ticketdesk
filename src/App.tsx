import React from 'react';
import { TicketForm } from './components/TicketForm';
import Footer from './components/Footer';
import { portalConfig } from './portal.config'; // Dynamic settings import

const App: React.FC = () => {
  return (
    /* - bg-bg: Uses our theme background variable (swaps from light to dark automatically)
      - text-text: Defaults to our theme body text color
    */
    <div className="min-h-screen flex flex-col items-center p-6 bg-bg text-text transition-colors duration-200">
      
      {/* HEADER SECTION: Driven entirely by configuration values */}
      <header className="max-w-2xl w-full mb-8 text-left space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-text-h tracking-tight mb-2">
            {portalConfig.title}
          </h1>
          <p className="text-base text-text/80 max-w-xl">
            {portalConfig.subtitle}
          </p>
        </div>
      </header>

      {/* MAIN APPLICATION CORE */}
      <main className="w-full max-w-2xl flex-1">
        <TicketForm />
      </main>

      <Footer />
      
    </div>
  );
};

export default App;
