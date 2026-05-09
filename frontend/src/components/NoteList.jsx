import NoteItem from './NoteItem'

const FILTERS = ['all', 'high', 'medium', 'low']

export default function NoteList({ notes, filter, onFilterChange, onEdit, onDeleted }) {
  const visible = filter === 'all' ? notes : notes.filter(n => n.priority === filter)

  return (
    <div>
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>{filter === 'all' ? 'No notes yet. Create your first one!' : `No ${filter}-priority notes.`}</p>
        </div>
      ) : (
        <div className="notes-grid">
          {visible.map(note => (
            <NoteItem key={note.id} note={note} onEdit={onEdit} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
