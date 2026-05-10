import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' //navigate bin el paget
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'


export default function LoginPage() { 
  // Nesta3mlou el auth context bach na3mlou login
  const { login }      = useAuth()
  // Nesta3mlou el toast bach nwarriw messages lel user (ki ya3mel login s'hih walla ghalet)
  const { addToast }   = useToast()
  // Nesta3mlou navigate bach n'hazzou el user l'page okhra ba3d el login
  const navigate       = useNavigate()

  // useState bach nkhabiw el data elli dakhilha el user fil form
  const [form, setForm]     = useState({ email: '', password: '' })
  // useState bach nkhabiw el errors elli yrajja3hom el backend (ken famma hkayet ghalta)
  const [errors, setErrors] = useState({})
  // useState bach na3rfou rwahna nestannaw fil backend walla la (loading state)
  const [loading, setLoading] = useState(false)

  // El function hadi tbaddel el state mte3 el form kol ma el user yikteb haja
  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: null }))
  }

  // El logic mte3 el submit: neb3athou el data lel backend
  const handleSubmit = async (e) => {
    e.preventDefault() // bach el page ma ta3malsh refresh
    setLoading(true)
    try {
      // Njarbou na3mlou login shih
      await login(form.email, form.password)
      addToast('Welcome back!', 'success') // Message mte3 njah
      navigate('/notes') // Nhazzouh lel page mte3 el notes
    } catch (err) {
      // Ken famma errors m'el validation
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {})
      } else {
        // Ken famma moshkla okhra (password ghalet mathalan)
        addToast('Login failed. Check your credentials.', 'error')
      }
    } finally {
      setLoading(false) // Nwa9fou el loading kenou t3adda s7i7 walla ghalet
    }
  }

  // Hna el UI mte3 el page (HTML/JSX)
  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <h1> Notes</h1>
          <p>Your personal note-taking space</p>
        </div>

        {/* El form mte3na */}
        <form onSubmit={handleSubmit}>
          {/* Input mte3 el Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email" className="form-control"
              placeholder="you@example.com"
              value={form.email} onChange={change}
            />
            {/* Nwarriw el error ken famma moshkla fil email */}
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* Input mte3 el Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" className="form-control"
              placeholder="••••••••"
              value={form.password} onChange={change}
            />
            {/* Nwarriw el error ken famma moshkla fil password */}
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {/* Button mte3 el submit, ykoun disabled wa9t el loading */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '.75rem', fontSize: '.78rem', color: 'var(--text-muted)' }}>
          try: ayoub@a / ayoub123
        </p>
      </div>
    </div>
  )
}
