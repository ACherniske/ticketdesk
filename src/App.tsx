import Header  from './components/Header';
import TicketForm from './components/TicketForm';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-bg text-text transition-colors duration-200">
      
      {/* BRANDING HEADER CORE */}
      <Header />

      {/* MAIN APPLICATION CORE */}
      <main className="w-full max-w-2xl flex-1">
        <TicketForm />
      </main>

      {/* FOOTER SHELL */}
      <Footer />
      
    </div>
  );
};

export default App;
