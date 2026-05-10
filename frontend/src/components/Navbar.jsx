// Hna njibou el hooks mte3 el context bach na3rfou chkoun el user w nwarriw messages
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  // Njibou el user elli connekti w el function mte3 el logout m'el context
  const { user, logout } = useAuth()
  // Njibou addToast bach nwarriw message (succès walla erreur)
  const { addToast }     = useToast()

  // Function bach n'kharjou el user mel app
  const handleLogout = async () => {
    // N'3aytou l'logout elli jey m'el AuthContext
    await logout()
    // Nwarriw message l'el user elli houwa khraj b'najèh
    addToast('Logged out successfully.', 'success')
  }

  return (
    // El design mte3 el navbar m'el fou9
    <nav className="navbar">
      <div className="navbar-inner">
        {/* El logo walla esm el application */}
        <span className="navbar-brand">Notes</span>
        <div className="navbar-user">
          {/* Nwarriw esm el user elli dakhél (connekte) */}
          <span>👤 {user?.name}</span>
          {/* Bouton bach ya3mél logout ki yenzél 3lih */}
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
