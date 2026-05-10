  // Hna njibou el hooks mte3 el context bach na3rfou chkoun el user w nwarriw messages
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  // Njibou el user elli connecti w el function mte3 el logout mel context
  const { user, logout } = useAuth()
  // Njibou addToast bach nwarriw message (succès walla erreur)
  const { addToast }     = useToast()

  // Function bach nkharjou el user mel app
  const handleLogout = async () => {
    // N3aytou lel logout elli jey mel AuthContext
    await logout()
    // Nwarriw message lel user elli houwa khraj bnajeh
    addToast('Logged out successfully.', 'success')
  }

  return (
    // El design mte3 el navbar mel fou9
    <nav className="navbar">
      <div className="navbar-inner">
        
        <span className="navbar-brand">Notes</span>
        <div className="navbar-user">
          {/*  naffichi esm el user elli dakhel (connecte)*/}
          <span>👤 {user?.name}</span>
          {/* Bouton bach ya3mél logout  */}
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
