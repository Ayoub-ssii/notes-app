import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'

const EMPTY = { title: '', content: '', priority: 'medium' }

export default function NoteForm({ editingNote, onSaved, onCancel }) {
  const { addToast }      = useToast()
  const [form, setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Pre-fill form when editing
  useEffect(() => {
    if (editingNote) {
      setForm({ title: editingNote.title, content: editingNote.content || '', priority: editingNote.priority })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [editingNote])

  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required.' })
      return
    }

    setLoading(true)
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote.id}`, form)
        addToast('Note updated!', 'success')
      } else {
        await api.post('/notes', form)
        addToast('Note created!', 'success')
      }
      setForm(EMPTY)
      onSaved()
    } catch (err) {
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
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        <h3>{editingNote ? '✏️ Edit Note' : '➕ New Note'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title" name="title" className="form-control"
              placeholder="Enter a title…" maxLength={100}
              value={form.title} onChange={change}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content" name="content" className="form-control"
              placeholder="Write your note here…"
              value={form.content} onChange={change}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" className="form-control" value={form.priority} onChange={change}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟠 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

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
