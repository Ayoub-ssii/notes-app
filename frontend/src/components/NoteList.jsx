import NoteItem from './NoteItem'

// El filtrèt elli n'najmou nasta3mlouhom bach nchoufou el notes bpriority mte3hom
const FILTERS = ['all', 'high', 'medium', 'low']

export default function NoteList({ notes, filter, onFilterChange, onEdit, onDeleted }) {
  // Hna n'khaliw ken el notes elli matchy el filter elli khtarna ha
  // Ken khtarna 'all', n'khalliw el notes l'kol
  const visible = filter === 'all' ? notes : notes.filter(n => n.priority === filter)

  return (
    <div>
      {/* El bar mte3 el filtrèt (buttons) */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            // Ken el filter hna houwa elli khtarna ha, n'ziduha class 'active' bach tetbadél el lon
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            // Ki nenzlou 3la bouton, n'baddlou el filter fel parent
            onClick={() => onFilterChange(f)}
          >
            {/* N'raj3ou esm el filter b'harf kbir fel l'awwel */}
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Ken mafamma hata note t'kabél el filter elli khtarna ha */}
      {visible.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>{filter === 'all' ? 'No notes yet. Create your first one!' : `No ${filter}-priority notes.`}</p>
        </div>
      ) : (
        // Ken famma notes, nwarriwhom fi grid
        <div className="notes-grid">
          {/* N3adiw 3la kol note (map) w n3aytou l'NoteItem bach torssemha fel ecran */}
          {visible.map(note => (
            <NoteItem key={note.id} note={note} onEdit={onEdit} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
