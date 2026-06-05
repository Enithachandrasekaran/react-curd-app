import { useEffect, useState } from "react";

const STORAGE_KEY = "practice-notes";

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function NotesApp() {
  const [notes, setNotes] = useState(loadNotes);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setEditId(null);
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle && !trimmedBody) return;

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? {
                ...note,
                title: trimmedTitle || "Untitled",
                body: trimmedBody,
                updatedAt: Date.now(),
              }
            : note
        )
      );
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: trimmedTitle || "Untitled",
          body: trimmedBody,
          updatedAt: Date.now(),
        },
      ]);
    }
    resetForm();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setEditId(note.id);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editId === id) resetForm();
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <h2>Notes App</h2>
        <p className="page-desc">Practice: localStorage, state management</p>

        <div className="notes-form">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
          />
          <div className="btn-row">
            <button type="button" onClick={handleSave}>
              {editId ? "Update Note" : "Add Note"}
            </button>
            {editId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>

        <p className="storage-hint">Notes are saved automatically in your browser.</p>

        {notes.length === 0 ? (
          <p className="empty-msg">No notes yet.</p>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-content">
                  <h3>{note.title}</h3>
                  {note.body && <p>{note.body}</p>}
                </div>
                <div className="actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotesApp;
