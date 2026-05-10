import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'

// El data el fergha mte3 el note awel ma nabdaw
const EMPTY = { title: '', content: '', priority: 'medium' }

export default function NoteForm({ editingNote, onSaved, onCancel }) {
  const { addToast }      = useToast()
  
  // useState bach nkhabiw el data elli dakhilha el user fi west el form
  const [form, setForm]   = useState(EMPTY)
  
  // Bach nkhabiw ay erreur tsir ki nthabtou fel form (kima title fergh)
  const [errors, setErrors] = useState({})
  
  // Bach na3rfou ken l'app 9a3da tkhabi fel data (loading)
  const [loading, setLoading] = useState(false)

  // El useEffect hna bach y3ammar el form b data mte3 note 9dima kenek bech ta3mel edit
  useEffect(() => {
    if (editingNote) {
      setForm({ title: editingNote.title, content: editingNote.content || '', priority: editingNote.priority })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [editingNote])

  // Function tbadel el state mte3 el form kol ma el user yakteb haja fi ay input
  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: null }))
  }

  // Hna el logic mte3 el form ki el user ya3mél submit (clique 3la bouton save)
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Nthabtou ken el titre fer8 nwarriw erreur
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required.' })
      return
    }

    setLoading(true)
    try {
      if (editingNote) {
        // Kenek ta3mel fi update lel note mawjouda
        await api.put(`/notes/${editingNote.id}`, form)
        addToast('Note updated!', 'success')
      } else {
        // Kenek tzid fi note jdida
        await api.post('/notes', form)
        addToast('Note created!', 'success')
      }
      // Nfarghou el form w n3aytou lel onSaved bach trefreshi el list
      setForm(EMPTY)
      onSaved()
    } catch (err) {
      // Ken famma ghalta mel backend
      if (err.response?.status === 422) {
        const apiErrors = err.response.data.errors || {}
        setErrors(apiErrors)
      } else {
        addToast('Something went wrong. Please try again.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    // El design mte3 el modal elli fih el form
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        {/* Nbadlou el title mte3 el form 3la hsab kenou edit walla jdid */}
        <h3>{editingNote ? '✏️ Edit Note' : '➕ New Note'}</h3>
        <form onSubmit={handleSubmit}>
          {/* Input mte3 el title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title" name="title" className="form-control"
              placeholder="Enter a title…" maxLength={100}
              value={form.title} onChange={change}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          {/* Input mte3 el content (text kbir) */}
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content" name="content" className="form-control"
              placeholder="Write your note here…"
              value={form.content} onChange={change}
            />
          </div>

          {/* Select bach nakhtarou el priority */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" className="form-control" value={form.priority} onChange={change}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟠 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          {/* Boutonèt bach nbatlou walla nkhabiw el note */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : editingNote ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
