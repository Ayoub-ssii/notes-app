import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Hna nthabtou ken el page hadhi masmouh l'el user bech yodkhol'ha walla le
export default function PrivateRoute({ children }) {
  // Njibou el token mte3 el authentication bach na3rfou ken el user connekti
  const { token } = useAuth()
  
  // Ken el token mawjoud (user m'connecti), n'khaliweh yodkhol w n'warriw "children" (el components el dakhlaniyin)
  // Ken el token mouch mawjoud, n'hazouh direct l'page el login (Navigate to="/login")
  return token ? children : <Navigate to="/login" replace />
}
