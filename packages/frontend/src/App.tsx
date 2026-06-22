import Header from './components/Header'
import TicketForm from './components/TicketForm'
import Footer from './components/Footer'
import { useValidation } from './hooks/useValidation'

const App = () => {
  const validation = useValidation()

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-bg text-text transition-colors duration-200">
      <Header />

      <main className="w-full max-w-2xl flex-1">
        {validation.status === 'validating' && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-text/60">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Connecting to GitHub...</p>
          </div>
        )}

        {validation.status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
            <p className="font-medium mb-1">Configuration error</p>
            <p>{validation.message}</p>
          </div>
        )}

        {validation.status === 'ready' && (
          <TicketForm targets={validation.targets} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
