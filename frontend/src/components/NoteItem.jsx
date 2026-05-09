import { useState } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'

const PRIORITY_LABEL = { low: 'Low', medium: 'Medium', high: 'High' }

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function NoteItem({ note, onEdit, onDeleted }) {
  const { addToast }           = useToast()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting]     = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(`/notes/${note.id}`)
      addToast('Note deleted.', 'success')
      onDeleted(note.id)
    } catch {
      addToast('Could not delete note.', 'error')
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <article className={`note-item priority-${note.priority}`}>
      <div>
        <h3 className="note-title">{note.title}</h3>
        {note.content && <p className="note-content">{note.content}</p>}
      </div>

      <div className="note-footer">
        <span className={`badge badge-${note.priority}`}>{PRIORITY_LABEL[note.priority]}</span>
        <span className="note-date">{formatDate(note.created_at)}</span>
      </div>

      {!confirming ? (
        <div className="note-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(note)} title="Edit">✏️</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(true)} title="Delete">🗑️</button>
        </div>
      ) : (
        <div className="note-actions" style={{ gap: '.5rem' }}>
          <span style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>Delete?</span>
          <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
            {deleting ? '…' : 'Yes'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)}>No</button>
        </div>
      )}
    </article>
  )
}
