import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Hna nabdaw n'lansiou f l'application React mte3na
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* N'khaddmou el component el kbir elli fih koul chay */}
    <App />
  </React.StrictMode>,
)
