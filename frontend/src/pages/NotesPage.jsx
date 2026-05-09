import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import Navbar from '../components/Navbar'
import NoteList from '../components/NoteList'
import NoteForm from '../components/NoteForm'

export default function NotesPage() {
  const { addToast }       = useToast()
  const [notes, setNotes]  = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  const [showForm, setShowForm]       = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  const fetchNotes = useCallback(async () => {
    try {
      const { data } = await api.get('/notes')
      setNotes(data)
    } catch {
      addToast('Failed to load notes.', 'error')
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  const openCreate = () => { setEditingNote(null); setShowForm(true) }
  const openEdit   = (note) => { setEditingNote(note); setShowForm(true) }
  const closeForm  = () => { setShowForm(false); setEditingNote(null) }

  const onSaved = () => {
    closeForm()
    fetchNotes()
  }

  const onDeleted = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <>
      <Navbar />

      <main className="notes-page">
        <div className="notes-header">
          <h2>My Notes <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 400 }}>({notes.length})</span></h2>
          <button className="btn btn-primary" onClick={openCreate}>
            ＋ New Note
          </button>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <NoteList
            notes={notes}
            filter={filter}
            onFilterChange={setFilter}
            onEdit={openEdit}
            onDeleted={onDeleted}
          />
        )}
      </main>

      {showForm && (
        <NoteForm
          editingNote={editingNote}
          onSaved={onSaved}
          onCancel={closeForm}
        />
      )}
    </>
  )
}
