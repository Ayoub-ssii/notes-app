import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import PrivateRoute from './components/PrivateRoute'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotesPage    from './pages/NotesPage'

// Hna el Component App elli fih el Routes (et-triq) mte3 el site
export default function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider bach el application lkoll ta3raf chkoun el user elli dakhil */}
      <AuthProvider>
        {/* ToastProvider bach n'warriw el messages (success/error) l-user */}
        <ToastProvider>
          <Routes>
            {/* Ken el user mcha lel "/" n'hezouh toul lel "/notes" */}
            <Route path="/"         element={<Navigate to="/notes" replace />} />
            
            {/* Page el connexion */}
            <Route path="/login"    element={<LoginPage />} />
            
            {/* Page el inscription */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Page el notes: lezem tkoun "PrivateRoute" ma3netha ken el user logged in bech ychoufha */}
            <Route path="/notes"    element={
              <PrivateRoute>
                <NotesPage />
              </PrivateRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
