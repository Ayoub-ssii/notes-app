import { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'

// Hna n'khalkou el context mte3 el authentication
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // useState bech n'khabiw el data mte3 el user, w n'thabtou f localStorage ken fama data mel kabl
  const [user, setUser]   = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  // useState bech n'khabiw el token mte3na
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  // Function mte3 el login: n'baathou el data lel backend w n'khabiw el result
  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }, [])

  // Function mte3 el register: n'halou compte jdid w n'khabiw el token w user direct
  const register = useCallback(async (name, email, password, password_confirmation) => {
    const { data } = await api.post('/register', { name, email, password, password_confirmation })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }, [])

  // Function mte3 el logout: n'fasskhou kol chay w n'rajjaaou el user l zero
  const logout = useCallback(async () => {
    try { await api.post('/logout') } catch (_) {}
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  return (
    // N'baathou el info mte3na lel app kamla
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook bech t'sahhel lina nastaamlou el AuthContext f ay blasa
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
