import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

// El page elli ya3mel fiha el user account jdid (Registration)
export default function RegisterPage() {
  // Nesta3mlou el auth context bach na3mlou register
  const { register }   = useAuth()
  // Nesta3mlou el toast bach nwarriw notifications
  const { addToast }   = useToast()
  // Nesta3mlou navigate bach n'hazzou el user lel dashboard ba3d ma ya3mel account
  const navigate       = useNavigate()

  // useState bach n'khabiw el data mte3 el user (name, email, password, etc.)
  const [form, setForm]     = useState({ name: '', email: '', password: '', password_confirmation: '' })
  // useState bach n'hottou fih el validation errors m'el backend
  const [errors, setErrors] = useState({})
  // useState bach na3rfou rwahna fil process mte3 el creation walla la
  const [loading, setLoading] = useState(false)

  // Function t'baddel el state kol ma el user yikteb haja fil input
  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: null }))
  }

  // El logic mte3 el submit: neb3athou el data mte3 el user jdid lel backend
  const handleSubmit = async (e) => {
    e.preventDefault() // bach el page ma ta3malsh refresh
    setLoading(true)
    try {
      // N'jarbou nasan3ou account jdid fil backend
      await register(form.name, form.email, form.password, form.password_confirmation)
      addToast('Account created successfully!', 'success') // Message mte3 success
      navigate('/notes') // N'hazzouh lel page mte3 el notes
    } catch (err) {
      // Ken famma errors fil data (email mawjoud, password 9sir, etc.)
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {})
      } else {
        // Ken famma moshkla okhra fil server
        addToast('Registration failed. Please try again.', 'error')
      }
    } finally {
      setLoading(false) // N'wa9fou el loading
    }
  }

  // Hna el UI (HTML) mte3 el page mte3 el register
  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <h1>📝 Notes</h1>
          <p>Create your account</p>
        </div>

        {/* El form mte3 el registration */}
        <form onSubmit={handleSubmit}>
          {/* Input mte3 el Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name" name="name" className="form-control"
              placeholder="Your name"
              value={form.name} onChange={change}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Input mte3 el Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email" className="form-control"
              placeholder="you@example.com"
              value={form.email} onChange={change}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* Input mte3 el Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" className="form-control"
              placeholder="At least 8 characters"
              value={form.password} onChange={change}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {/* Input bach el user y'3awed yikteb el password (Confirmation) */}
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation" name="password_confirmation" type="password" className="form-control"
              placeholder="Repeat your password"
              value={form.password_confirmation} onChange={change}
            />
          </div>

          {/* Button mte3 el submit */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
