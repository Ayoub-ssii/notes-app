import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import Navbar from '../components/Navbar'
import NoteList from '../components/NoteList'
import NoteForm from '../components/NoteForm'

// El page el ra'isiyya mte3 el notes win nchoufou kol chay
export default function NotesPage() {
  // Nesta3mlou el toast bach nwarriw messages mte3 error walla success
  const { addToast }       = useToast()
  
  // useState bach n'khabiw el list mte3 el notes elli jabbneha m'el backend
  const [notes, setNotes]  = useState([])
  // useState bach na3rfou rwahna n'estannaw fil data m'el API
  const [loading, setLoading] = useState(true)
  // useState bach n'filitriw el notes (all, personal, work, etc.)
  const [filter, setFilter]   = useState('all')

  // useState bach n'hallow walla n'sakrou el form mte3 el note (create/edit)
  const [showForm, setShowForm]       = useState(false)
  // useState bach n'khabiw el note elli na3mloulha fi edit tawwa
  const [editingNote, setEditingNote] = useState(null)

  // El function elli tjib el notes m'el backend (API)
  const fetchNotes = useCallback(async () => {
    try {
      const { data } = await api.get('/notes') // Nkalmou el backend
      setNotes(data) // N'hottou el data fil state mte3na
    } catch {
      addToast('Failed to load notes.', 'error') // Ken famma moshkla fil API
    } finally {
      setLoading(false) // N'wa9fou el loading ba3d ma t'ji el data
    }
  }, [addToast])

  // useEffect bach njibou el notes awwel ma t'hal el page
  useEffect(() => { fetchNotes() }, [fetchNotes])

  // El logic bach n'hallo el form mte3 "New Note"
  const openCreate = () => { setEditingNote(null); setShowForm(true) }
  // El logic bach n'hallo el form mte3 "Edit Note" b'data mte3 note mou3ayna
  const openEdit   = (note) => { setEditingNote(note); setShowForm(true) }
  // El logic bach n'sakrou el form
  const closeForm  = () => { setShowForm(false); setEditingNote(null) }

  // Function t'khdem ba3d ma el user ya3mel save (create walla update)
  const onSaved = () => {
    closeForm() // N'sakrou el form
    fetchNotes() // N'3awdou njibou el list el jdidda m'el backend
  }

  // Function t'khdem ba3d ma el user yfaskh note
  const onDeleted = (id) => {
    // N'faskhou el note mel state mte3na toul bach el UI yitbaddel fisa3
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  // Hna el UI mte3 el page
  return (
    <>
      <Navbar /> {/* El navbar mte3 el application */}

      <main className="notes-page">
        <div className="notes-header">
          {/* El title mte3 el page wel count mte3 el notes */}
          <h2>My Notes <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 400 }}>({notes.length})</span></h2>
          {/* Button bach n'hallo el form mte3 note jdidda */}
          <button className="btn btn-primary" onClick={openCreate}>
            ＋ New Note
          </button>
        </div>

        {/* Ken l'page mazalet t'loadi nwarriw spinner, sinon nwarriw el list */}
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

      {/* Ken showForm true, nwarriw el form mte3 el note (Popup/Modal) */}
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
