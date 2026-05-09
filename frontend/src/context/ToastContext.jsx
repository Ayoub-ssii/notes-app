import { createContext, useContext, useState, useCallback } from 'react'

// Hna n'khalkou context lel messages mte3 el notifications (Toast)
const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  // useState bech n'khabiw el list mte3 el notifications elli bech yokhrjou
  const [toasts, setToasts] = useState([])

  // Function bech n'zidou message jdid lel ekcha
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() // N'aatouh id unique nastaamlou fih el wakt
    // N'zidou el toast jdid lel list mte3na
    setToasts(prev => [...prev, { id, message, type }])
    
    // Baad 3.5 seconds, n'fasskhou el toast hadha mel list automatique
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    // N'aatou el function addToast lel app kamla
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Hna n'warriw el messages mte3na f el screen */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.type === 'success' ? '✓' : '✕'}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Hook sahla bech nastaamlou el addToast f ay component
export function useToast() {
  return useContext(ToastContext)
}
