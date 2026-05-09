import { useState } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'

// El labels mte3 el priority bach nwarriwhom l'el user kima huma
const PRIORITY_LABEL = { low: 'Low', medium: 'Medium', high: 'High' }

// Function bach n'badlou el date mte3 el note l'format n'najmou na9rawh
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function NoteItem({ note, onEdit, onDeleted }) {
  const { addToast }           = useToast()
  
  // State bach na3rfou ken el user nzel 3la "Delete" (bech n'thabtou fih 9bal ma nfasskhou)
  const [confirming, setConfirming] = useState(false)
  
  // State bach na3rfou ken el note 9a3da tetfassakh tawa m'el database
  const [deleting, setDeleting]     = useState(false)

  // Function bach n'fasskhou el note m'el API
  const handleDelete = async () => {
    setDeleting(true)
    try {
      // N'3aytou l'DELETE endpoint m'el API
      await api.delete(`/notes/${note.id}`)
      addToast('Note deleted.', 'success')
      // N'khabrou el NoteList elli el note tfasskhet bach t'nahihha m'el ecran
      onDeleted(note.id)
    } catch {
      addToast('Could not delete note.', 'error')
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    // El design mte3 el note sghira, el class tetbadél 3la hsab el priority
    <article className={`note-item priority-${note.priority}`}>
      <div>
        {/* Title mte3 el note */}
        <h3 className="note-title">{note.title}</h3>
        {/* Content mte3 el note (ken mawjoud) */}
        {note.content && <p className="note-content">{note.content}</p>}
      </div>

      <div className="note-footer">
        {/* Badge mte3 el priority (Low, Medium, High) */}
        <span className={`badge badge-${note.priority}`}>{PRIORITY_LABEL[note.priority]}</span>
        {/* Date elli t'khal9et fiha el note */}
        <span className="note-date">{formatDate(note.created_at)}</span>
      </div>

      {/* Logic mte3 el buttons: ken ma nzelch 3la delete, nwarriw edit w delete icons */}
      {!confirming ? (
        <div className="note-actions">
          {/* Bouton edit: n'3aytou l'onEdit elli jey m'el parent */}
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(note)} title="Edit">✏️</button>
          {/* Bouton delete: i'pasi l'confirming state l'true */}
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(true)} title="Delete">🗑️</button>
        </div>
      ) : (
        // Ken nzel 3la delete, nwarriw "Delete?" w Yes/No bach n'thabtou
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
