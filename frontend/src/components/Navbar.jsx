import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { addToast }     = useToast()

  const handleLogout = async () => {
    await logout()
    addToast('Logged out successfully.', 'success')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">📝 Notes</span>
        <div className="navbar-user">
          <span>👤 {user?.name}</span>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
